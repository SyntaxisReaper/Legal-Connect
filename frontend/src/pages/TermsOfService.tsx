import React from 'react';
import { Scale, AlertCircle, FileSignature } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <Scale className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-500">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 prose prose-primary max-w-none text-gray-700">
          
          <div className="mb-8 p-6 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-amber-900 mt-0 mb-2">Important Legal Disclaimer</h3>
              <p className="m-0 text-amber-800 text-sm leading-relaxed">
                LegalConnect is a technology platform, not a law firm. Use of this platform does not create an attorney-client relationship between you and LegalConnect. The information provided on this site is for general informational purposes only and is not legal advice.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the LegalConnect service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

          <div className="flex items-center space-x-3 mt-10 mb-4">
            <FileSignature className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">2. The Attorney-Client Relationship</h2>
          </div>
          <p>Please carefully read the following regarding interactions with lawyers on our platform:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>No Automatic Relationship:</strong> Contacting a lawyer through our platform does not establish an attorney-client relationship. A formal relationship is only established when you and the lawyer sign a separate written representation agreement.</li>
            <li><strong>Conflict of Interest:</strong> Do not send highly confidential information in your initial inquiry, as the lawyer must first run a conflict check to ensure they do not represent opposing parties.</li>
            <li><strong>Independent Professionals:</strong> Lawyers on our platform are independent practitioners. LegalConnect does not endorse, recommend, or guarantee the outcome of any legal matter handled by lawyers found on this platform.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
          <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Prohibited Uses</h2>
          <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate LegalConnect, a LegalConnect employee, another user, or any other person or entity.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
          <p>In no event shall LegalConnect, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
