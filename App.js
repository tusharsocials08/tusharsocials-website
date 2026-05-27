import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';

const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C96A';
const CREAM = '#F5F0E8';
const BLACK = '#0A0A0A';
const DARK = '#111111';
const CHARCOAL = '#1A1A1A';

const DEFAULT_CONFIG = {
  heroEyebrow: 'Digital Growth Partner · Raipur',
  heroHeadline: 'We Make\nBrands\nUnforgettable.',
  heroSub: 'Social media management, content creation, and strategic digital growth\nfor businesses ready to stand out.',
  aboutStory: 'A creative and strategy-driven digital growth partner, helping brands\nand creators build stronger digital presence through content, social media\nexecution, and growth-focused strategy.',
  aboutVisionHead: 'Building Raipur\'s Leading\nCreative Growth Agency',
  aboutVisionSub: 'The vision is ambitious and clear — to evolve from a social media management\noperation into a full-service digital growth agency, offering Meta Advertising,\nPerformance Marketing, Brand Strategy, Website Design, Influencer Marketing,\nand end-to-end digital growth solutions for businesses at both local and national scale.',
  phone: '+91 8349644588',
  email: 'hello@tusharsocials.com',
  instaLink: 'https://www.instagram.com/tushar.socials?igsh=MWpldXB3djVqYnZ6cA==',
  instaHandle: '@tushar.socials',
  contactHead: 'Ready to\nGrow?',
  contactSub: 'Whether you\'re a café, salon, or personal brand, let\'s talk about how we can elevate your digital presence.',
  ctaHead: 'Ready to Make Your\nBrand Unforgettable?',
  ctaSub: 'Let\'s create something together.',
  stats: [
    { num: '2025', label: 'Founded' },
    { num: '10+', label: 'Brands Served' },
    { num: '5+', label: 'Industries' },
    { num: '100%', label: 'Strategy-Led' }
  ],
  services: [
    { title: 'Social Media Management', icon: '◈', desc: 'Complete management of your Instagram and social channels — strategy, content planning, posting, and engagement.', includes: ['Instagram Page Handling', 'Content Calendar', 'Engagement Management', 'Monthly Reporting'] },
    { title: 'Content Creation', icon: '◉', desc: 'Professional content crafted to capture attention, communicate your brand, and drive results.', includes: ['Photo Content', 'Reels & Short-Form Video', 'Mobile Content Creation', 'Story Content'] },
    { title: 'Creative Strategy', icon: '◇', desc: 'Strategy-first approach — every piece of content has a purpose, aligned with your business goals.', includes: ['Brand Audit', 'Content Strategy', 'Competitor Analysis', 'Growth Roadmap'] },
    { title: 'Brand Identity', icon: '◎', desc: 'Visual identity and creative design that makes your brand instantly recognizable across platforms.', includes: ['Creative Design', 'Visual Identity', 'Content Templates', 'Brand Guidelines'] },
    { title: 'Wedding Content', icon: '◆', desc: 'Fast-paced, emotionally engaging content creation for weddings and events, designed for modern digital storytelling.', includes: ['Pre-wedding Shoots', 'Wedding Day Coverage', 'Reels Production', 'Highlight Videos'] },
    { title: 'Freelance Creative', icon: '◐', desc: 'Flexible creative support for one-off projects — shoots, video edits, design work, and more.', includes: ['Project-Based Work', 'Content Shoots', 'Video Editing', 'Custom Deliverables'] }
  ],
  timeline: [
    { year: 'Feb 2025', event: 'Founded', desc: 'Tushar Socials was born from a genuine passion for visual storytelling and digital creativity.' },
    { year: 'Mar 2025', event: 'First Client', desc: 'First professional project with Daily Dose Café — turning passion into professional execution.' },
    { year: 'Mid 2025', event: 'Expanding', desc: 'Grew to serve cafés, salons, restaurants, local brands, and content creators across Raipur.' },
    { year: 'Now', event: 'Growing', desc: 'Active client collaborations including long-term work with creator Sheena Jain.' }
  ]
};

