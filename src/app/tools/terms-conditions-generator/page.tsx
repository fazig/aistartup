"use client";

import { useState } from "react";
import { FileSignature, Copy, Check, ShieldAlert } from "lucide-react";

export default function TermsConditionsGenerator() {
  const [company, setCompany] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [country, setCountry] = useState("");
  const [generatedTerms, setGeneratedTerms] = useState("");
  const [copied, setCopied] = useState(false);

  const generateTerms = () => {
    if (!company || !websiteUrl || !country) return;

    const terms = `Terms and Conditions for ${company}

Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

1. Introduction
Welcome to ${company}. These Terms and Conditions outline the rules and regulations for the use of our Website, located at ${websiteUrl}.
By accessing this website, we assume you accept these terms and conditions. Do not continue to use ${company} if you do not agree to take all of the terms and conditions stated on this page.

2. Intellectual Property Rights
Other than the content you own, under these Terms, ${company} and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.

3. Restrictions
You are specifically restricted from all of the following:
- Publishing any Website material in any other media without prior consent;
- Selling, sublicensing and/or otherwise commercializing any Website material;
- Publicly performing and/or showing any Website material;
- Using this Website in any way that is or may be damaging to this Website;
- Using this Website in any way that impacts user access to this Website;
- Using this Website contrary to applicable laws and regulations, or in any way that may cause harm to the Website, or to any person or business entity.

4. Your Content
In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images, or other material you choose to display on this Website. By displaying Your Content, you grant ${company} a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.

5. No Warranties
This Website is provided "as is," with all faults, and ${company} express no representations or warranties, of any kind related to this Website or the materials contained on this Website. 

6. Limitation of Liability
In no event shall ${company}, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. ${company}, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.

7. Governing Law & Jurisdiction
These Terms will be governed by and interpreted in accordance with the laws of ${country}, and you submit to the non-exclusive jurisdiction of the state and federal courts located in ${country} for the resolution of any disputes.

---
Disclaimer: This document is a generic Terms and Conditions template generated for general informational purposes. It does not constitute legal advice. We highly recommend consulting a lawyer to ensure compliance with specific regional laws and the specific nature of your business.`;

    setGeneratedTerms(terms);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTerms);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileSignature color="var(--primary)" /> Terms & Conditions Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly create a standard legal agreement for your website to protect your intellectual property and limit your liability.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Form Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Business Information</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Company / Website Name</label>
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
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Country / State of Jurisdiction</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. California, USA"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div style={{ padding: '1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <ShieldAlert color="#d97706" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.85rem', color: '#92400e', margin: 0 }}>
              This generator creates a standard liability template. If you sell physical products, handle subscriptions, or process payments, you should have an actual lawyer review your terms.
            </p>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            onClick={generateTerms} 
            disabled={!company || !websiteUrl || !country}
          >
            Generate Terms & Conditions
          </button>
        </div>

        {/* Output Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Generated Agreement</h3>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!generatedTerms}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          {generatedTerms ? (
            <textarea 
              className="input-field"
              style={{ flexGrow: 1, minHeight: '400px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5, background: '#f8fafc' }}
              readOnly
              value={generatedTerms}
            />
          ) : (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)', padding: '2rem', textAlign: 'center' }}>
              <FileSignature size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>Fill out the form on the left and click "Generate" to see your custom legal agreement here.</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What are Terms & Conditions?</h2>
        <p>If the Privacy Policy is a legal document protecting your users, the Terms and Conditions (T&C) is the legal document protecting <strong>you</strong>. Also known as Terms of Service or Terms of Use, this document acts as a legally binding contract between you (the website owner) and the visitors accessing your platform.</p>
        <p>By simply visiting your website, users are agreeing to these rules. It sets the boundaries for what they are allowed to do on your site, and more importantly, it strictly limits your liability if something goes wrong.</p>
        
        <h2>Why do you absolutely need one?</h2>
        <p>Many new web developers skip writing Terms of Service because they assume their blog or utility tool is too small to get sued. This is a massive mistake. Here are the main reasons you need this document:</p>

        <h3>1. Preventing Abuse & Banning Users</h3>
        <p>If you run a forum, a SaaS app, or any site where users can create accounts, you need the legal right to ban them if they misbehave. If a user starts spamming your site, harassing other users, or trying to hack your server, your Terms of Service gives you the explicit legal authority to instantly terminate their account without them being able to sue you for "breach of contract."</p>

        <h3>2. Protecting Your Intellectual Property</h3>
        <p>You probably spent hundreds of hours designing your website, writing the code, and generating the content. Your T&C explicitly states that you own all the logos, articles, and code on the site. If a competitor copy-pastes your entire website and steals your branding, this document is the foundation you will use to send a DMCA Takedown Notice to their web host.</p>

        <h3>3. Limitation of Liability</h3>
        <p>This is the most important paragraph in the entire document. Our generator includes a strong "Limitation of Liability" clause. Imagine you run a fitness blog, and you post a workout routine. A user tries the routine, drops a dumbbell on their foot, and tries to sue you for their medical bills. Your Terms of Service explicitly states that the information is provided "as is" and that you cannot be held financially liable for any damages resulting from the use of your website.</p>

        <h2>Is this generator a replacement for a lawyer?</h2>
        <p>No. This tool generates a standard, boilerplate agreement that is fantastic for informational websites, blogs, portfolios, and basic free utility tools (like this one!). However, if you are running a complex eCommerce store, processing thousands of dollars in payments, or handling sensitive user data (like medical records), you absolutely must consult a real attorney to draft a custom agreement tailored to your exact business risks.</p>
      </div>
    </div>
  );
}
