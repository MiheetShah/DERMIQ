
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalysis } from '@/context/AnalysisContext';
import Navbar from '@/components/Navbar';

const Results: React.FC = () => {
  const { results } = useAnalysis();
  
  // Get the most recent result
  const mostRecentResult = [...results].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  if (!mostRecentResult) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center bg-dermiq-cream">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No analysis results found</h2>
            <p className="mb-8">You haven't analyzed any skin images yet.</p>
            <Link to="/analyze">
              <Button className="bg-dermiq-maroon hover:bg-dermiq-maroon/90 text-white">
                Go to Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-dermiq-cream">
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Analysis Results</h1>
            <p className="text-gray-600">
              Analysis completed on {formatDate(mostRecentResult.date)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="remedies">Home Remedies</TabsTrigger>
                <TabsTrigger value="products">Recommended Products</TabsTrigger>
                <TabsTrigger value="history">Analysis History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {mostRecentResult.imageUrl && (
                      <div className="mb-6">
                        <img
                          src={mostRecentResult.imageUrl}
                          alt="Analyzed skin"
                          className="w-full max-h-80 object-contain rounded-lg border"
                        />
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Detected Condition</h3>
                      <p className="text-2xl text-dermiq-maroon font-semibold">
                        {mostRecentResult.disease}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Description</h3>
                      <p className="text-gray-700">
                        {mostRecentResult.description}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Patient Information</h3>
                    <div className="space-y-4">
                      {mostRecentResult.userDetails.name && (
                        <div>
                          <p className="font-semibold">Name:</p>
                          <p>{mostRecentResult.userDetails.name}</p>
                        </div>
                      )}
                      
                      {mostRecentResult.userDetails.age && (
                        <div>
                          <p className="font-semibold">Age:</p>
                          <p>{mostRecentResult.userDetails.age}</p>
                        </div>
                      )}
                      
                      {mostRecentResult.userDetails.gender && (
                        <div>
                          <p className="font-semibold">Gender:</p>
                          <p>{mostRecentResult.userDetails.gender}</p>
                        </div>
                      )}
                      
                      {mostRecentResult.userDetails.skinType && (
                        <div>
                          <p className="font-semibold">Skin Type:</p>
                          <p>{mostRecentResult.userDetails.skinType}</p>
                        </div>
                      )}
                      
                      {mostRecentResult.userDetails.allergies && mostRecentResult.userDetails.allergies.length > 0 && (
                        <div>
                          <p className="font-semibold">Allergies:</p>
                          <p>{mostRecentResult.userDetails.allergies.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="remedies" className="p-4">
                <h3 className="text-2xl font-bold mb-6">Home Remedies for {mostRecentResult.disease}</h3>
                <ul className="space-y-4 list-disc pl-5">
                  {mostRecentResult.remedies.map((remedy, index) => (
                    <li key={index} className="text-lg">
                      {remedy}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-4 bg-dermiq-cream rounded-md">
                  <h4 className="text-lg font-semibold mb-2">Important Note:</h4>
                  <p>
                    These home remedies are suggestions that may help manage symptoms. Always consult with a dermatologist 
                    before starting any treatment. If symptoms worsen or persist, seek medical attention promptly.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="products" className="p-4">
                <h3 className="text-2xl font-bold mb-6">Recommended Products for {mostRecentResult.disease}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mostRecentResult.products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4 flex flex-col items-center">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-40 h-40 object-contain mb-4"
                        />
                      )}
                      <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                      {product.description && (
                        <p className="text-gray-700 text-center">{product.description}</p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-dermiq-cream rounded-md">
                  <h4 className="text-lg font-semibold mb-2">Disclaimer:</h4>
                  <p>
                    These product recommendations are based on general effectiveness for the identified condition.
                    Individual results may vary. We recommend consulting with a dermatologist before purchasing any products.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="p-4">
                <h3 className="text-2xl font-bold mb-6">Analysis History</h3>
                
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {[...results]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((result, index) => (
                        <div key={index} className="border rounded-lg p-4 flex items-center">
                          <div className="mr-4 flex-shrink-0">
                            {result.imageUrl && (
                              <img
                                src={result.imageUrl}
                                alt={`Analysis ${index + 1}`}
                                className="w-20 h-20 object-cover rounded"
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold">{result.disease}</p>
                            <p className="text-sm text-gray-600">
                              {formatDate(result.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>No analysis history available.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="/analyze">
              <Button className="bg-dermiq-maroon hover:bg-dermiq-maroon/90 text-white">
                Analyze Another Image
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