const styles = {
  global: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      background: ${BLACK};
      color: #E8E4DC;
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${BLACK}; }
    ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 2px; }
    ::selection { background: ${GOLD}; color: ${BLACK}; }
    input, textarea { font-family: 'DM Sans', sans-serif; }
    a { color: inherit; text-decoration: none; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .fade-up { animation: fadeUp 0.8s ease forwards; }
    .fade-in { animation: fadeIn 1s ease forwards; }

    /* Responsive Utilities */
    .section-padding { padding: 120px 80px; }
    .hero-padding { padding: 0 80px; margin-top: 100px; }
    .about-padding { padding: 80px; }
    .contact-padding { padding: 80px; }
    
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
    .grid-works { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }
    .flex-row { display: flex; flex-direction: row; }
    
    .text-huge { font-size: clamp(56px, 8vw, 110px); }
    .text-h1 { font-size: clamp(48px, 6vw, 80px); }
    .text-h2 { font-size: clamp(40px, 5vw, 64px); }
    
    .desktop-only { display: block; }
    .mobile-only { display: none; }
    
    .nav-links { display: flex; gap: 36px; align-items: center; }
    
    /* Mobile overlay menu */
    .mobile-menu-overlay {
      position: fixed; inset: 0; background: rgba(10,10,10,0.98);
      z-index: 99; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 32px;
      opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
    }
    .mobile-menu-overlay.open { opacity: 1; pointer-events: auto; }

    @media (max-width: 1024px) {
      .section-padding { padding: 80px 40px; }
      .hero-padding { padding: 0 40px; margin-top: 120px; }
      .about-padding { padding: 60px 40px; }
      .contact-padding { padding: 60px 40px; }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .section-padding { padding: 60px 24px; }
      .hero-padding { padding: 0 24px; margin-top: 100px; }
      .about-padding { padding: 40px 24px; }
      .contact-padding { padding: 40px 24px; }
      
      .grid-3 { grid-template-columns: 1fr; }
      .grid-2 { grid-template-columns: 1fr; }
      .grid-works { grid-template-columns: 1fr; }
      .flex-row { flex-direction: column; }
      
      .desktop-only { display: none !important; }
      .mobile-only { display: block; }
      
      .nav-links { display: none; }
      
      /* specific layout tweaks for mobile */
      .hero-stats { flex-direction: column; gap: 24px !important; margin-top: 40px !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .about-vision-grid { grid-template-columns: 1fr !important; }
      .timeline-flex { flex-direction: column; gap: 16px !important; }
      .timeline-year { width: auto !important; text-align: left !important; }
      .timeline-dot { display: none; }
      .timeline-line { display: none; }
      
      .admin-grid { grid-template-columns: 1fr !important; }
      .admin-panel-container { padding: 24px !important; }
    }
  `
};

/* ── NAV ── */
function Nav({ setPage, currentPage, config }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Services', 'Work', 'Contact'];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : 'none',
    transition: 'all 0.4s ease',
  };

  const logoStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    zIndex: 101, // Keep above overlay
  };

  return (
    <>
      <nav style={navStyle} className={scrolled ? "section-padding" : "section-padding"} style={{ padding: scrolled ? '16px 48px' : '24px 48px', ...(scrolled ? navStyle : navStyle) }}>
        <div style={logoStyle} onClick={() => { setPage('home'); setMenuOpen(false); }}>
          {config?.logoUrl ? (
            <img src={config.logoUrl} alt="Tushar Socials Logo" style={{ height: '40px', objectFit: 'contain' }} />
          ) : (
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: GOLD }}>Tushar Socials</div>
          )}
        </div>

        {/* Desktop links */}
        <div className="nav-links desktop-only">
          {links.map(l => (
            <button
              key={l}
              onClick={() => setPage(l.toLowerCase())}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: currentPage === l.toLowerCase() ? GOLD : 'rgba(232,228,220,0.7)',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                transition: 'color 0.3s',
                borderBottom: currentPage === l.toLowerCase() ? `1px solid ${GOLD}` : '1px solid transparent',
                paddingBottom: '2px',
              }}
            >{l}</button>
          ))}
          <button
            onClick={() => setPage('admin')}
            style={{
              background: 'transparent', border: `1px solid ${GOLD}`,
              color: GOLD, padding: '8px 20px', borderRadius: '2px',
              fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = BLACK; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = GOLD; }}
          >
            Admin
          </button>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: GOLD, fontSize: '24px', cursor: 'pointer', zIndex: 101 }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <button
            key={l}
            onClick={() => { setPage(l.toLowerCase()); setMenuOpen(false); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '24px', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: currentPage === l.toLowerCase() ? GOLD : CREAM,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >{l}</button>
        ))}
        <button
          onClick={() => { setPage('admin'); setMenuOpen(false); }}
          style={{
            background: 'transparent', border: `1px solid ${GOLD}`,
            color: GOLD, padding: '12px 32px', borderRadius: '2px',
            fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', marginTop: '24px'
          }}
        >
          Admin
        </button>
      </div>
    </>
  );
}

/* ── HERO ── */
function Hero({ setPage, config }) {
  const formatHeadline = (text) => {
    const lines = text.split('\n');
    if (lines.length < 3) return text;
    return (
      <>
        {lines[0]}<br />
        <span style={{
          fontStyle: 'italic', color: GOLD,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}>
          {lines[1]}
        </span><br />
        {lines[2]}
      </>
    );
  };
  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${BLACK} 0%, #0f0f0f 50%, #080808 100%)`,
    }}>
      {/* Geometric background elements */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%',
        width: '500px', height: '500px',
        border: `1px solid rgba(201,168,76,0.08)`,
        borderRadius: '50%',
        animation: 'pulse 6s ease infinite',
      }} />
      <div style={{
        position: 'absolute', top: '15%', right: '8%',
        width: '380px', height: '380px',
        border: `1px solid rgba(201,168,76,0.12)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: '400px', height: '400px',
        border: `1px solid rgba(201,168,76,0.06)`,
        borderRadius: '50%',
      }} />

      {/* Vertical gold line accent */}
      <div style={{
        position: 'absolute', left: '48px', top: '15%', bottom: '15%',
        width: '1px',
        background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
        opacity: 0.4,
      }} />

      <div className="hero-padding" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: GOLD, marginBottom: '32px',
          display: 'flex', alignItems: 'center', gap: '16px',
          animation: 'fadeUp 0.8s ease forwards',
        }}>
          <span style={{ width: '40px', height: '1px', background: GOLD, display: 'inline-block' }} />
          {config.heroEyebrow}
        </div>

        {/* Headline */}
        <h1 className="text-huge" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          color: CREAM,
          marginBottom: '40px',
          animation: 'fadeUp 0.8s 0.2s ease both',
        }}>
          {formatHeadline(config.heroHeadline)}
        </h1>

        <p style={{
          fontSize: '16px', fontWeight: 300,
          color: 'rgba(232,228,220,0.65)',
          maxWidth: '480px', lineHeight: 1.8,
          marginBottom: '52px',
          animation: 'fadeUp 0.8s 0.4s ease both',
          whiteSpace: 'pre-line'
        }}>
          {config.heroSub}
        </p>

        <div style={{
          display: 'flex', gap: '20px', flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.6s ease both',
        }}>
          <button
            onClick={() => setPage('work')}
            style={{
              background: GOLD, color: BLACK, border: 'none',
              padding: '16px 40px', fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              cursor: 'pointer', borderRadius: '2px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.background = GOLD_LIGHT}
            onMouseLeave={e => e.target.style.background = GOLD}
          >
            View Our Work
          </button>
          <button
            onClick={() => setPage('contact')}
            style={{
              background: 'transparent', color: CREAM,
              border: `1px solid rgba(232,228,220,0.3)`,
              padding: '16px 40px', fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              cursor: 'pointer', borderRadius: '2px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(232,228,220,0.3)'; e.target.style.color = CREAM; }}
          >
            Get In Touch
          </button>
        </div>

        {/* Owner image on mobile */}
        {config?.ownerUrl && (
          <div className="mobile-only" style={{
            marginTop: '48px', width: '100%', height: '300px', overflow: 'hidden',
            borderRadius: '4px', border: `1px solid rgba(201,168,76,0.15)`,
            animation: 'fadeIn 1.2s 0.3s ease both',
          }}>
            <img
              src={config.ownerUrl}
              alt="Tushar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>
        )}

        {/* Stats row */}
        <div className="hero-stats" style={{
          display: 'flex', gap: '52px', marginTop: '60px',
          borderTop: `1px solid rgba(201,168,76,0.15)`,
          paddingTop: '36px',
          animation: 'fadeUp 0.8s 0.8s ease both',
        }}>
          {config.stats.map(s => (
            <div key={s.num}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '36px', fontWeight: 300, color: GOLD,
                lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(232,228,220,0.5)', marginTop: '6px',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Owner image on right */}
      {config?.ownerUrl && (
        <div className="desktop-only" style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '40%', overflow: 'hidden',
          animation: 'fadeIn 1.2s 0.3s ease both',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to right, ${BLACK} 0%, transparent 40%)`,
            zIndex: 1,
          }} />
          <img
            src={config.ownerUrl}
            alt="Tushar"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${BLACK} 0%, transparent 40%)`,
            zIndex: 1,
          }} />
        </div>
      )}
    </section>
  );
}

/* ── SERVICES PREVIEW ── */
function ServicesPreview({ setPage, config }) {
  return (
    <section className="section-padding" style={{ background: DARK }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '72px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '16px' }}>
              What We Do
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 300, color: CREAM, lineHeight: 1,
            }}>
              Services Built<br />
              <em style={{ color: GOLD }}>for Growth</em>
            </h2>
          </div>
          <button
            onClick={() => setPage('services')}
            style={{
              background: 'none', border: `1px solid rgba(201,168,76,0.4)`,
              color: GOLD, padding: '12px 28px', borderRadius: '2px',
              fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = BLACK; }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = GOLD; }}
          >
            All Services →
          </button>
        </div>

        <div className="grid-3" style={{ gap: '1px', background: 'rgba(201,168,76,0.1)' }}>
          {config.services.map((s, i) => (
            <div
              key={i}
              style={{
                background: DARK, padding: '44px 36px',
                borderBottom: i < 3 ? `1px solid rgba(201,168,76,0.1)` : 'none',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = CHARCOAL}
              onMouseLeave={e => e.currentTarget.style.background = DARK}
            >
              <div style={{
                fontSize: '28px', color: GOLD, marginBottom: '20px',
                fontFamily: 'monospace',
              }}>{s.icon}</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px', fontWeight: 400, color: CREAM,
                marginBottom: '12px', lineHeight: 1.2,
              }}>{s.title}</h3>
              <p style={{
                fontSize: '14px', color: 'rgba(232,228,220,0.55)',
                lineHeight: 1.7, fontWeight: 300,
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WORK GRID ── */
function WorkSection({ works }) {
  const hasWorks = works && works.length > 0;

  return (
    <section className="section-padding" style={{ background: BLACK }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '16px' }}>
            Portfolio
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 300, color: CREAM, lineHeight: 1,
          }}>
            Our <em style={{ color: GOLD }}>Work</em>
          </h2>
        </div>

        {!hasWorks ? (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            border: `1px solid rgba(201,168,76,0.15)`,
            borderRadius: '4px',
          }}>
            <div style={{
              fontSize: '48px', marginBottom: '20px',
              fontFamily: "'Cormorant Garamond', serif",
              color: 'rgba(201,168,76,0.3)',
            }}>◎</div>
            <p style={{ color: 'rgba(232,228,220,0.4)', fontSize: '14px', letterSpacing: '0.08em' }}>
              Work portfolio coming soon — check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid-works" style={{ gap: '24px' }}>
            {works.map((w, i) => (
              <WorkCard key={i} work={w} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkCard({ work }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '4px', cursor: 'pointer',
        border: `1px solid rgba(201,168,76,0.1)`,
        transition: 'border-color 0.3s',
        borderColor: hovered ? GOLD : 'rgba(201,168,76,0.1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Media */}
      <div style={{ aspectRatio: '4/3', background: CHARCOAL, position: 'relative', overflow: 'hidden' }}>
        {work.type === 'video' ? (
          <video
            src={work.url}
            poster={work.thumbnailUrl}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            controls={hovered}
            muted
            loop
            autoPlay={hovered}
          />
        ) : work.url ? (
          <img src={work.url} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '48px', color: 'rgba(201,168,76,0.2)',
            fontFamily: "'Cormorant Garamond', serif",
          }}>
            {work.type === 'video' ? '▶' : '◎'}
          </div>
        )}

        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(8px)',
          padding: '4px 12px', borderRadius: '2px',
          fontSize: '10px', letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase',
          border: `1px solid rgba(201,168,76,0.2)`,
        }}>
          {work.category || 'Content'}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px 24px', background: CHARCOAL }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px', fontWeight: 400, color: CREAM,
          marginBottom: '6px',
        }}>{work.title}</h3>
        {work.client && (
          <p style={{ fontSize: '12px', color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {work.client}
          </p>
        )}
        {(work.shootType || work.location || work.instaId) && (
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {work.shootType && <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.7)' }}>Type: <span style={{ color: CREAM }}>{work.shootType}</span></p>}
            {work.location && <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.7)' }}>Location: <span style={{ color: CREAM }}>{work.location}</span></p>}
            {work.instaId && <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.7)' }}>IG: <span style={{ color: GOLD }}>{work.instaId}</span></p>}
          </div>
        )}
        {work.description && (
          <p style={{ fontSize: '13px', color: 'rgba(232,228,220,0.5)', marginTop: '8px', lineHeight: 1.6 }}>
            {work.description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── ABOUT PAGE ── */
function AboutPage({ config }) {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: BLACK }}>
      {/* Hero */}
      <section className="about-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50%', height: '100%',
        }}>
          {config?.ownerUrl && (
            <img
              src={config.ownerUrl}
              alt="Tushar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to right, ${BLACK} 10%, transparent 60%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${BLACK} 0%, transparent 50%)`,
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '24px' }}>
            The Story
          </div>
          <h1 className="text-h1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, color: CREAM, lineHeight: 0.95,
            marginBottom: '32px',
          }}>
            About<br />
            <em style={{ color: GOLD }}>Tushar Socials</em>
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(232,228,220,0.65)', lineHeight: 1.8, maxWidth: '500px', whiteSpace: 'pre-line' }}>
            {config.aboutStory}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-padding" style={{ background: DARK }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '48px' }}>
            Our Journey
          </div>
          <div style={{ position: 'relative' }}>
            <div className="timeline-line" style={{
              position: 'absolute', left: '80px', top: 0, bottom: 0,
              width: '1px', background: `linear-gradient(to bottom, ${GOLD}, rgba(201,168,76,0.1))`,
            }} />
            {config.timeline.map((t, i) => (
              <div key={i} className="timeline-flex" style={{ display: 'flex', gap: '40px', marginBottom: '52px', position: 'relative' }}>
                <div className="timeline-year" style={{ width: '80px', flexShrink: 0, textAlign: 'right' }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '18px', color: GOLD, fontWeight: 300,
                  }}>{t.year}</div>
                </div>
                <div className="timeline-dot" style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: GOLD, flexShrink: 0, marginTop: '6px',
                  boxShadow: `0 0 12px rgba(201,168,76,0.4)`,
                }} />
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px', color: CREAM, marginBottom: '8px',
                  }}>{t.event}</div>
                  <p style={{ fontSize: '14px', color: 'rgba(232,228,220,0.55)', lineHeight: 1.7 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-padding" style={{ background: BLACK }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '32px' }}>
            Future Vision
          </div>
          <h2 className="text-h1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, color: CREAM, lineHeight: 1.1,
            marginBottom: '32px',
            whiteSpace: 'pre-line'
          }}>
            {config.aboutVisionHead}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(232,228,220,0.6)', lineHeight: 1.9, maxWidth: '680px', whiteSpace: 'pre-line' }}>
            {config.aboutVisionSub}
          </p>

          <div className="grid-3 about-vision-grid" style={{
            marginTop: '52px',
            gap: '24px',
          }}>
            {['Cafés & Restaurants', 'Salons & Beauty', 'Interior Designers', 'Local Businesses', 'Fashion & Clothing', 'Influencers'].map(ind => (
              <div key={ind} style={{
                padding: '20px 24px',
                border: `1px solid rgba(201,168,76,0.15)`,
                borderRadius: '2px',
                fontSize: '13px', color: 'rgba(232,228,220,0.6)',
                letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ color: GOLD, fontSize: '8px' }}>◆</span>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── SERVICES PAGE ── */
function ServicesPage({ config }) {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: BLACK }}>
      <section className="about-padding">
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '24px' }}>
          What We Offer
        </div>
        <h1 className="text-h1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300, color: CREAM, lineHeight: 0.95, marginBottom: '24px',
        }}>
          Our <em style={{ color: GOLD }}>Services</em>
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(232,228,220,0.55)', maxWidth: '560px', lineHeight: 1.7 }}>
          Every service is built around strategy first. We don't execute randomly — every
          action has purpose, aligned with your business growth.
        </p>
      </section>

      <section className="about-padding" style={{ paddingTop: '40px' }}>
        <div className="grid-2" style={{ gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {config.services.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '44px 40px',
                border: `1px solid rgba(201,168,76,0.12)`,
                borderRadius: '4px',
                background: CHARCOAL,
                transition: 'border-color 0.3s, background 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.background = DARK;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)';
                e.currentTarget.style.background = CHARCOAL;
              }}
            >
              <div style={{ fontSize: '32px', color: GOLD, marginBottom: '20px', fontFamily: 'monospace' }}>{s.icon}</div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px', fontWeight: 400, color: CREAM, marginBottom: '14px',
              }}>{s.title}</h2>
              <p style={{ fontSize: '14px', color: 'rgba(232,228,220,0.55)', lineHeight: 1.7, marginBottom: '24px' }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.includes.map(inc => (
                  <span key={inc} style={{
                    fontSize: '11px', padding: '4px 12px',
                    border: `1px solid rgba(201,168,76,0.2)`,
                    borderRadius: '2px', color: GOLD,
                    letterSpacing: '0.06em',
                  }}>
                    {inc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── WORK PAGE ── */
function WorkPage({ works }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Social Media', 'Reels', 'Design', 'Wedding', 'Brand'];
  const filtered = filter === 'All' ? works : works.filter(w => w.category === filter);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: BLACK }}>
      <section className="about-padding">
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '24px' }}>
          Portfolio
        </div>
        <h1 className="text-h1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300, color: CREAM, lineHeight: 0.95, marginBottom: '40px',
        }}>
          Our <em style={{ color: GOLD }}>Work</em>
        </h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                background: filter === c ? GOLD : 'transparent',
                color: filter === c ? BLACK : 'rgba(232,228,220,0.6)',
                border: `1px solid ${filter === c ? GOLD : 'rgba(201,168,76,0.2)'}`,
                padding: '8px 20px', borderRadius: '2px',
                fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >{c}</button>
          ))}
        </div>
      </section>

      <section className="about-padding" style={{ paddingTop: '20px' }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '100px 40px',
            border: `1px solid rgba(201,168,76,0.12)`, borderRadius: '4px',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '64px', color: 'rgba(201,168,76,0.2)', marginBottom: '24px',
            }}>◎</div>
            <p style={{ color: 'rgba(232,228,220,0.4)', fontSize: '14px' }}>
              {works.length === 0
                ? 'No work added yet. Use the Admin panel to add your portfolio pieces.'
                : 'No items in this category yet.'}
            </p>
          </div>
        ) : (
          <div className="grid-works" style={{ gap: '20px' }}>
            {filtered.map((w, i) => (
              <div key={i} style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                <WorkCard work={w} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ── CONTACT PAGE ── */
function ContactPage({ config }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (!formData.name || !formData.message) return;
    setLoading(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          subject: `New Inquiry from ${formData.name}`,
          from_name: 'Tushar Socials Website'
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || 'Failed to send email. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again later.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: `1px solid rgba(201,168,76,0.2)`, borderRadius: '2px',
    color: CREAM, padding: '14px 18px',
    fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
    outline: 'none', transition: 'border-color 0.3s',
    marginBottom: '16px',
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: BLACK }}>
      <div className="grid-2 contact-grid" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Left — info */}
        <div className="contact-padding" style={{ background: DARK, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '24px' }}>
            Let's Talk
          </div>
          <h1 className="text-h1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, color: CREAM, lineHeight: 0.95,
            marginBottom: '32px',
            whiteSpace: 'pre-line'
          }}>
            {config.contactHead}
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(232,228,220,0.55)', lineHeight: 1.8, marginBottom: '52px', maxWidth: '400px', whiteSpace: 'pre-line' }}>
            {config.contactSub}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              {
                icon: '📱',
                label: 'Phone',
                value: config.phone,
                href: `tel:${config.phone.replace(/[^0-9+]/g, '')}`,
              },
              {
                icon: '✉',
                label: 'Email',
                value: config.email,
                href: `mailto:${config.email}`,
              },
              {
                icon: '◎',
                label: 'Instagram',
                value: config.instaHandle,
                href: config.instaLink,
              },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === 'Instagram' ? '_blank' : '_self'}
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '20px',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: '48px', height: '48px', flexShrink: 0,
                  border: `1px solid rgba(201,168,76,0.2)`,
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px', color: GOLD,
                  transition: 'all 0.3s',
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '15px', color: CREAM, transition: 'color 0.3s' }}>
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {submitted ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '80px', color: GOLD, marginBottom: '24px',
              }}>✦</div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '36px', color: CREAM, fontWeight: 300, marginBottom: '16px',
              }}>Thank You!</h2>
              <p style={{ color: 'rgba(232,228,220,0.55)', fontSize: '15px' }}>
                Your message is on its way. Tushar will be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '32px', color: CREAM, fontWeight: 300, marginBottom: '32px',
              }}>Send a Message</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <input
                  style={inputStyle}
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = GOLD}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
                <input
                  style={inputStyle}
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = GOLD}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
              </div>

              <input
                style={inputStyle}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                onFocus={e => e.target.style.borderColor = GOLD}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
              />

              <select
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={formData.service}
                onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                onFocus={e => e.target.style.borderColor = GOLD}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
              >
                <option value="" style={{ background: DARK }}>Service Interested In</option>
                {['Social Media Management', 'Content Creation', 'Brand Strategy', 'Wedding Content', 'Freelance Creative', 'Other'].map(s => (
                  <option key={s} value={s} style={{ background: DARK }}>{s}</option>
                ))}
              </select>

              <textarea
                style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                placeholder="Tell me about your project *"
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                onFocus={e => e.target.style.borderColor = GOLD}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
              />

              {errorMsg && <p style={{ color: '#e24b4a', fontSize: '13px', marginBottom: '16px' }}>{errorMsg}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  background: loading ? 'rgba(201,168,76,0.5)' : GOLD, color: BLACK, border: 'none',
                  padding: '18px 40px', fontSize: '12px',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer', borderRadius: '2px',
                  transition: 'background 0.3s', width: '100%',
                }}
                onMouseEnter={e => !loading && (e.target.style.background = GOLD_LIGHT)}
                onMouseLeave={e => !loading && (e.target.style.background = GOLD)}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── ADMIN PANEL ── */
