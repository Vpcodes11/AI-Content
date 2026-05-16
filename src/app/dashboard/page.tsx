"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [brain, setBrain] = useState<any>(null);
  const [view, setView] = useState("dashboard"); // dashboard, schedule
  const [isAutonomous, setIsAutonomous] = useState(false);

  useEffect(() => {
    const savedBrain = localStorage.getItem("vantage_brain");
    if (savedBrain) {
      setBrain(JSON.parse(savedBrain));
    }
  }, []);

  const mockPosts = brain ? [
    {
      id: 1,
      platform: "X (Twitter)",
      content: brain.sample_posts.x,
      status: "Pending",
      time: "2h from now"
    },
    {
      id: 2,
      platform: "Reddit",
      content: brain.sample_posts.reddit,
      status: "Approved",
      time: "Tomorrow, 10:00 AM"
    },
    {
      id: 3,
      platform: "LinkedIn",
      content: brain.sample_posts.linkedin,
      status: "Pending",
      time: "Monday, 9:00 AM"
    }
  ] : [];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className="logo" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
          <div className="logo-dot" style={{ width: '6px', height: '6px' }}></div>
          Vantage
        </div>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Marketing</div>
          <Link href="/dashboard"
            className={`${styles.navItem} ${view === 'dashboard' ? styles.navItemActive : ''}`}
            onClick={() => setView('dashboard')}
          >
            <span>📊</span> Dashboard
          </Link>
          <div 
            className={`${styles.navItem} ${view === 'schedule' ? styles.navItemActive : ''}`}
            onClick={() => setView('schedule')}
          >
            <span>📅</span> Schedule
          </div>
          <Link href="/connections" className={styles.navItem}>
            <span>🔗</span> Connections
          </Link>
        </nav>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Product Brain</div>
          <div className={styles.navItem}><span>🧠</span> Knowledge Base</div>
          <div className={styles.navItem}><span>🎭</span> Voice Settings</div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.toggleContainer}>
            <span className={styles.toggleLabel}>Autonomous Mode</span>
            <div 
              className={`${styles.toggle} ${isAutonomous ? styles.toggleActive : ''}`}
              onClick={() => setIsAutonomous(!isAutonomous)}
            >
              <div className={`${styles.toggleCircle} ${isAutonomous ? styles.toggleCircleActive : ''}`}></div>
            </div>
          </div>
          <div style={{ marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            <span className={`${styles.statusIndicator} ${isAutonomous ? styles.statusOnline : ''}`}></span>
            {isAutonomous ? 'Vantage is Active' : 'Waiting for input'}
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        {view === 'dashboard' ? (
          <>
            <header className={styles.header}>
              <h1 className="gradient-text" style={{ fontSize: '1.8rem' }}>Founder Dashboard</h1>
              <button className="glow-button" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>+ Create New Post</button>
            </header>

            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statValue}>1,284</div>
                <div className={styles.statLabel}>Total Reach</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statValue}>42</div>
                <div className={styles.statLabel}>Engagements</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statValue}>12</div>
                <div className={styles.statLabel}>Conversions</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Human Score</div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Upcoming Content</h2>
            <div className={styles.postGrid}>
              {mockPosts.map((post) => (
                <div key={post.id} className={`${styles.postCard} glass`}>
                  <div className={styles.postHeader}>
                    <span className={styles.platformBadge}>{post.platform}</span>
                    <span style={{ fontSize: '0.8rem', color: post.status === 'Approved' ? 'var(--secondary)' : 'var(--text-secondary)' }}>
                      {post.status}
                    </span>
                  </div>
                  <p className={styles.postContent}>{post.content}</p>
                  <div className={styles.postFooter}>
                    <button className="secondary-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Edit</button>
                    <button className="glow-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      {isAutonomous ? 'Reschedule' : 'Approve & Post'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <header className={styles.header}>
              <h1 className="gradient-text" style={{ fontSize: '1.8rem' }}>Autonomous Schedule</h1>
            </header>
            <div className={styles.scheduleList}>
              {mockPosts.map((post) => (
                <div key={post.id} className={styles.scheduleItem}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '1.2rem' }}>{post.platform === 'X (Twitter)' ? '🐦' : (post.platform === 'Reddit' ? '👽' : '💼')}</div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{post.platform} Post</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{post.time}</div>
                    </div>
                  </div>
                  <button className="secondary-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Manage</button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
