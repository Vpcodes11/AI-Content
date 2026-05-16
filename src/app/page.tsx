import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className="grid-bg"></div>
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoDot}></div>
          Vantage
        </div>
        <nav>
          <button className="secondary-button" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Login</button>
        </nav>
      </header>

      <main>
        <section className={`${styles.hero} animate-fade-in`}>
          <div className={styles.badge}>Beta Access Now Open</div>
          <h1 className={`${styles.title} gradient-text`}>
            Your Product, Amplified. <br /> Authentically.
          </h1>
          <p className={styles.description}>
            The first AI GTM co-pilot that markets your SaaS across X, Reddit, and LinkedIn with the emotional intelligence of a human founder.
          </p>
          <div className={`${styles.heroButtons} animate-fade-in animate-delay-1`}>
            <Link href="/ingestion">
              <button className="glow-button">Start Your Growth Journey</button>
            </Link>
            <button className="secondary-button">Watch the Demo</button>
          </div>
        </section>

        <section className={`${styles.features} animate-fade-in animate-delay-2`}>
          <div className={styles.featureGrid}>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.featureIcon}>🧠</div>
              <h3 className={styles.featureTitle}>Product Brain</h3>
              <p className={styles.featureDescription}>
                Deep ingestion of your URL, documentation, and founder voice to create a persistent marketing consciousness.
              </p>
            </div>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.featureIcon}>✍️</div>
              <h3 className={styles.featureTitle}>Humanization Engine</h3>
              <p className={styles.featureDescription}>
                AI that understands nuance, rhythm, and imperfections. No more robotic corporate fluff or GPT-sounding copy.
              </p>
            </div>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.featureIcon}>🤝</div>
              <h3 className={styles.featureTitle}>Community First</h3>
              <p className={styles.featureDescription}>
                Authentic Reddit engagement that provides value first. Build trust without the spam risk.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Vantage AI. Built for the solo builder.</p>
      </footer>
    </div>
  );
}
