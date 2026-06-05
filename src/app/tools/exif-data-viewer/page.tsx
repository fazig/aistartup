"use client";
import Link from "next/link";

import { useState } from "react";
import { Camera, Image as ImageIcon, Trash2, MapPin, Search, ArrowLeft } from "lucide-react";
import exifr from 'exifr';

export default function ExifDataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [exifData, setExifData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setLoading(true);
    setError(null);
    setExifData(null);

    try {
      // Use exifr to parse the EXIF metadata client-side
      const data = await exifr.parse(selectedFile, {
        tiff: true,
        exif: true,
        gps: true,
      });

      if (!data) {
        setError("No EXIF data found in this image. The metadata may have been stripped.");
      } else {
        setExifData(data);
      }
    } catch (err) {
      setError("Failed to parse image file. Ensure you uploaded a valid JPEG or TIFF format.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setExifData(null);
    setError(null);
  };

  // Helper to safely format GPS coords
  const formatGps = (lat: number, lon: number) => {
    if (lat === undefined || lon === undefined) return "Not Available";
    return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
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
          <Camera color="var(--primary)" /> EXIF Data Viewer
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Extract and read the hidden metadata (camera settings, date, GPS location) secretly embedded inside your photos.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        {/* Upload Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Upload Image</h3>
            {file && (
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleClear}>
                <Trash2 size={14} /> Clear
              </button>
            )}
          </div>
          
          {!file ? (
            <div style={{ flexGrow: 1, border: '2px dashed var(--border-strong)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center', background: '#f8fafc', cursor: 'pointer' }}>
              <input 
                type="file" 
                accept="image/jpeg, image/png, image/webp, image/tiff"
                onChange={handleFileUpload}
                style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
              />
              <ImageIcon size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Drag & Drop or Click to Upload</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Supports JPG, PNG, WEBP, and TIFF.</p>
            </div>
          ) : (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview!} alt="Preview" style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <strong>File:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Extracted Metadata</h3>
          
          {loading && (
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              Parsing image metadata...
            </div>
          )}

          {error && (
            <div style={{ padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          {!file && !loading && !error && (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>Upload a photo to reveal its hidden EXIF data.</p>
            </div>
          )}

          {exifData && (
            <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                
                {/* GPS Highlights */}
                {exifData.latitude && (
                  <div style={{ padding: '1rem', background: '#eff6ff', borderBottom: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MapPin color="#1d4ed8" />
                    <div>
                      <strong style={{ color: '#1e40af', display: 'block', fontSize: '0.9rem' }}>GPS Coordinates Found!</strong>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${exifData.latitude},${exifData.longitude}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'underline' }}
                      >
                        {formatGps(exifData.latitude, exifData.longitude)} &rarr; View on Google Maps
                      </a>
                    </div>
                  </div>
                )}

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <tbody>
                    {['Make', 'Model', 'Software', 'DateTimeOriginal', 'ExposureTime', 'FNumber', 'ISO', 'FocalLength', 'LensModel'].map(key => {
                      if (!exifData[key]) return null;
                      let val = exifData[key];
                      if (val instanceof Date) val = val.toLocaleString();
                      if (key === 'ExposureTime') val = `1/${Math.round(1/val)} sec`;
                      if (key === 'FNumber') val = `f/${val}`;
                      
                      return (
                        <tr key={key} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, width: '40%', background: 'white' }}>{key}</td>
                          <td style={{ padding: '0.75rem 1rem', wordBreak: 'break-all' }}>{val.toString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What is EXIF Data?</h2>
        <p>Whenever you take a photograph with a digital camera, a DSLR, or a modern smartphone (like an iPhone or Android), the image file contains much more than just the pixels you see on the screen. The device secretly embeds a massive block of hidden text inside the image file called <strong>EXIF Data</strong> (Exchangeable Image File Format).</p>
        <p>This metadata acts as a digital fingerprint for the photograph. Without needing to ask the photographer, you can extract the EXIF data to discover exactly what model of camera they used, what lens was attached, the exact date and time the shutter clicked, whether the flash fired, and exactly what exposure settings (ISO, Aperture, Shutter Speed) were used to capture the shot.</p>

        <h2>Privacy Warning: GPS Location Tracking</h2>
        <p>While discovering that a photographer used a 50mm lens is great for studying photography, EXIF data holds a much darker, serious privacy concern: <strong>Geotagging</strong>.</p>
        <p>If you take a picture with a smartphone while your GPS or Location Services are turned on, your phone will actively write your exact, pinpoint GPS coordinates (latitude and longitude) into the hidden EXIF data of the image. If you then upload that raw image file to a forum, send it in an email, or post it on a personal blog, anyone can download it, run it through our EXIF Viewer tool, and see the exact street address where you were standing when you took the photo.</p>
        <p>Major social media platforms (like Facebook, Twitter, and Instagram) automatically strip this data when you upload a photo to protect you. But if you are sending raw files directly to clients or friends, the location data is still there. Use our tool to check your sensitive images before you send them!</p>

        <h2>How do I view EXIF Data?</h2>
        <p>Usually, viewing this metadata requires downloading bulky, professional photo editing software like Adobe Lightroom or Photoshop, or digging through messy, hidden OS menus. </p>
        <p>Our online EXIF Viewer extracts all of this information instantly. And best of all? <strong>It is 100% private.</strong> When you select an image in our tool, the file is NEVER uploaded to our servers. The Javascript code running in your web browser extracts the metadata locally on your own machine. Your photos remain completely secure and private on your hard drive.</p>
      </div>
    </div>
  );
}
