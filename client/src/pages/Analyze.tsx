
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAnalysis } from '@/context/AnalysisContext';
import Navbar from '@/components/Navbar';

const Analyze: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [skinType, setSkinType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addResult } = useAnalysis();

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate analysis process
  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please upload an image to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock diseases data
      const diseases = [
        {
          name: "Eczema",
          description: "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough.",
          remedies: [
            "Apply moisturizer frequently",
            "Use gentle, fragrance-free products",
            "Take lukewarm (not hot) baths",
            "Use a humidifier",
            "Try to identify and avoid triggers"
          ],
          products: [
            { 
              name: "Hydrating Cleanser", 
              imageUrl: "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png",
              description: "Gentle, non-foaming cleanser for sensitive skin"
            },
            { 
              name: "Barrier Repair Cream", 
              imageUrl: "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png",
              description: "Restores the skin's protective barrier"
            }
          ]
        },
        {
          name: "Psoriasis",
          description: "Psoriasis is a skin disorder that causes skin cells to multiply up to 10 times faster than normal.",
          remedies: [
            "Apply moisturizing creams regularly",
            "Take daily baths with gentle cleansers",
            "Avoid dry air and cold weather",
            "Use a humidifier",
            "Expose your skin to small amounts of sunlight"
          ],
          products: [
            { 
              name: "Coal Tar Shampoo", 
              imageUrl: "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png",
              description: "Reduces scaling, itching and inflammation"
            },
            { 
              name: "Salicylic Acid Ointment", 
              imageUrl: "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png",
              description: "Helps remove scales and smooth skin"
            }
          ]
        },
        {
          name: "Ringworm",
          description: "Ringworm is a common fungal infection that affects the skin, hair and nails.",
          remedies: [
            "Keep affected areas clean and dry",
            "Apply antifungal cream as directed",
            "Don't share personal items",
            "Change socks and underwear daily",
            "Treat pets if they are the source"
          ],
          products: [
            { 
              name: "Antifungal Cream", 
              imageUrl: "/lovable-uploads/67470ab7-bf23-42ad-9043-88dbbd73f5d5.png",
              description: "Combats fungal infections"
            },
            { 
              name: "Medicated Soap", 
              imageUrl: "/lovable-uploads/daa6cfca-3cff-4f73-bc3e-16ffa8cfabfd.png",
              description: "Helps cleanse infected areas"
            }
          ]
        }
      ];
      
      // Randomly select a disease for demonstration
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      
      // Add the result
      addResult({
        disease: randomDisease.name,
        description: randomDisease.description,
        imageUrl: previewUrl as string,
        remedies: randomDisease.remedies,
        products: randomDisease.products,
        userDetails: {
          name,
          age: parseInt(age),
          gender,
          skinType,
          allergies: allergies.split(',').map(item => item.trim()),
        }
      });
      
      // Navigate to the results page
      navigate('/results');
      
      toast({
        title: "Analysis Complete",
        description: `Your skin has been analyzed. We've identified ${randomDisease.name}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze skin. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-dermiq-cream">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Let's evaluate your skin!</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Age</label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Gender</label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Skin Type</label>
                  <Select value={skinType} onValueChange={setSkinType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="dry">Dry</SelectItem>
                      <SelectItem value="oily">Oily</SelectItem>
                      <SelectItem value="combination">Combination</SelectItem>
                      <SelectItem value="sensitive">Sensitive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Allergies (separated by commas)</label>
                  <Textarea
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. nuts, dairy, fragrances"
                    className="w-full"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Upload Skin Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-dermiq-orange transition-colors">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="mb-4 max-h-48 object-contain" 
                        />
                      ) : (
                        <div className="text-gray-500 mb-4">
                          <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                      <span className="text-dermiq-maroon font-medium">
                        {previewUrl ? 'Change Image' : 'Choose Image'}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Upload a clear image of the affected area
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-12 pt-6">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!image || isAnalyzing}
                    className="w-full bg-dermiq-maroon hover:bg-dermiq-maroon/90 text-white p-6 text-lg"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'EXAMINE'}
                  </Button>
                </div>
                
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-md text-white">
                      <h3 className="text-xl font-bold mb-4">Dos</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Start with a Good Cleanser</li>
                        <li>Invest in Quality Products</li>
                        <li>Double Cleanse at night</li>
                        <li>Consult your dermatologist</li>
                        <li>Give your skin enough time</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-md text-white">
                      <h3 className="text-xl font-bold mb-4">Don'ts</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Forget SPF</li>
                        <li>Exfoliate every day</li>
                        <li>Touch your face</li>
                        <li>Excessively wash your face</li>
                        <li>Expect results overnight</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
