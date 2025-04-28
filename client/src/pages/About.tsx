
import React from 'react';
import Navbar from '@/components/Navbar';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-dermiq-cream">
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About DermIQ</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <p className="text-lg mb-6">
              Welcome to DermIQ, your trusted partner in personalized skin care evaluation and recommendations. 
              We understand that every skin type is unique, and our goal is to provide you with accurate insights 
              into your skin's health. By analyzing skin conditions, we aim to empower you with knowledge and guide 
              you towards better skincare solutions.
            </p>
            
            <p className="text-lg mb-6">
              Our advanced AI model specializes in detecting five common skin conditions: Psoriasis, Ringworm, 
              Shingles, Vitiligo, and Eczema. By simply uploading a clear image of the affected area, our 
              algorithm can identify the condition and provide tailored recommendations for treatment and care.
            </p>
            
            <p className="text-lg">
              DermIQ is not a substitute for professional medical advice. While our AI provides valuable insights, 
              we always recommend consulting with a dermatologist for a proper diagnosis and treatment plan.
            </p>
          </div>
          
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/lovable-uploads/ac82a3b8-634c-4661-8757-ebacce1d4b7c.png"
                alt="Shrushti Patil"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-dermiq-maroon">Shrushti Patil</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/lovable-uploads/da028cdb-966c-4e0f-a3a0-44b27a8fb118.png"
                alt="Tanmay Patil"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-dermiq-maroon">Tanmay Patil</h3>
              <p className="text-gray-600">AI Specialist</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="/lovable-uploads/3dfb4d1c-4f79-4e65-b7cc-d5d57d166cf4.png"
                alt="Miheet Shah"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-dermiq-maroon">Miheet Shah</h3>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-dermiq-maroon">AI-Powered Analysis</h3>
                <p className="mb-4">
                  Our cutting-edge machine learning algorithms have been trained on thousands of images to accurately 
                  identify common skin conditions. We continuously improve our models to ensure the highest level of accuracy.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-dermiq-maroon">Personalized Recommendations</h3>
                <p className="mb-4">
                  Based on your analysis results, we provide personalized product recommendations and home remedies 
                  tailored to your specific condition, skin type, and preferences.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-dermiq-maroon">Secure & Private</h3>
                <p className="mb-4">
                  We take your privacy seriously. All images and personal information are encrypted and stored securely. 
                  We never share your data with third parties without your explicit consent.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-dermiq-maroon">Educational Resources</h3>
                <p className="mb-4">
                  We believe in empowering our users with knowledge. That's why we provide comprehensive information 
                  about each skin condition, including causes, symptoms, and management strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
