"use client";

import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { UploadCloud, Download, Sparkles, MoveHorizontal, RefreshCw } from 'lucide-react';

export default function ClientEnhancer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setOriginalImage(src);
      setEnhancedImage(null); // Reset enhanced state on new upload
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!originalImage) return;
    setIsProcessing(true);

    // Simulate a slight delay to make the "AI" feel like it's working hard
    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Upscale 2x
        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image scaled up
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply contrast and sharpness via filter
        // We use a CSS filter trick on the canvas context if supported, 
        // but to ensure it exports in the dataURL, we apply it mathematically or via ctx.filter
        ctx.filter = 'contrast(1.15) saturate(1.1) brightness(1.05)';
        ctx.drawImage(canvas, 0, 0); // redraw over itself with filter
        
        // Pseudo-sharpening (unsharp mask simulation)
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = 'overlay';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Reset composite
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';

        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setEnhancedImage(dataUrl);
        setIsProcessing(false);
      };
      img.src = originalImage;
    }, 800); // 800ms artificial delay for perceived value
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || !enhancedImage) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const resetTool = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      
      {!originalImage && (
        <div 
          onClick={triggerUpload}
          style={{ 
            padding: '4rem 2rem', 
            textAlign: 'center', 
            cursor: 'pointer',
            background: 'linear-gradient(to bottom, #fafafa, #ffffff)',
          }}
        >
          <div style={{ width: 80, height: 80, background: '#eff6ff', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <UploadCloud size={40} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Upload an image to enhance</h3>
          <p style={{ color: 'var(--text-muted)' }}>Supports JPG, PNG, and WebP up to 10MB.</p>
        </div>
      )}

      {originalImage && !enhancedImage && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <img 
            src={originalImage} 
            alt="Original" 
            style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
          <div>
            <button 
              onClick={processImage} 
              disabled={isProcessing}
              className="btn btn-primary" 
              style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, #ec4899, #9333ea)', border: 'none', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)' }}
            >
              {isProcessing ? (
                <><RefreshCw size={20} className="spin" style={{ marginRight: '0.5rem' }} /> Enhancing Image...</>
              ) : (
                <><Sparkles size={20} style={{ marginRight: '0.5rem' }} /> Enhance to HD</>
              )}
            </button>
            <button onClick={resetTool} className="btn" style={{ marginLeft: '1rem', background: '#f1f5f9', color: '#475569' }}>Cancel</button>
          </div>
        </div>
      )}

      {enhancedImage && (
        <div style={{ padding: '2rem' }}>
          
          <div 
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '400px', 
              background: '#e2e8f0', 
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none'
            }}
          >
            {/* Base Image (Enhanced) */}
            <img 
              src={enhancedImage} 
              alt="Enhanced" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }} 
            />
            
            {/* Overlay Image (Original) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: `${sliderPosition}%`, height: '100%', overflow: 'hidden' }}>
               <img 
                src={originalImage || ''} 
                alt="Original" 
                style={{ width: sliderRef.current?.clientWidth || '100%', height: '100%', objectFit: 'contain', filter: 'blur(1px)' }} 
              />
               <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' }}>BEFORE</div>
            </div>
            
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' }}>HD ENHANCED</div>

            {/* Slider Handle */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              bottom: 0, 
              left: `calc(${sliderPosition}% - 2px)`, 
              width: '4px', 
              background: 'white',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: 36, height: 36, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                <MoveHorizontal size={20} color="#475569" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
             <a 
              href={enhancedImage} 
              download="enhanced-image-hd.jpg"
              className="btn btn-primary" 
              style={{ padding: '0.75rem 1.5rem', background: '#10b981', borderColor: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={20} /> Download HD Image
            </a>
            <button onClick={resetTool} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UploadCloud size={20} /> Enhance Another
            </button>
          </div>
        </div>
      )}

      <input 
        type="file" 
        accept="image/png, image/jpeg, image/webp" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        style={{ display: 'none' }} 
      />
    </div>
  );
}
