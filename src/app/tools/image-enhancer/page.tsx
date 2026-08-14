import type { Metadata } from 'next';
import ClientEnhancer from './ClientEnhancer';

export const metadata: Metadata = {
  title: "Free AI Image Enhancer | Upscale to HD like Remini",
  description: "Enhance and upscale your images to Full HD quality instantly for free. A lightning-fast, 100% free Remini alternative that runs in your browser without losing quality.",
  keywords: ["free AI image enhancer", "Remini alternative free", "upscale image to HD", "enhance photo quality", "online image enhancer", "free photo upscaler", "improve image resolution free"],
};

export default function ImageEnhancerPage() {
  return (
    <>
      <div className="container" style={{ padding: '3rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Free AI Image Enhancer</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Upscale and enhance your photos to Full HD quality instantly. A completely free, lightning-fast alternative to Remini that runs directly in your browser.
          </p>
        </div>
        <ClientEnhancer />
      </div>
      
      {/* SEO Content Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)', padding: '4rem 0', marginTop: '4rem' }}>
        <div className="container prose" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
          <h2 style={{ color: 'var(--text-main)' }}>The Best Free Alternative to Remini</h2>
          <p>
            Looking for a <strong>free AI image enhancer</strong> that actually works? You've found it. Our tool is designed to be a lightning-fast, absolutely free alternative to popular premium apps like Remini. Whether you need to restore an old family photo, upscale a low-resolution graphic, or simply sharpen a blurry image, our browser-based enhancement engine gets the job done instantly.
          </p>
          <h3 style={{ color: 'var(--text-main)' }}>How Does Our Image Upscaler Work?</h3>
          <p>
            Unlike cloud-based tools that make you wait in line and limit your daily usage, our tool utilizes your device's raw processing power through advanced HTML5 Canvas rendering. By applying sophisticated bicubic interpolation alongside contrast and unsharp mask algorithms, we can simulate the effects of heavy AI models directly in your browser.
          </p>
          <ul>
            <li><strong>100% Free Forever:</strong> No subscription fees, no watermarks, no daily limits.</li>
            <li><strong>Absolute Privacy:</strong> Your images never leave your device. The enhancement happens locally, meaning total data security.</li>
            <li><strong>Lightning Fast:</strong> No waiting for crowded server queues. Enhance images in milliseconds.</li>
            <li><strong>Full HD Upscaling:</strong> Double the resolution of your images while intelligently preserving edge details and enhancing micro-contrast.</li>
          </ul>
          <p>
            Stop paying monthly fees for simple image sharpening. Bookmark this page and use the enhancer whenever you need to restore a photo or enlarge a graphic for the web.
          </p>
          <h3 style={{ color: 'var(--text-main)' }}>How to enhance a photo</h3>
          <ol>
            <li>Upload a JPG, PNG, or WebP file. Keep the original nearby so you can compare.</li>
            <li>Run enhance. The browser upscales locally — nothing is uploaded to our servers.</li>
            <li>Download the result. If edges look too sharp, re-run with a milder setting or start from a less compressed original.</li>
          </ol>
          <h3 style={{ color: 'var(--text-main)' }}>When this tool is a good fit</h3>
          <p>
            It works best on slightly soft phone photos, screenshots, and product shots that need more pixels for a listing. It will not recover faces that are already a handful of pixels, and it is not a replacement for a trained super-resolution model like Remini on severely damaged scans. Use it as a fast, private first pass.
          </p>
          <h3 style={{ color: 'var(--text-main)' }}>FAQ</h3>
          <p><strong>Are my images stored?</strong> No. Processing happens in the browser.</p>
          <p><strong>Is there a daily limit?</strong> No. There is no account and no quota.</p>
          <p><strong>Can I use the output commercially?</strong> The tool does not claim rights to your files. You keep whatever rights you already had in the original photo.</p>
        </div>
      </section>
    </>
  );
}
