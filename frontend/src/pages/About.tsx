import React from 'react';
import { ShieldCheck, Scale, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="bg-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-secondary-900 sm:text-5xl md:text-6xl">
            Democratizing Access to <span className="text-primary-600">Legal Expertise</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-secondary-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We believe finding the right lawyer shouldn't be harder than your legal case. Our platform bridges the gap between individuals seeking justice and verified legal professionals ready to help.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Trust & Verification</h3>
              <p className="text-gray-600">Every lawyer on our platform undergoes a strict verification process, ensuring their bar credentials and specialties are completely accurate.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Pricing</h3>
              <p className="text-gray-600">No hidden fees. Consultation rates are clearly displayed upfront, allowing you to choose expertise that fits your budget.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Client-Centric</h3>
              <p className="text-gray-600">From intuitive scheduling to secure case notes, the platform is designed to make your legal journey as smooth and stress-free as possible.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Our Story</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            LegalConnect was founded by a team of legal professionals and technologists who recognized a fundamental flaw in how people access legal services. The traditional method of asking for referrals or blindly searching online often leads to mismatches, wasted money, and prolonged stress. We built LegalConnect to introduce transparency, speed, and trust into the legal consultation process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
