import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <h3 className="text-xl font-bold mb-4">About FishNet</h3>
          <p className="text-sm text-gray-300">
            FishNet is a smart platform for the fisheries sector providing tools for quality assurance, price forecasting, inventory management, and more to empower Indian fishermen with tech-driven solutions.
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
            <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-sm text-gray-300">Email: support@fishnet.in</p>
          <p className="text-sm text-gray-300 mt-1">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-300 mt-1">Location: Hyderabad, India</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} FishNet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
