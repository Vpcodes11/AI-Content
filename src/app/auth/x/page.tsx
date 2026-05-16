"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function MockXLoginPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      // Simulate redirecting back to Vantage with an auth code
      router.push("/connections?auth=success&platform=x");
    }, 2000);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.xLogo}>𝕏</div>
        <h1>Authorize Vantage to use your account?</h1>
        <p className={styles.permissions}>
          This application will be able to:
          <ul>
            <li>Read your Tweets</li>
            <li>Post and delete Tweets on your behalf</li>
            <li>See who you follow</li>
          </ul>
        </p>
        <div className={styles.buttonGroup}>
          <button 
            className={styles.authorizeBtn} 
            onClick={handleAuthorize}
            disabled={isAuthorizing}
          >
            {isAuthorizing ? "Authorizing..." : "Authorize App"}
          </button>
          <button className={styles.cancelBtn} onClick={() => router.back()}>Cancel</button>
        </div>
        <div className={styles.footer}>
          Vantage will be redirected to: <strong>http://localhost:3005/connections</strong>
        </div>
      </div>
    </div>
  );
}
