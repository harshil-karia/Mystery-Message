// pages/privacy-policy.tsx

import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          <div className="prose">
            <h2 className="font-bold">1. Introduction</h2>
            <p>
              At Mystery Message, we value and respect your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.
            </p>

            <h2 className="font-bold mt-4">2. Information Collection</h2>
            <p>
              We collect personal information that you voluntarily provide to us when using our website or services. This may include your name, email address, and any other details you provide.
            </p>

            <h2 className="font-bold mt-4">3. Use of Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users and Mystery Message from unauthorized access and fraud.
            </p>

            <h2 className="font-bold mt-4">4. Cookies</h2>
            <p>
              Mystery Message may use cookies and similar technologies to enhance your user experience, track usage patterns, and analyze trends. You can manage cookies in your browser settings.
            </p>

            <h2 className="font-bold mt-4">5. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.
            </p>

            <h2 className="font-bold mt-4">6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. Mystery Message is not responsible for the privacy practices or content of these third-party sites.
            </p>

            <h2 className="font-bold mt-4">7. Changes to This Policy</h2>
            <p>
              Mystery Message reserves the right to update or change this Privacy Policy at any time. We will notify you of any changes by posting the updated policy on our website.
            </p>

            <h2 className="font-bold mt-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@mysterymessage.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