function AdminPanel({ works, setWorks, config, setConfig }) {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('works');
  const [editConfig, setEditConfig] = useState(config || DEFAULT_CONFIG);
  const [newWork, setNewWork] = useState({
    title: '', client: '', category: 'Social Media',
    type: 'image', url: '', description: '',
    shootType: '', location: '', instaId: '', thumbnailUrl: '',
  });
  const [msg, setMsg] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAuthed(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const saveSettings = async () => {
    setMsg('Saving...');
    const { error } = await setConfig(editConfig);
    if (error) {
      setMsg(`Error saving: ${error.message}`);
    } else {
      setMsg('✓ Settings saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Security Fix: Restrict file types
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      setMsg('Security Error: Invalid file type.');
      return;
    }

    setMsg('Uploading...');
    const type = file.type.startsWith('video') ? 'video' : 'image';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage.from('media').upload(fileName, file);
    if (error) {
      console.error("Supabase Upload Error:", error);
      setMsg(`Upload failed: ${error.message} (Check console/adblocker/bucket existence)`);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
    setNewWork(p => ({ ...p, url: publicUrl, type }));
    setMsg('File uploaded successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setMsg('Security Error: Invalid file type for thumbnail.');
      return;
    }

    setMsg('Uploading thumbnail...');
    const fileExt = file.name.split('.').pop();
    const fileName = `thumb_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage.from('media').upload(fileName, file);
    if (error) {
      console.error("Supabase Thumbnail Upload Error:", error);
      setMsg(`Upload failed: ${error.message} (Check console/adblocker/bucket existence)`);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
    setNewWork(p => ({ ...p, thumbnailUrl: publicUrl }));
    setMsg('Thumbnail uploaded successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleConfigImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setMsg('Security Error: Invalid file type.');
      return;
    }

    setMsg('Uploading image...');
    const fileExt = file.name.split('.').pop();
    const fileName = `config_${field}_${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from('media').upload(fileName, file);
    if (error) {
      console.error("Supabase Config Upload Error:", error);
      setMsg(`Upload failed: ${error.message} (Check console/adblocker/bucket existence)`);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
    setEditConfig(p => ({ ...p, [field]: publicUrl }));
    setMsg('Image uploaded! Click Save Settings to apply.');
  };

  const addWork = async () => {
    if (!newWork.title) { setMsg('Title is required'); return; }
    setMsg('Adding work...');
    const { id, shootType, instaId, thumbnailUrl, ...workData } = newWork;
    const insertData = { ...workData, shoottype: shootType, instaid: instaId, thumbnailurl: thumbnailUrl };

    const { data, error } = await supabase.from('works').insert([insertData]).select();

    if (error) {
      setMsg(`Error: ${error.message}`);
      return;
    }

    const savedWork = { ...data[0], shootType: data[0].shoottype, instaId: data[0].instaid, thumbnailUrl: data[0].thumbnailurl };
    setWorks([savedWork, ...works]);
    setNewWork({ title: '', client: '', category: 'Social Media', type: 'image', url: '', description: '', shootType: '', location: '', instaId: '', thumbnailUrl: '' });
    setMsg('✓ Work added successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const removeWork = async (id) => {
    await supabase.from('works').delete().eq('id', id);
    setWorks(works.filter(w => w.id !== id));
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: `1px solid rgba(201,168,76,0.2)`, borderRadius: '2px',
    color: CREAM, padding: '12px 16px',
    fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
    outline: 'none', marginBottom: '14px',
  };

  if (!authed) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BLACK,
      }}>
        <div className="admin-panel-container" style={{
          background: CHARCOAL, border: `1px solid rgba(201,168,76,0.2)`,
          borderRadius: '4px', padding: '60px 52px', maxWidth: '400px', width: '90%', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '48px', color: GOLD, marginBottom: '8px',
          }}>✦</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', color: CREAM, fontWeight: 300, marginBottom: '8px',
          }}>Admin Panel</h2>
          <p style={{ color: 'rgba(232,228,220,0.4)', fontSize: '13px', marginBottom: '32px' }}>
            Sign in with your secure account
          </p>
          <input
            type="email"
            style={{ ...inputStyle, marginBottom: '12px' }}
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            style={{ ...inputStyle, marginBottom: '24px' }}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {msg && <p style={{ color: '#e24b4a', fontSize: '13px', marginBottom: '16px' }}>{msg}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: loading ? 'rgba(201,168,76,0.5)' : GOLD, color: BLACK, border: 'none',
              padding: '14px', width: '100%', fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer', borderRadius: '2px',
            }}
          >{loading ? 'Signing in...' : 'Sign In'}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: BLACK }}>
      {/* Header */}
      <div className="admin-panel-container" style={{ background: DARK, borderBottom: `1px solid rgba(201,168,76,0.15)`, padding: '24px 60px' }}>
        <div className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: '4px' }}>
              Admin Dashboard
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: CREAM, fontWeight: 300 }}>
              Tushar Socials
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['works', 'general', 'texts', 'lists'].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  background: activeTab === t ? GOLD : 'transparent',
                  color: activeTab === t ? BLACK : 'rgba(232,228,220,0.6)',
                  border: `1px solid ${activeTab === t ? GOLD : 'rgba(201,168,76,0.2)'}`,
                  padding: '8px 20px', borderRadius: '2px',
                  fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
                }}
              >{t === 'works' ? 'Portfolio' : t === 'general' ? 'General' : t === 'texts' ? 'Extra Texts' : 'Advanced Lists'}</button>
            ))}
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#e24b4a',
                border: `1px solid rgba(226,75,74,0.3)`,
                padding: '8px 20px', borderRadius: '2px',
                fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', marginLeft: '12px',
              }}
            >Logout</button>
          </div>
        </div>
      </div>

      {activeTab === 'general' && (
        <div className="admin-panel-container" style={{ padding: '60px', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 160px)', width: '100%' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: CREAM, marginBottom: '40px' }}>General Settings</h2>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: GOLD, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Branding & Images</h3>
            <div className="flex-row" style={{ gap: '24px', marginBottom: '16px' }}>
              <div style={{ flex: 1, padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(201,168,76,0.3)', textAlign: 'center', borderRadius: '4px' }}>
                <p style={{ color: CREAM, fontSize: '13px', marginBottom: '12px' }}>Website Logo</p>
                {editConfig.logoUrl && <img src={editConfig.logoUrl} alt="Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '16px' }} />}
                <input type="file" accept="image/*" onChange={(e) => handleConfigImageUpload(e, 'logoUrl')} style={{ fontSize: '11px', color: 'rgba(232,228,220,0.6)' }} />
              </div>
              <div style={{ flex: 1, padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(201,168,76,0.3)', textAlign: 'center', borderRadius: '4px' }}>
                <p style={{ color: CREAM, fontSize: '13px', marginBottom: '12px' }}>Owner Photo (About Page)</p>
                {editConfig.ownerUrl && <img src={editConfig.ownerUrl} alt="Owner" style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '50%', marginBottom: '16px' }} />}
                <input type="file" accept="image/*" onChange={(e) => handleConfigImageUpload(e, 'ownerUrl')} style={{ fontSize: '11px', color: 'rgba(232,228,220,0.6)' }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: GOLD, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Hero Section</h3>
            <input style={inputStyle} placeholder="Eyebrow text" value={editConfig.heroEyebrow} onChange={e => setEditConfig({ ...editConfig, heroEyebrow: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '80px' }} placeholder="Headline (use line breaks)" value={editConfig.heroHeadline} onChange={e => setEditConfig({ ...editConfig, heroHeadline: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '60px' }} placeholder="Subheadline" value={editConfig.heroSub} onChange={e => setEditConfig({ ...editConfig, heroSub: e.target.value })} />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: GOLD, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>About Section</h3>
            <textarea style={{ ...inputStyle, minHeight: '120px' }} placeholder="Our Story Text" value={editConfig.aboutStory} onChange={e => setEditConfig({ ...editConfig, aboutStory: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '60px' }} placeholder="Vision Headline" value={editConfig.aboutVisionHead} onChange={e => setEditConfig({ ...editConfig, aboutVisionHead: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '120px' }} placeholder="Vision Details" value={editConfig.aboutVisionSub} onChange={e => setEditConfig({ ...editConfig, aboutVisionSub: e.target.value })} />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: GOLD, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Contact & Links</h3>
            <input style={inputStyle} placeholder="Phone Number" value={editConfig.phone} onChange={e => setEditConfig({ ...editConfig, phone: e.target.value })} />
            <input style={inputStyle} placeholder="Email Address" value={editConfig.email} onChange={e => setEditConfig({ ...editConfig, email: e.target.value })} />
            <input style={inputStyle} placeholder="Instagram Handle (e.g. @username)" value={editConfig.instaHandle} onChange={e => setEditConfig({ ...editConfig, instaHandle: e.target.value })} />
            <input style={inputStyle} placeholder="Instagram URL" value={editConfig.instaLink} onChange={e => setEditConfig({ ...editConfig, instaLink: e.target.value })} />
          </div>

          {msg && <div style={{ padding: '12px 16px', borderRadius: '2px', marginBottom: '14px', background: msg.startsWith('✓') ? 'rgba(99,153,34,0.15)' : 'rgba(226,75,74,0.15)', border: `1px solid ${msg.startsWith('✓') ? 'rgba(99,153,34,0.3)' : 'rgba(226,75,74,0.3)'}`, color: msg.startsWith('✓') ? '#97c459' : '#f09595', fontSize: '13px' }}>{msg}</div>}
          <button onClick={saveSettings} style={{ background: GOLD, color: BLACK, border: 'none', padding: '16px 40px', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderRadius: '2px' }}>Save Settings →</button>
        </div>
      )}

      {activeTab === 'texts' && (
        <div className="admin-panel-container" style={{ padding: '60px', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 160px)', width: '100%' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: CREAM, marginBottom: '40px' }}>Extra Texts</h2>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: GOLD, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Call to Action (Home Page)</h3>
            <textarea style={{ ...inputStyle, minHeight: '80px' }} placeholder="Headline" value={editConfig.ctaHead} onChange={e => setEditConfig({ ...editConfig, ctaHead: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '60px' }} placeholder="Subheadline" value={editConfig.ctaSub} onChange={e => setEditConfig({ ...editConfig, ctaSub: e.target.value })} />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: GOLD, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Contact Page Headers</h3>
            <textarea style={{ ...inputStyle, minHeight: '80px' }} placeholder="Headline" value={editConfig.contactHead} onChange={e => setEditConfig({ ...editConfig, contactHead: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '60px' }} placeholder="Subheadline" value={editConfig.contactSub} onChange={e => setEditConfig({ ...editConfig, contactSub: e.target.value })} />
          </div>

          {msg && <div style={{ padding: '12px 16px', borderRadius: '2px', marginBottom: '14px', background: msg.startsWith('✓') ? 'rgba(99,153,34,0.15)' : 'rgba(226,75,74,0.15)', border: `1px solid ${msg.startsWith('✓') ? 'rgba(99,153,34,0.3)' : 'rgba(226,75,74,0.3)'}`, color: msg.startsWith('✓') ? '#97c459' : '#f09595', fontSize: '13px' }}>{msg}</div>}
          <button onClick={saveSettings} style={{ background: GOLD, color: BLACK, border: 'none', padding: '16px 40px', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderRadius: '2px' }}>Save Settings →</button>
        </div>
      )}

      {activeTab === 'lists' && (
        <div className="admin-panel-container" style={{ padding: '60px', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 160px)', width: '100%' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: CREAM, marginBottom: '20px' }}>Manage Lists (Advanced)</h2>
          <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>Edit the JSON data below to directly manage your Services, Timeline milestones, and Hero Stats. Click "Save List Changes" when you're done.</p>

          <textarea
            style={{ ...inputStyle, minHeight: '500px', fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'pre' }}
            defaultValue={JSON.stringify({ services: editConfig.services, timeline: editConfig.timeline, stats: editConfig.stats }, null, 2)}
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);
                setEditConfig({ ...editConfig, ...parsed });
              } catch {
                // Ignore parse errors while typing
              }
            }}
          />

          {msg && <div style={{ padding: '12px 16px', borderRadius: '2px', marginBottom: '14px', background: msg.startsWith('✓') ? 'rgba(99,153,34,0.15)' : 'rgba(226,75,74,0.15)', border: `1px solid ${msg.startsWith('✓') ? 'rgba(99,153,34,0.3)' : 'rgba(226,75,74,0.3)'}`, color: msg.startsWith('✓') ? '#97c459' : '#f09595', fontSize: '13px' }}>{msg}</div>}
          <button onClick={saveSettings} style={{ background: GOLD, color: BLACK, border: 'none', padding: '16px 40px', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderRadius: '2px' }}>Save List Changes →</button>
        </div>
      )}

      {activeTab === 'works' && (
        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', minHeight: 'calc(100vh - 160px)' }}>
          {/* Add form */}
          <div className="admin-panel-container" style={{ padding: '40px', background: DARK, borderRight: `1px solid rgba(201,168,76,0.1)` }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '24px', color: CREAM, fontWeight: 300, marginBottom: '28px',
            }}>Add New Work</h2>

            <input
              style={inputStyle}
              placeholder="Project Title *"
              value={newWork.title}
              onChange={e => setNewWork(p => ({ ...p, title: e.target.value }))}
            />
            <input
              style={inputStyle}
              placeholder="Client Name"
              value={newWork.client}
              onChange={e => setNewWork(p => ({ ...p, client: e.target.value }))}
            />

            <select
              style={{ ...inputStyle, cursor: 'pointer' }}
              value={newWork.category}
              onChange={e => setNewWork(p => ({ ...p, category: e.target.value }))}
            >
              {['Social Media', 'Reels', 'Design', 'Wedding', 'Brand'].map(c => (
                <option key={c} value={c} style={{ background: DARK }}>{c}</option>
              ))}
            </select>

            <textarea
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              placeholder="Short description"
              value={newWork.description}
              onChange={e => setNewWork(p => ({ ...p, description: e.target.value }))}
            />

            <input
              style={inputStyle}
              placeholder="Type of Shoot (e.g. Pre-wedding, Product)"
              value={newWork.shootType}
              onChange={e => setNewWork(p => ({ ...p, shootType: e.target.value }))}
            />
            <input
              style={inputStyle}
              placeholder="Location"
              value={newWork.location}
              onChange={e => setNewWork(p => ({ ...p, location: e.target.value }))}
            />
            <input
              style={inputStyle}
              placeholder="Client's Insta ID (e.g. @username)"
              value={newWork.instaId}
              onChange={e => setNewWork(p => ({ ...p, instaId: e.target.value }))}
            />

            {/* Upload */}
            <div style={{
              border: `2px dashed rgba(201,168,76,0.25)`,
              borderRadius: '4px', padding: '28px',
              textAlign: 'center', marginBottom: '14px',
              cursor: 'pointer', transition: 'border-color 0.3s',
            }}
              onClick={() => fileRef.current.click()}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'}
            >
              {newWork.url ? (
                <div>
                  {newWork.type === 'video'
                    ? <video src={newWork.url} style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '2px' }} />
                    : <img src={newWork.url} alt="preview" style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '2px' }} />
                  }
                  <p style={{ fontSize: '12px', color: GOLD, marginTop: '8px' }}>Click to change</p>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '32px', color: 'rgba(201,168,76,0.3)', marginBottom: '10px' }}>◎</div>
                  <p style={{ fontSize: '13px', color: 'rgba(232,228,220,0.4)' }}>
                    Click to upload image or video
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(232,228,220,0.25)', marginTop: '4px' }}>
                    JPG, PNG, MP4, MOV supported
                  </p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>

            {newWork.type === 'video' && (
              <div style={{
                border: `2px dashed rgba(201,168,76,0.25)`,
                borderRadius: '4px', padding: '16px',
                textAlign: 'center', marginBottom: '14px',
                cursor: 'pointer', transition: 'border-color 0.3s',
              }}
                onClick={() => document.getElementById('thumbUpload').click()}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'}
              >
                {newWork.thumbnailUrl ? (
                  <div>
                    <img src={newWork.thumbnailUrl} alt="thumbnail" style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '2px' }} />
                    <p style={{ fontSize: '12px', color: GOLD, marginTop: '8px' }}>Change Thumbnail</p>
                  </div>
                ) : (
                  <p style={{ fontSize: '13px', color: 'rgba(232,228,220,0.4)' }}>
                    Upload Video Thumbnail (Optional)
                  </p>
                )}
                <input
                  id="thumbUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleThumbnailUpload}
                />
              </div>
            )}

            {/* Or URL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
              <span style={{ fontSize: '11px', color: 'rgba(232,228,220,0.3)', letterSpacing: '0.1em' }}>OR PASTE URL</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
            </div>

            <input
              style={inputStyle}
              placeholder="Paste image or video URL"
              value={newWork.url.startsWith('data:') ? '' : newWork.url}
              onChange={e => setNewWork(p => ({
                ...p, url: e.target.value,
                type: e.target.value.match(/\.(mp4|mov|webm)/i) ? 'video' : 'image'
              }))}
            />

            {msg && (
              <div style={{
                padding: '12px 16px', borderRadius: '2px', marginBottom: '14px',
                background: msg.startsWith('✓') ? 'rgba(99,153,34,0.15)' : 'rgba(226,75,74,0.15)',
                border: `1px solid ${msg.startsWith('✓') ? 'rgba(99,153,34,0.3)' : 'rgba(226,75,74,0.3)'}`,
                color: msg.startsWith('✓') ? '#97c459' : '#f09595',
                fontSize: '13px',
              }}>{msg}</div>
            )}

            <button
              onClick={addWork}
              style={{
                background: GOLD, color: BLACK, border: 'none',
                padding: '16px', width: '100%', fontSize: '12px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                cursor: 'pointer', borderRadius: '2px',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => e.target.style.background = GOLD_LIGHT}
              onMouseLeave={e => e.target.style.background = GOLD}
            >
              Add to Portfolio →
            </button>
          </div>

          {/* Works list */}
          <div className="admin-panel-container" style={{ padding: '40px', overflowY: 'auto' }}>
            <div className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px', color: CREAM, fontWeight: 300,
              }}>
                Portfolio ({works.length} items)
              </h2>
            </div>

            {works.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '80px',
                border: `1px dashed rgba(201,168,76,0.15)`, borderRadius: '4px',
              }}>
                <p style={{ color: 'rgba(232,228,220,0.3)', fontSize: '14px' }}>
                  No portfolio items yet. Add your first work using the form.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {works.map((w, i) => (
                  <div key={w.id || i} style={{
                    background: CHARCOAL, border: `1px solid rgba(201,168,76,0.1)`,
                    borderRadius: '4px', overflow: 'hidden',
                  }}>
                    <div style={{ aspectRatio: '4/3', background: DARK, position: 'relative' }}>
                      {w.type === 'video' ? (
                        <video src={w.url} poster={w.thumbnailUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                      ) : w.url ? (
                        <img src={w.url} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: '36px', color: 'rgba(201,168,76,0.2)',
                        }}>◎</div>
                      )}
                      <div style={{
                        position: 'absolute', top: '8px', right: '8px',
                        background: 'rgba(10,10,10,0.9)', padding: '3px 10px',
                        borderRadius: '2px', fontSize: '10px', color: GOLD,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                      }}>{w.category}</div>
                    </div>
                    <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '15px', color: CREAM, fontFamily: "'Cormorant Garamond', serif" }}>{w.title}</div>
                        {w.client && <div style={{ fontSize: '11px', color: GOLD, marginTop: '2px' }}>{w.client}</div>}
                      </div>
                      <button
                        onClick={() => removeWork(w.id)}
                        style={{
                          background: 'rgba(226,75,74,0.15)', border: `1px solid rgba(226,75,74,0.3)`,
                          color: '#f09595', padding: '6px 12px', borderRadius: '2px',
                          fontSize: '11px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                          flexShrink: 0, marginLeft: '8px',
                        }}
                      >Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ setPage, config }) {
  return (
    <footer className="section-padding" style={{
      background: CHARCOAL,
      borderTop: `1px solid rgba(201,168,76,0.12)`,
    }}>
      <div className="grid-3 footer-grid" style={{ gap: '48px', marginBottom: '52px' }}>
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', color: GOLD, marginBottom: '16px',
          }}>
            Tushar <span style={{ color: CREAM, fontWeight: 300 }}>socials</span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(232,228,220,0.45)', lineHeight: 1.8, maxWidth: '300px' }}>
            A creative and strategy-driven digital growth partner helping brands
            and creators build stronger digital presence.
          </p>
        </div>

        {[
          {
            title: 'Navigate',
            links: [
              { l: 'Home', p: 'home' },
              { l: 'About', p: 'about' },
              { l: 'Services', p: 'services' },
              { l: 'Work', p: 'work' },
              { l: 'Contact', p: 'contact' },
            ]
          },
          {
            title: 'Services',
            links: [
              { l: 'Social Media', p: 'services' },
              { l: 'Content Creation', p: 'services' },
              { l: 'Brand Strategy', p: 'services' },
              { l: 'Wedding Content', p: 'services' },
            ]
          },
          {
            title: 'Connect',
            links: [],
            custom: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} style={{ fontSize: '13px', color: 'rgba(232,228,220,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.5)'}
                >{config.phone}</a>
                <a href={`mailto:${config.email}`} style={{ fontSize: '13px', color: 'rgba(232,228,220,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.5)'}
                >{config.email}</a>
                <a href={config.instaLink} target="_blank" rel="noreferrer"
                  style={{ fontSize: '13px', color: 'rgba(232,228,220,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.5)'}
                >{config.instaHandle}</a>
              </div>
            )
          },
        ].map(col => (
          <div key={col.title}>
            <div style={{
              fontSize: '11px', letterSpacing: '0.15em', color: GOLD,
              textTransform: 'uppercase', marginBottom: '20px',
            }}>{col.title}</div>
            {col.custom || (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(link => (
                  <button
                    key={link.l}
                    onClick={() => setPage(link.p)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '13px', color: 'rgba(232,228,220,0.5)',
                      fontFamily: "'DM Sans', sans-serif", textAlign: 'left',
                      padding: 0, transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.target.style.color = GOLD}
                    onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.5)'}
                  >{link.l}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        borderTop: `1px solid rgba(201,168,76,0.1)`,
        paddingTop: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.3)', letterSpacing: '0.04em' }}>
          © 2025 Tushar Socials · Raipur, India
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.2)', letterSpacing: '0.04em' }}>
          Creative Digital Growth Partner
        </p>
      </div>
    </footer>
  );
}

/* ── HOME PAGE ── */
function HomePage({ setPage, works, config }) {
  return (
    <>
      <Hero setPage={setPage} config={config} />
      <ServicesPreview setPage={setPage} config={config} />
      <WorkSection works={works.slice(0, 6)} />

      {/* CTA */}
      <section className="section-padding" style={{
        background: DARK,
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          border: `1px solid rgba(201,168,76,0.06)`,
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px', height: '400px',
          border: `1px solid rgba(201,168,76,0.1)`,
          borderRadius: '50%',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: '24px' }}>
            Let's Build Something
          </div>
          <h2 className="text-h1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, color: CREAM, lineHeight: 0.95, marginBottom: '28px',
            whiteSpace: 'pre-line'
          }}>
            {config.ctaHead}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(232,228,220,0.6)', marginBottom: '48px', whiteSpace: 'pre-line' }}>
            {config.ctaSub}
          </p>
          <div className="flex-row" style={{ gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => setPage('contact')}
              style={{
                background: GOLD, color: BLACK, border: 'none',
                padding: '18px 52px', fontSize: '12px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                cursor: 'pointer', borderRadius: '2px',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => e.target.style.background = GOLD_LIGHT}
              onMouseLeave={e => e.target.style.background = GOLD}
            >Start a Project</button>
            <a
              href={config.instaLink}
              target="_blank" rel="noreferrer"
              style={{
                background: 'transparent', color: CREAM,
                border: `1px solid rgba(232,228,220,0.25)`,
                padding: '18px 52px', fontSize: '12px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer', borderRadius: '2px',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
            >Follow on Instagram</a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── APP ── */
export default function App() {
  const [page, setPage] = useState('home');
  const [works, setWorks] = useState([]);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: configData } = await supabase.from('config').select('data').eq('id', 1).single();
        if (configData?.data) {
          setConfig({ ...DEFAULT_CONFIG, ...configData.data });
          if (configData.data.logoUrl) {
            const favicon = document.getElementById('favicon');
            if (favicon) favicon.href = configData.data.logoUrl;
          }
        }
        const { data: worksData } = await supabase.from('works').select('*').order('created_at', { ascending: false });
        if (worksData) {
          const mappedWorks = worksData.map(w => ({
            ...w,
            shootType: w.shoottype,
            instaId: w.instaid,
            thumbnailUrl: w.thumbnailurl
          }));
          setWorks(mappedWorks);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const saveConfig = async (newConfig) => {
    setConfig(newConfig);
    if (newConfig.logoUrl) {
      const favicon = document.getElementById('favicon');
      if (favicon) favicon.href = newConfig.logoUrl;
    }
    const { error } = await supabase.from('config').upsert({ id: 1, data: newConfig });
    return { error };
  };

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BLACK, color: GOLD, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Loading Experience...
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} works={works} config={config} />;
      case 'about': return <AboutPage config={config} />;
      case 'services': return <ServicesPage config={config} />;
      case 'work': return <WorkPage works={works} />;
      case 'contact': return <ContactPage config={config} />;
      case 'admin': return <AdminPanel works={works} setWorks={setWorks} config={config} setConfig={saveConfig} />;
      default: return <HomePage setPage={setPage} works={works} config={config} />;
    }
  };

  return (
    <>
      <style>{styles.global}</style>
      <Nav setPage={setPage} currentPage={page} config={config} />
      <main>{renderPage()}</main>
      {page !== 'admin' && <Footer setPage={setPage} config={config} />}

      {/* Floating Instagram button */}
      <a
        href={config.instaLink}
        target="_blank" rel="noreferrer"
        title="Follow on Instagram"
        style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 200,
          width: '52px', height: '52px', borderRadius: '50%',
          background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', textDecoration: 'none',
          boxShadow: `0 4px 20px rgba(201,168,76,0.4)`,
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = `0 6px 28px rgba(201,168,76,0.6)`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(201,168,76,0.4)`; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLACK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </>
  );
}
