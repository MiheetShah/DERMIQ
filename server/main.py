from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import json
from werkzeug.utils import secure_filename
from recommendation import SkinCareRecommender

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
TARGET_SIZE = (128, 128)  # Updated to match model's expected input size

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the disease detection model
try:
    # Load the model
    disease_model = tf.keras.models.load_model('model.h5')
    # Rebuild the model to ensure correct input shape
    disease_model = tf.keras.models.model_from_json(disease_model.to_json())
    disease_model.build((None, *TARGET_SIZE, 3))
    model_loaded = True
    print("Model loaded successfully with input shape:", disease_model.input_shape)
except Exception as e:
    print(f"Error loading model: {e}")
    print("Warning: Running in development mode with mock predictions.")
    model_loaded = False

# Initialize the recommendation system
recommender = SkinCareRecommender()

# Define the disease classes that your model was trained on
disease_classes = ["Psoriasis", "Ringworm", "Shingles", "Vitiligo", "Eczema"]

# Helper functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(img_path):
    """Preprocess the image for the model"""
    img = image.load_img(img_path, target_size=TARGET_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def predict_disease(img_path):
    """Predict the skin disease from an image"""
    if not model_loaded:
        # Mock prediction for development
        predicted_class_index = np.random.randint(0, len(disease_classes))
        confidence = round(np.random.uniform(0.7, 0.99), 2)
        
        return {
            'disease': disease_classes[predicted_class_index],
            'confidence': confidence
        }
    
    processed_img = preprocess_image(img_path)
    predictions = disease_model.predict(processed_img)
    predicted_class_index = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class_index])
    
    return {
        'disease': disease_classes[predicted_class_index],
        'confidence': confidence
    }

def get_disease_info(disease_name):
    """Get information about the disease"""
    disease_info = {
        "Psoriasis": {
            "description": "Psoriasis is a skin disorder that causes skin cells to multiply up to 10 times faster than normal.",
            "symptoms": ["Red patches with silvery scales", "Small scaling spots", "Dry, cracked skin"]
        },
        "Ringworm": {
            "description": "Ringworm is a common fungal infection that affects the skin, hair and nails.",
            "symptoms": ["Red, scaly, itchy patch", "Ring-shaped rash", "Blisters and pustules"]
        },
        "Shingles": {
            "description": "Shingles is a viral infection that causes a painful rash.",
            "symptoms": ["Pain, burning, numbness", "Sensitivity to touch", "Red rash"]
        },
        "Vitiligo": {
            "description": "Vitiligo is a disease that causes the loss of skin color in blotches.",
            "symptoms": ["Patchy loss of skin color", "Premature whitening of hair", "Loss of color in mouth"]
        },
        "Eczema": {
            "description": "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough.",
            "symptoms": ["Dry, sensitive skin", "Itching", "Inflamed, discolored skin"]
        }
    }
    return disease_info.get(disease_name, {"description": "Information not available", "symptoms": []})

@app.route('/api/analyze', methods=['POST'])
def analyze_skin():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        user_details = {
            'name': request.form.get('name', ''),
            'age': int(request.form.get('age', 0)),
            'gender': request.form.get('gender', ''),
            'skinType': request.form.get('skinType', ''),
            'allergies': request.form.get('allergies', '').split(',') if request.form.get('allergies') else []
        }
        
        try:
            prediction_result = predict_disease(filepath)
            disease_name = prediction_result['disease']
            disease_info = get_disease_info(disease_name)
            recommendations = recommender.get_recommendations(disease_name, user_details)
            
            response = {
                'disease': disease_name,
                'confidence': prediction_result['confidence'],
                'description': disease_info['description'],
                'symptoms': disease_info['symptoms'],
                'remedies': recommendations['remedies'],
                'products': recommendations['products'],
                'userDetails': user_details
            }
            
            return jsonify(response), 200
            
        except Exception as e:
            print("Error:", str(e))
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    diseases = [
        {"name": "Psoriasis", "description": "Autoimmune condition affecting the skin"},
        {"name": "Ringworm", "description": "Fungal infection affecting skin, hair, nails"},
        {"name": "Shingles", "description": "Viral infection causing painful rash"},
        {"name": "Vitiligo", "description": "Causes loss of skin color in patches"},
        {"name": "Eczema", "description": "Causes inflamed, itchy, rough skin"}
    ]
    return jsonify(diseases), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)