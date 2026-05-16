"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function ConnectionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [connections, setConnections] = useState({
    x: false,
    reddit: false,
    linkedin: false,
    github: true 
  });

  // Handle OAuth callback simulation
  useEffect(() => {
    const status = searchParams.get("auth");
    const platform = searchParams.get("platform");
    if (status === "success" && platform === "x") {
      setConnections(prev => ({ ...prev, x: true }));
      // Clean up URL
      router.replace("/connections");
    }
  }, [searchParams, router]);

  const toggleConnection = (platform: keyof typeof connections) => {
    if (platform === 'x' && !connections.x) {
      // Redirect to the mock login page
      router.push("/auth/x");
      return;
    }
    setConnections(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className="logo" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
          <div className="logo-dot" style={{ width: '6px', height: '6px' }}></div>
          Vantage
        </div>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Marketing</div>
          <Link href="/dashboard" className={styles.navItem}>
            <span>📊</span> Dashboard
          </Link>
          <Link href="/dashboard" className={styles.navItem}>
            <span>📅</span> Schedule
          </Link>
          <Link href="/connections" className={`${styles.navItem} ${styles.navItemActive}`}>
            <span>🔗</span> Connections
          </Link>
        </nav>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Product Brain</div>
          <div className={styles.navItem}><span>🧠</span> Knowledge Base</div>
          <div className={styles.navItem}><span>🎭</span> Voice Settings</div>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={`${styles.title} gradient-text`}>Platform Connections</h1>
          <p className={styles.subtitle}>Link your social identities to enable autonomous posting and deep humanization.</p>
        </header>

        <div className={styles.grid}>
          {/* X (Twitter) Card */}
          <div className={`${styles.card} glass`}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>🐦</div>
              <span className={`${styles.status} ${connections.x ? styles.statusConnected : styles.statusDisconnected}`}>
                {connections.x ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3>X (Twitter)</h3>
              <p>Post threads, engage with viral trends, and build your founder brand in public.</p>
            </div>
            <div className={styles.cardFooter}>
              <button 
                className={connections.x ? styles.disconnectBtn : `glow-button ${styles.connectBtn}`}
                onClick={() => toggleConnection('x')}
              >
                {connections.x ? 'Disconnect Account' : 'Connect X Account'}
              </button>
            </div>
          </div>

          {/* Reddit Card */}
          <div className={`${styles.card} glass`}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>👽</div>
              <span className={`${styles.status} ${connections.reddit ? styles.statusConnected : styles.statusDisconnected}`}>
                {connections.reddit ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3>Reddit</h3>
              <p>Find subreddits, contribute value-first comments, and subtley market your product.</p>
            </div>
            <div className={styles.cardFooter}>
              <button 
                className={connections.reddit ? styles.disconnectBtn : `glow-button ${styles.connectBtn}`}
                onClick={() => toggleConnection('reddit')}
              >
                {connections.reddit ? 'Disconnect Account' : 'Connect Reddit'}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className={`${styles.card} glass`}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>💼</div>
              <span className={`${styles.status} ${connections.linkedin ? styles.statusConnected : styles.statusDisconnected}`}>
                {connections.linkedin ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3>LinkedIn</h3>
              <p>Share professional stories and lesson-learned updates with your network.</p>
            </div>
            <div className={styles.cardFooter}>
              <button 
                className={connections.linkedin ? styles.disconnectBtn : `glow-button ${styles.connectBtn}`}
                onClick={() => toggleConnection('linkedin')}
              >
                {connections.linkedin ? 'Disconnect Account' : 'Connect LinkedIn'}
              </button>
            </div>
          </div>

          {/* GitHub Card */}
          <div className={`${styles.card} glass`}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>🐙</div>
              <span className={`${styles.status} ${connections.github ? styles.statusConnected : styles.statusDisconnected}`}>
                {connections.github ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3>GitHub</h3>
              <p>Monitor your commits and releases to automatically generate update posts.</p>
            </div>
            <div className={styles.cardFooter}>
              <button 
                className={connections.github ? styles.disconnectBtn : `glow-button ${styles.connectBtn}`}
                onClick={() => toggleConnection('github')}
              >
                {connections.github ? 'Disconnect Repo' : 'Connect GitHub'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
