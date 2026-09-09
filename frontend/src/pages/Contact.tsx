import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us & FAQ</h1>
          <p className="text-xl text-gray-500">We're here to help. Reach out to our support team or check the FAQs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition">
                Submit Message
              </button>
            </form>
          </div>

          <div>
            <div className="mb-12 space-y-6">
              <div className="flex items-start">
                <Mail className="text-primary-600 mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">support@legalconnect.example.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-primary-600 mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">1-800-LEGAL-HELP (Mon-Fri, 9am-5pm)</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-primary-600 mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Office</h3>
                  <p className="text-gray-600">123 Legal Avenue, Suite 400<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900">How do I know the lawyers are real?</h4>
                <p className="text-gray-600 text-sm mt-1">Every lawyer must submit their Bar Registration Number during signup. Our admin team manually verifies this against public bar directories before they are allowed to appear in search results.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Are the consultations free?</h4>
                <p className="text-gray-600 text-sm mt-1">Consultation fees are set individually by each lawyer. You will see the exact fee on their profile before booking. Some may offer free initial consultations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
