
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div 
        className="flex-1 flex flex-col md:flex-row"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1)),
          url('/lovable-uploads/9312720e-780f-40a5-80a6-aa0313b1b0ba.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16">
          <div className="max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              REJUVENATION<br />SKIN
            </h1>
            <p className="text-xl text-white mb-8">Your Skin Is Your Best Accessory</p>
            <Link to="/login">
              <Button className="bg-dermiq-orange hover:bg-dermiq-orange/90 text-white px-8 py-6 text-lg">
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-8 bg-white/10 backdrop-blur-sm">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-end">
              <div className="text-right">
                <h3 className="text-6xl font-bold text-white">87%</h3>
                <p className="text-white text-xl">Skin feels deeply cleansed</p>
              </div>
              <div className="w-4 h-4 bg-black rounded-full ml-4"></div>
            </div>
            
            <div className="flex items-center justify-end">
              <div className="text-right">
                <h3 className="text-6xl font-bold text-white">81%</h3>
                <p className="text-white text-xl">Skin is clearer</p>
              </div>
              <div className="w-4 h-4 bg-black rounded-full ml-4"></div>
            </div>
            
            <div className="flex items-center justify-end">
              <div className="text-right">
                <h3 className="text-6xl font-bold text-white">80%</h3>
                <p className="text-white text-xl">Pores appear minimised</p>
              </div>
              <div className="w-4 h-4 bg-black rounded-full ml-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
