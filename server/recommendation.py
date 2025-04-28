import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class SkinCareRecommender:
    def __init__(self):
        # Initialize with product database
        # In a real system, this would come from a database
        self.products_df = self._create_product_database()
        
        # Create vectorizer for content-based filtering
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.product_features = self._prepare_product_features()
        
    def _create_product_database(self):
        """Create a mock product database"""
        products = [
            # Eczema products
            {"id": 1, "name": "Hydrating Cleanser", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Gentle, non-foaming cleanser for sensitive skin", "disease": "Eczema", 
             "ingredients": "water, glycerin, ceramides, hyaluronic acid", 
             "skin_types": "dry, sensitive", "age_range": "all", "tags": "gentle cleanser hydrating dry sensitive"},
            
            {"id": 2, "name": "Barrier Repair Cream", "image_url": "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png", 
             "description": "Restores the skin's protective barrier", "disease": "Eczema", 
             "ingredients": "shea butter, ceramides, fatty acids, cholesterol", 
             "skin_types": "dry, sensitive, normal", "age_range": "all", "tags": "repair cream dry barrier protection"},
            
            {"id": 3, "name": "Colloidal Oatmeal Bath", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Soothes itchy, irritated skin", "disease": "Eczema", 
             "ingredients": "colloidal oatmeal, natural oils", 
             "skin_types": "all", "age_range": "all", "tags": "bath soothing relief itchy irritated"},
            
            # Psoriasis products
            {"id": 4, "name": "Coal Tar Shampoo", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Reduces scaling, itching and inflammation", "disease": "Psoriasis", 
             "ingredients": "coal tar, salicylic acid", 
             "skin_types": "all", "age_range": "adult", "tags": "shampoo scalp psoriasis scaling relief"},
            
            {"id": 5, "name": "Salicylic Acid Ointment", "image_url": "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png", 
             "description": "Helps remove scales and smooth skin", "disease": "Psoriasis", 
             "ingredients": "salicylic acid, mineral oil", 
             "skin_types": "all", "age_range": "adult", "tags": "exfoliant scales removal smooth"},
            
            {"id": 6, "name": "Corticosteroid Cream", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Reduces inflammation and relieves itching", "disease": "Psoriasis,Eczema", 
             "ingredients": "hydrocortisone, petroleum jelly", 
             "skin_types": "all", "age_range": "adult", "tags": "anti-inflammatory steroid itching inflammation"},
            
            # Ringworm products
            {"id": 7, "name": "Antifungal Cream", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Combats fungal infections", "disease": "Ringworm", 
             "ingredients": "clotrimazole, miconazole", 
             "skin_types": "all", "age_range": "all", "tags": "antifungal infection treatment cream"},
            
            {"id": 8, "name": "Medicated Soap", "image_url": "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png", 
             "description": "Helps cleanse infected areas", "disease": "Ringworm", 
             "ingredients": "ketoconazole, tea tree oil", 
             "skin_types": "all", "age_range": "all", "tags": "cleansing soap antifungal medicated"},
            
            {"id": 9, "name": "Antifungal Powder", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Helps keep affected areas dry", "disease": "Ringworm", 
             "ingredients": "miconazole, zinc oxide", 
             "skin_types": "all", "age_range": "all", "tags": "powder dry antifungal prevent"},
            
            # Shingles products
            {"id": 10, "name": "Antiviral Medication", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Prescription medication to combat the virus", "disease": "Shingles", 
             "ingredients": "acyclovir, famciclovir", 
             "skin_types": "all", "age_range": "adult", "tags": "antiviral medication prescription shingles"},
            
            {"id": 11, "name": "Calamine Lotion", "image_url": "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png", 
             "description": "Soothes skin and reduces itching", "disease": "Shingles", 
             "ingredients": "calamine, zinc oxide", 
             "skin_types": "all", "age_range": "all", "tags": "soothing lotion calamine itching relief"},
            
            {"id": 12, "name": "Lidocaine Patch", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Provides pain relief", "disease": "Shingles", 
             "ingredients": "lidocaine", 
             "skin_types": "all", "age_range": "adult", "tags": "pain relief patch numbing lidocaine"},
            
            # Vitiligo products
            {"id": 13, "name": "Topical Corticosteroids", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "May help return color to the skin", "disease": "Vitiligo", 
             "ingredients": "betamethasone, clobetasol", 
             "skin_types": "all", "age_range": "adult", "tags": "repigmentation steroid color loss"},
            
            {"id": 14, "name": "UVB Phototherapy Device", "image_url": "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png", 
             "description": "Light therapy that may restore skin color", "disease": "Vitiligo", 
             "ingredients": "UVB light", 
             "skin_types": "all", "age_range": "adult", "tags": "phototherapy light treatment color restoration"},
            
            {"id": 15, "name": "Specialized Concealer", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Helps cover depigmented areas", "disease": "Vitiligo", 
             "ingredients": "iron oxides, titanium dioxide", 
             "skin_types": "all", "age_range": "all", "tags": "concealer makeup coverage cosmetic"},
            
            # General sensitive skin products
            {"id": 16, "name": "Hypoallergenic Moisturizer", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Extra gentle formula for sensitive skin", "disease": "Eczema,Psoriasis,Vitiligo", 
             "ingredients": "glycerin, squalane, no fragrance", 
             "skin_types": "sensitive, dry", "age_range": "all", "tags": "gentle hypoallergenic fragrance-free sensitive"},
            
            {"id": 17, "name": "Soothing Aloe Gel", "image_url": "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png", 
             "description": "Naturally calms irritated skin", "disease": "Eczema,Psoriasis,Shingles", 
             "ingredients": "aloe vera, cucumber extract", 
             "skin_types": "all", "age_range": "all", "tags": "soothing natural cooling aloe irritation"},
            
            {"id": 18, "name": "Gentle Sunscreen SPF 50", "image_url": "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png", 
             "description": "Broad-spectrum protection for sensitive skin", "disease": "Vitiligo,Psoriasis,Eczema", 
             "ingredients": "zinc oxide, titanium dioxide", 
             "skin_types": "all", "age_range": "all", "tags": "sun protection mineral sensitive non-irritating"},
        ]
        
        return pd.DataFrame(products)
    
    def _prepare_product_features(self):
        """Prepare product features for content-based filtering"""
        # Combine relevant features for content-based filtering
        self.products_df['features'] = self.products_df['description'] + ' ' + \
                                       self.products_df['disease'] + ' ' + \
                                       self.products_df['ingredients'] + ' ' + \
                                       self.products_df['skin_types'] + ' ' + \
                                       self.products_df['tags']
        
        # Create TF-IDF matrix
        tfidf_matrix = self.vectorizer.fit_transform(self.products_df['features'])
        
        # Calculate similarity between products
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        
        return cosine_sim
        
    def get_disease_remedies(self, disease):
        """Get standard remedies for a disease"""
        remedies = {
            "Eczema": [
                "Apply moisturizer frequently",
                "Use gentle, fragrance-free products",
                "Take lukewarm (not hot) baths",
                "Use a humidifier",
                "Try to identify and avoid triggers"
            ],
            "Psoriasis": [
                "Apply moisturizing creams regularly",
                "Take daily baths with gentle cleansers",
                "Avoid dry air and cold weather",
                "Use a humidifier",
                "Expose your skin to small amounts of sunlight"
            ],
            "Ringworm": [
                "Keep affected areas clean and dry",
                "Apply antifungal cream as directed",
                "Don't share personal items",
                "Change socks and underwear daily",
                "Treat pets if they are the source"
            ],
            "Shingles": [
                "Apply cool compresses to reduce pain",
                "Take regular baths or use calamine lotion",
                "Wear loose-fitting clothing",
                "Reduce stress to prevent outbreaks",
                "Get plenty of rest and maintain a healthy diet"
            ],
            "Vitiligo": [
                "Use sunscreen with high SPF",
                "Protect skin from the sun",
                "Consider makeup or self-tanning products",
                "Join a support group for emotional support",
                "Maintain overall health with a balanced diet"
            ]
        }
        
        return remedies.get(disease, ["Consult with a dermatologist for personalized remedies"])
    
    def personalize_remedies(self, disease, user_details):
        """Personalize remedies based on user details"""
        base_remedies = self.get_disease_remedies(disease)
        personalized_remedies = base_remedies.copy()
        
        # Get user details
        age = user_details.get('age', 0)
        gender = user_details.get('gender', '')
        skin_type = user_details.get('skinType', '')
        allergies = user_details.get('allergies', [])
        
        # Add personalized remedies based on user details
        if skin_type.lower() == 'dry':
            personalized_remedies.append("Use oil-based moisturizers for extra hydration")
        
        elif skin_type.lower() == 'oily':
            personalized_remedies.append("Use lightweight, oil-free moisturizers")
        
        elif skin_type.lower() == 'sensitive':
            personalized_remedies.append("Patch test new products before applying them to affected areas")
        
        if age < 18:
            personalized_remedies.append("Consult with a pediatric dermatologist")
        elif age > 60:
            personalized_remedies.append("Use gentle products designed for mature skin")
        
        if allergies:
            allergen_text = ", ".join(allergies)
            personalized_remedies.append(f"Avoid products containing your allergens: {allergen_text}")
        
        return personalized_remedies
    
    def recommend_products(self, disease, user_details, num_recommendations=3):
        """Recommend products based on disease and user preferences"""
        # Filter products by disease
        disease_products = self.products_df[self.products_df['disease'].str.contains(disease)]
        
        if disease_products.empty:
            return []
        
        # Filter further based on user details
        skin_type = user_details.get('skinType', '').lower()
        age = user_details.get('age', 30)
        allergies = [a.lower() for a in user_details.get('allergies', [])]
        
        # Filter by skin type if specified
        if skin_type:
            skin_type_products = disease_products[disease_products['skin_types'].str.contains(skin_type)]
            if not skin_type_products.empty:
                disease_products = skin_type_products
        
        # Filter by age appropriateness
        if age < 18:
            age_appropriate = disease_products[
                (disease_products['age_range'] == 'all') | 
                (disease_products['age_range'] == 'child')
            ]
            if not age_appropriate.empty:
                disease_products = age_appropriate
        
        # Filter out products containing allergens
        if allergies:
            filtered_products = disease_products.copy()
            for allergen in allergies:
                filtered_products = filtered_products[~filtered_products['ingredients'].str.contains(allergen, case=False)]
            
            if not filtered_products.empty:
                disease_products = filtered_products
        
        # If we have no products after filtering, return to disease-based products
        if disease_products.empty:
            disease_products = self.products_df[self.products_df['disease'].str.contains(disease)]
        
        # Select top products
        if len(disease_products) <= num_recommendations:
            recommended_products = disease_products
        else:
            # For more sophisticated selection, could use collaborative filtering or user preference learning
            # For now, just select a diverse set
            recommended_products = disease_products.sample(num_recommendations)
        
        # Format for API response
        result = []
        for _, product in recommended_products.iterrows():
            result.append({
                "name": product['name'],
                "imageUrl": product['image_url'],
                "description": product['description']
            })
        
        return result
    
    def get_recommendations(self, disease, user_details):
        """Get complete recommendations including personalized remedies and products"""
        # Get personalized remedies
        remedies = self.personalize_remedies(disease, user_details)
        
        # Get recommended products
        products = self.recommend_products(disease, user_details)
        
        return {
            "remedies": remedies,
            "products": products
        }