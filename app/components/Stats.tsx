'use client';

import { ANNUAL_FEE, TOTAL_COLLECTED, champions, pending } from '../data/households';
import { fmtIDRcompact } from '../lib/utils';
import styles from './Stats.module.css';

export default function Stats() {
  const outstanding = pending.reduce((s, r) => s + r.due, 0);
  const total = pending.length + champions.length;
  const target = total * ANNUAL_FEE;
  const pct = Math.round((TOTAL_COLLECTED / target) * 100);

  return (
    <section className={styles.stats}>
      <div className={styles.stat}>
        <div className={styles.k}>Outstanding</div>
        <div className={`${styles.v} ${styles.amber} tabular`}>{fmtIDRcompact(outstanding)}</div>
        <div className={styles.sub}>
          <span>{pending.length}</span> households
        </div>
      </div>
      <div className={styles.stat}>
        <div className={styles.k}>Collected</div>
        <div className={`${styles.v} tabular`}>{fmtIDRcompact(TOTAL_COLLECTED)}</div>
        <div className={styles.sub}>
          <span>{champions.length}</span> fully paid
        </div>
      </div>
      <div className={styles.stat}>
        <div className={styles.k}>Target</div>
        <div className={`${styles.v} ${styles.muted} tabular`}>{fmtIDRcompact(target)}</div>
        <div className={styles.sub}>
          <span>{total}</span> households tracked
        </div>
      </div>
      <div className={styles.stat}>
        <div className={styles.k}>Completion</div>
        <div className={`${styles.v} tabular`}>{pct}%</div>
        <div className={styles.sub}>of annual target</div>
      </div>
    </section>
  );
}
