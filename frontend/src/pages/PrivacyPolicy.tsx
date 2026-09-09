import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-500">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 prose prose-primary max-w-none text-gray-700">
          
          <div className="mb-8 p-6 bg-primary-50 rounded-xl border border-primary-100 flex items-start space-x-4">
            <Lock className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mt-0 mb-2">Our Commitment to Your Privacy</h3>
              <p className="m-0 text-gray-600 text-sm leading-relaxed">
                At LegalConnect, confidentiality is the cornerstone of the legal profession. We employ bank-grade encryption and strict access controls to ensure your sensitive legal inquiries and personal data remain secure.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information, including but not limited to your Email address, First name and last name, Phone number, and Address.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit.</li>
            <li><strong>Attorney-Client Privilege:</strong> Initial inquiries submitted through our platform are securely transmitted to your selected lawyer. However, please be aware that attorney-client privilege may not fully attach until a formal representation agreement is signed with the lawyer.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use of Data</h2>
          <p>LegalConnect uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <div className="flex items-center space-x-3 mt-10 mb-4">
            <Eye className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">3. Disclosure of Data</h2>
          </div>
          <p>Under certain circumstances, LegalConnect may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Security of Data</h2>
          <p>The security of your data is strictly paramount to us. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. However, remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

          <div className="flex items-center space-x-3 mt-10 mb-4">
            <FileText className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">5. Contact Us</h2>
          </div>
          <p>If you have any questions about this Privacy Policy, please contact our Data Protection Officer:</p>
          <ul className="list-none pl-0 mb-6">
            <li className="mb-2">By email: <strong>privacy@legalconnect.example.com</strong></li>
            <li>By visiting this page on our website: <a href="/contact" className="text-primary-600 hover:underline">Contact Us</a></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
