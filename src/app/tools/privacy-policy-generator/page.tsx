"use client";
import Link from "next/link";

import { useState } from "react";
import { FileText, Copy, Check, ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyGenerator() {
  const [company, setCompany] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [generatedPolicy, setGeneratedPolicy] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePolicy = () => {
    if (!company || !websiteUrl || !email) return;

    const policy = `Privacy Policy for ${company}

Effective Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

1. Introduction
Welcome to ${company} ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (${websiteUrl}) and tell you about your privacy rights and how the law protects you.

2. The Data We Collect About You
Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
- Identity Data includes first name, maiden name, last name, username or similar identifier.
- Contact Data includes billing address, delivery address, email address and telephone numbers.
- Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.
- Usage Data includes information about how you use our website, products and services.

3. How We Use Your Personal Data
We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
- Where we need to perform the contract we are about to enter into or have entered into with you.
- Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
- Where we need to comply with a legal obligation.

4. Cookies and Web Beacons
Like any other website, ${company} uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.

5. Third-Party Links
Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.

6. Data Security
We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.

7. Contact Us
If you have any questions about this privacy policy or our privacy practices, please contact us at:
Email: ${email}
Website: ${websiteUrl}

---
Disclaimer: This is a basic privacy policy template generated for general informational purposes. It does not constitute legal advice. We recommend consulting a lawyer to ensure compliance with specific regional laws (such as GDPR or CCPA).`;

    setGeneratedPolicy(policy);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPolicy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <Link
        href="/tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldCheck color="var(--primary)" /> Privacy Policy Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly generate a basic privacy policy for your website, blog, or app to comply with AdSense and app store requirements.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Form Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Enter Your Details</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Company or Website Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. StartupAI Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Website URL</label>
            <input 
              type="url" 
              className="input-field" 
              placeholder="e.g. https://startupai.tech"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Support Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="e.g. privacy@startupai.tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }} 
            onClick={generatePolicy} 
            disabled={!company || !websiteUrl || !email}
          >
            Generate Privacy Policy
          </button>
        </div>

        {/* Output Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Generated Policy</h3>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!generatedPolicy}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          {generatedPolicy ? (
            <textarea 
              className="input-field"
              style={{ flexGrow: 1, minHeight: '350px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5, background: '#f8fafc' }}
              readOnly
              value={generatedPolicy}
            />
          ) : (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)', padding: '2rem', textAlign: 'center' }}>
              <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>Fill out the form on the left and click "Generate" to see your custom privacy policy here.</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>Why does every website need a Privacy Policy?</h2>
        <p>If you're building a new website or app, a privacy policy is probably the absolute last thing you want to spend your time writing. But unfortunately, in today's digital landscape, it is completely unavoidable. Whether you are running a simple blog or a massive software-as-a-service application, you are almost certainly collecting data from your users.</p>
        
        <h3>1. Advertising and Monetization (Google AdSense)</h3>
        <p>If you want to make money by placing ads on your website through Google AdSense, they will strictly require you to have a visible Privacy Policy linked in your footer. Ad networks use cookies to track users across the internet to serve them relevant ads. By law, you have to disclose to your visitors that these third-party cookies exist. If you apply for AdSense without a privacy policy, your application will be instantly rejected.</p>

        <h3>2. Analytics (Google Analytics)</h3>
        <p>Even if you don't run ads, you probably use Google Analytics (or a similar tool) to see how many people are visiting your site. These tools track IP addresses, browser types, and geographic locations. Again, you must legally disclose that you are collecting this technical data.</p>

        <h3>3. Mobile App Stores</h3>
        <p>If you are a developer submitting an app to the Apple App Store or the Google Play Store, they literally will not let you hit the "Publish" button unless you provide a URL pointing to your privacy policy. It is a mandatory, hard requirement for app approval.</p>

        <h2>Is this generated policy legally binding?</h2>
        <p>The template generated by this tool is a standard, boilerplate privacy agreement designed to cover the basic requirements of standard analytics and advertising cookies. For 90% of basic blogs, portfolio sites, and simple utility apps, this template is more than enough to satisfy AdSense requirements.</p>
        <p>However, <strong>we are developers, not lawyers!</strong> If your website processes credit card payments, collects sensitive medical information, or specifically targets users in regions with massive compliance frameworks (like the European Union's GDPR or the California Consumer Privacy Act), you should absolutely hire a real attorney. This generator is meant for simple websites that need basic cookie and analytics disclosure.</p>

        <h2>How to use this generated text</h2>
        <p>Once you generate your policy using the tool above, simply click the "Copy to Clipboard" button. Then, go to your WordPress site (or whatever website builder you use) and create a new blank page called "Privacy Policy". Paste the text there, and then add a link to that page in the footer menu of your entire website.</p>
      </div>
    </div>
  );
}
