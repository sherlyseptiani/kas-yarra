'use client';

import { useState } from 'react';
import { champions, ANNUAL_FEE } from '../data/households';
import { fmtIDR } from '../lib/utils';
import { ChevronIcon } from './Icons';
import styles from './PaidRoll.module.css';

export default function PaidRoll() {
  const [isOpen, setIsOpen] = useState(true);

  const sorted = [...champions].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className={styles.paidBlock}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionTitle}>
          Settled
          <span className={`${styles.sectionCount} mono`}>{champions.length}</span>
        </div>
        <div className={styles.sectionTools}>
          <button
            className={styles.btnGhost}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronIcon
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
            <span>{isOpen ? 'Hide list' : 'Show list'}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="paid-roll-wrap">
          <div className={styles.paidRoll}>
            {sorted.map((r) => (
              <span key={`${r.unit}-${r.name}`} className={styles.paidItem}>
                <span className={`${styles.sparkle} ${styles.s1}`}></span>
                <span className={`${styles.sparkle} ${styles.s2}`}></span>
                <span className={`${styles.sparkle} ${styles.s3}`}></span>
                <span className={styles.pname}>{r.name}</span>
                <span className={`${styles.punit} mono`}>{r.unit}</span>
              </span>
            ))}
          </div>
          <div className={styles.paidFoot}>
            <span>
              <span>{champions.length}</span> households ·{' '}
              <span className="mono">{fmtIDR(champions.length * ANNUAL_FEE)}</span>
            </span>
            <span className="mono">All paid in full · Rp 300,000 each</span>
          </div>
        </div>
      )}
    </section>
  );
}
