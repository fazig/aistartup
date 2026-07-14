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
            Stop paying exorbitant monthly fees for simple image sharpening. Bookmark this page and use our free image enhancer whenever you need to breathe new life into your photographs!
          </p>
        </div>
      </section>
    </>
  );
}
