"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { KeyRound, Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Fallback if user unchecks everything
    if (chars === "") chars = "abcdefghijklmnopqrstuvwxyz";

    let generated = "";
    // Use crypto.getRandomValues for true randomness if available, fallback to Math.random
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        generated += chars[randomValues[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        generated += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    setPassword(generated);
  };

  // Generate on first mount
  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: "Very Weak", color: "#dc2626" }; // Red
    if (length < 12) return { label: "Weak", color: "#ea580c" }; // Orange
    if (length >= 12 && includeNumbers && includeSymbols && includeUppercase) return { label: "Very Strong", color: "#16a34a" }; // Green
    if (length >= 12) return { label: "Strong", color: "#65a30d" }; // Light Green
    return { label: "Medium", color: "#ca8a04" }; // Yellow
  };

  const strength = getStrength();

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
          <KeyRound color="var(--primary)" /> Secure Password Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Generate unbreakable, highly-secure passwords locally in your browser.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '700px', margin: '0 auto' }}>
        {/* Output Display */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            value={password}
            readOnly
            style={{ fontSize: '1.5rem', fontFamily: 'monospace', padding: '1rem', paddingRight: '4rem', textAlign: 'center', letterSpacing: '2px', color: 'var(--foreground)', background: '#f8fafc' }}
          />
          <button 
            onClick={handleCopy}
            style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#16a34a' : 'var(--primary)', padding: '0.5rem' }}
            title="Copy Password"
          >
            {copied ? <Check size={24} /> : <Copy size={24} />}
          </button>
        </div>

        {/* Strength Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0.75rem 1rem', borderRadius: '8px', border: `1px solid ${strength.color}40`, background: `${strength.color}10` }}>
          <span style={{ fontWeight: 600 }}>Password Strength:</span>
          <span style={{ fontWeight: 700, color: strength.color }}>{strength.label}</span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Password Length</label>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{length}</span>
            </div>
            <input 
              type="range" 
              min="4" 
              max="50" 
              value={length} 
              onChange={(e) => { setLength(Number(e.target.value)); generatePassword(); }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={includeUppercase} onChange={(e) => { setIncludeUppercase(e.target.checked); }} style={{ width: '1.2rem', height: '1.2rem' }} />
              Include Uppercase (A-Z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={includeNumbers} onChange={(e) => { setIncludeNumbers(e.target.checked); }} style={{ width: '1.2rem', height: '1.2rem' }} />
              Include Numbers (0-9)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={includeSymbols} onChange={(e) => { setIncludeSymbols(e.target.checked); }} style={{ width: '1.2rem', height: '1.2rem' }} />
              Include Symbols (!@#$)
            </label>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={generatePassword}>
          <RefreshCw size={18} /> Generate New Password
        </button>
      </div>

      <div className="prose">
        <h2>Why shouldn't I just come up with my own password?</h2>
        <p>Human beings are incredibly predictable. When someone is asked to create a password, they almost always use a combination of their child's name, their pet's name, their birth year, or their favorite sports team. The problem is that modern hackers don't guess passwords by typing them into a keyboard—they use massive automated botnets that can guess millions of combinations a second.</p>
        <p>If you use a password like <code>Lakers1985!</code>, an automated dictionary attack program will crack it in less than 5 seconds. To a computer, a password must have a high degree of mathematical "entropy" to be secure. This means it must be totally, completely random.</p>

        <h2>The math behind a strong password</h2>
        <p>The strength of a password relies entirely on two factors: the length of the string, and the variety of the character pool (lowercase, uppercase, numbers, and symbols). </p>
        <p>If you use a 6-character password with only lowercase letters, there are only about 308 million possible combinations. A modern graphics card can brute-force that in a fraction of a second. However, if you use this tool to generate a 16-character password utilizing the full spectrum of letters, numbers, and symbols, the number of possible combinations explodes to roughly <strong>3.27 × 10^31</strong>. It would take a supercomputer millions of years to crack it.</p>

        <h2>Is this generator safe to use?</h2>
        <p>Yes! In fact, it is significantly safer than most other generators on the internet. Many "free" password generators send your newly created password back to their servers via an API. Our tool is built using 100% client-side Javascript. When you click the generate button, the mathematical calculation happens entirely on your own local device.</p>
        <p>Furthermore, our tool utilizes the <code>window.crypto.getRandomValues</code> API built into modern browsers. This is a Cryptographically Secure Pseudorandom Number Generator (CSPRNG), which is vastly superior and more mathematically random than standard Javascript math functions.</p>
      </div>
    </div>
  );
}
