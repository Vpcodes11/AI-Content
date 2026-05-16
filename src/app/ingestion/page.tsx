"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function IngestionPage() {
  const router = useRouter();
  const [sourceType, setSourceType] = useState("website"); // website, social, pitch
  const [url, setUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("founder");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Connecting to source...",
    "Learning founder voice patterns...",
    "Extracting core product DNA...",
    "Calibrating humanization engine...",
    "Finalizing Product Brain..."
  ];

  const handleInitialize = async () => {
    const finalUrl = sourceType === "website" ? url : (sourceType === "social" ? socialLinks : "manual_pitch");
    if (!finalUrl && sourceType !== "pitch") return;
    
    setIsAnalyzing(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length - 1) {
        step++;
        setAnalysisStep(step);
      }
    }, 2000);

    try {
      const response = await fetch("http://localhost:8001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url: finalUrl, 
          description: description, 
          tone: tone,
          source_type: sourceType 
        }),
      });
      
      const result = await response.json();
      if (result.status === "success") {
        const brainData = JSON.parse(result.data);
        localStorage.setItem("vantage_brain", JSON.stringify(brainData));
        setAnalysisStep(steps.length - 1);
        setTimeout(() => {
          clearInterval(interval);
          router.push("/dashboard");
        }, 1000);
      } else {
        throw new Error(result.detail || "Analysis failed");
      }
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please ensure the link is public or try the Pitch mode.");
      setIsAnalyzing(false);
      clearInterval(interval);
    }
  };

  if (isAnalyzing) {
    return (
      <div className={styles.container}>
        <div className="grid-bg"></div>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div className={styles.loader}>
            <div className={styles.loaderInner}></div>
          </div>
          <h2 className="gradient-text" style={{ marginTop: '32px', fontSize: '1.5rem' }}>Analyzing {sourceType === 'pitch' ? 'Your Idea' : 'Your Source'}</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', minHeight: '1.5em' }}>
            {steps[analysisStep]}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="grid-bg"></div>
      
      <header className={styles.header}>
        <Link href="/" style={{ position: 'absolute', left: '24px', top: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          ← Back to home
        </Link>
        <h1 className={`${styles.title} gradient-text`}>Train Your Brain</h1>
        <p className={styles.subtitle}>Choose your source. Vantage learns from wherever you are most active.</p>
      </header>

      <div className={styles.sourceTabs} style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
        <button 
          className={sourceType === 'website' ? 'glow-button' : 'secondary-button'} 
          style={{ padding: '8px 20px', borderRadius: '100px' }}
          onClick={() => setSourceType('website')}
        >
          Website
        </button>
        <button 
          className={sourceType === 'social' ? 'glow-button' : 'secondary-button'} 
          style={{ padding: '8px 20px', borderRadius: '100px' }}
          onClick={() => setSourceType('social')}
        >
          Social / GitHub
        </button>
        <button 
          className={sourceType === 'pitch' ? 'glow-button' : 'secondary-button'} 
          style={{ padding: '8px 20px', borderRadius: '100px' }}
          onClick={() => setSourceType('pitch')}
        >
          Raw Idea
        </button>
      </div>

      <main className={styles.form}>
        <section className={`${styles.section} glass`}>
          <h2 className={styles.sectionTitle}>
            <span>{sourceType === 'website' ? '🌐' : (sourceType === 'social' ? '🔗' : '💡')}</span> 
            {sourceType === 'website' ? 'Core Identity' : (sourceType === 'social' ? 'Contextual Links' : 'The Founder Pitch')}
          </h2>
          
          {sourceType === 'website' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product Website URL</label>
              <input 
                type="url" 
                className={styles.input} 
                placeholder="https://yourproduct.com" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          )}

          {sourceType === 'social' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Social/GitHub Links</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="X profile, Reddit post, or GitHub repo URL" 
                value={socialLinks}
                onChange={(e) => setSocialLinks(e.target.value)}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {sourceType === 'pitch' ? 'Describe your vision in detail' : 'Elevator Pitch / Extra Context'}
            </label>
            <textarea 
              className={`${styles.input} ${styles.textarea}`} 
              placeholder={sourceType === 'pitch' ? "Tell me everything. What is it? Who is it for? Why are you building it?" : "Anything else Vantage should know?"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ minHeight: sourceType === 'pitch' ? '200px' : '120px' }}
            ></textarea>
          </div>
        </section>

        <section className={`${styles.section} glass`}>
          <h2 className={styles.sectionTitle}>
            <span>🎭</span> Founder Voice
          </h2>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Preferred Tone</label>
              <select 
                className={styles.input}
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="founder">Indie Founder (Authentic, Raw)</option>
                <option value="expert">Industry Expert (Authoritative, Insightful)</option>
                <option value="helpful">Helpful Neighbor (Community-focused)</option>
                <option value="visionary">Visionary (Big picture, Inspiring)</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Target Audience (ICP)</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="e.g. Solo developers, Marketing leads" 
              />
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <button className="glow-button" style={{ width: '200px' }} onClick={handleInitialize}>
            Initialize Brain
          </button>
        </div>
      </main>
    </div>
  );
}
