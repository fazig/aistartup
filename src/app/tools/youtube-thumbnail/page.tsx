"use client";
import Link from "next/link";

import { useState } from "react";
import { Video, Download, TriangleAlert, ArrowLeft } from "lucide-react";

export default function YoutubeThumbnail() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (inputUrl: string) => {
    // Matches youtube.com/watch?v=ID, youtu.be/ID, and youtube.com/shorts/ID
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = inputUrl.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleProcess = () => {
    if (!url.trim()) return;
    
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setError(null);
    } else {
      setVideoId(null);
      setError("Invalid YouTube URL. Please make sure it's a valid link to a video.");
    }
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
          <Video color="#ef4444" /> YouTube Thumbnail Downloader
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Extract and download the high-resolution thumbnail from any YouTube video instantly.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            className="input-field" 
            style={{ flexGrow: 1 }}
            placeholder="Paste YouTube URL here (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleProcess()}
          />
          <button className="btn btn-primary" onClick={handleProcess} disabled={!url.trim()}>
            Get Thumbnails
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TriangleAlert size={18} /> {error}
          </div>
        )}

        {videoId && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Maximum Resolution (1080p)</h3>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-strong)', textAlign: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                alt="High Resolution YouTube Thumbnail" 
                style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '1rem' }}
                onError={(e) => {
                  // Fallback to hqdefault if maxres isn't available
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <a 
                href={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline"
                style={{ display: 'inline-flex' }}
              >
                <Download size={18} /> View & Right-Click to Save Image
              </a>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
              <em>Note: If the creator did not upload a 1080p custom thumbnail, YouTube automatically falls back to a lower-resolution preview.</em>
            </p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>Why download a YouTube thumbnail?</h2>
        <p>If you're a content creator, a social media manager, or a digital marketer, you already know that the thumbnail is the single most important part of a YouTube video. It's the digital book cover that decides whether someone clicks or keeps scrolling. But YouTube doesn't exactly make it easy to save or analyze those images once a video goes live.</p>
        <p>There are plenty of completely legitimate reasons you might need to extract a thumbnail from a video:</p>
        <ul>
          <li><strong>Creating a blog post:</strong> If you are embedding your own video into a WordPress blog post, you often need the high-resolution thumbnail image to set as the "Featured Image" for the article.</li>
          <li><strong>Design inspiration:</strong> If you see a competitor who is getting massive amounts of views, downloading their thumbnail allows you to drop it into Photoshop or Canva so you can study their color grading, font choices, and layout.</li>
          <li><strong>Archiving your old work:</strong> If you lost the original Photoshop files for a video you uploaded five years ago, this is the fastest way to get your artwork back.</li>
        </ul>

        <h2>How this tool actually works</h2>
        <p>It's actually a pretty fun trick! When you upload a video, YouTube's servers automatically take your thumbnail and host it on a completely separate, public image server. They even generate multiple different sizes of it (for mobile, desktop, and TV).</p>
        <p>When you paste a link into this tool, it uses a regular expression (a piece of code that detects patterns) to scan the URL and chop out the unique 11-character Video ID (like <code>dQw4w9WgXcQ</code>). Then, it takes that ID and plugs it into YouTube's hidden public image URL format, forcing it to fetch the <code>maxresdefault.jpg</code> file. It happens instantly, without needing to contact any third-party servers!</p>

        <h2>Is this legal?</h2>
        <p>Using this tool to extract and view the image is perfectly fine. However, what you do with the image afterward matters. The thumbnails generated by this tool are still the copyrighted intellectual property of the original YouTube creator. You should absolutely never download a creator's thumbnail and re-upload it as your own to try and steal clicks. This tool is meant for archiving your own content, analyzing design trends, or grabbing featured images for articles where you are embedding the creator's video (which gives them the views anyway!).</p>
      </div>
    </div>
  );
}
