import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <Scale size={28} className="text-primary-500" />
              <span className="text-2xl font-bold">LegalConnect</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Making expert legal assistance accessible, transparent, and efficient for everyone. Connect with verified professionals today.
            </p>
            <div className="flex space-x-4 text-gray-400">
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/lawyers" className="hover:text-white transition">Find a Lawyer</Link></li>
              <li><Link to="/practice-areas" className="hover:text-white transition">Practice Areas</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Legal Domains</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/lawyers?search=Corporate" className="hover:text-white transition">Corporate Law</Link></li>
              <li><Link to="/lawyers?search=Family" className="hover:text-white transition">Family Law</Link></li>
              <li><Link to="/lawyers?search=Criminal" className="hover:text-white transition">Criminal Defense</Link></li>
              <li><Link to="/lawyers?search=Civil" className="hover:text-white transition">Civil Litigation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">FAQ</Link></li>
              <li className="flex items-center mt-4">
                <Mail size={16} className="mr-2 text-primary-500" />
                <a href="mailto:support@legalconnect.example.com" className="hover:text-white transition">support@legalconnect.example.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} LegalConnect. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
