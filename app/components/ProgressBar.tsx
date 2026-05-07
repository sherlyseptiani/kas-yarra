'use client';

import { ANNUAL_FEE, TOTAL_COLLECTED, champions, pending } from '../data/households';
import styles from './ProgressBar.module.css';

export default function ProgressBar() {
  const total = pending.length + champions.length;
  const target = total * ANNUAL_FEE;
  const pct = Math.round((TOTAL_COLLECTED / target) * 100);

  return (
    <div className={styles.progressRow}>
      <div className={`${styles.pct} mono tabular`}>{pct}%</div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${pct}%` }}></div>
      </div>
      <div className={styles.legend}>
        <span className={styles.paid}>Paid</span>
        <span className={styles.open}>Open</span>
      </div>
    </div>
  );
}
