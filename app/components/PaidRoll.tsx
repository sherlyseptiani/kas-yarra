'use client';

import { useState } from 'react';
import { champions, ANNUAL_FEE, Household } from '../data/households';
import { fmtIDR } from '../lib/utils';
import { ChevronIcon } from './Icons';
import styles from './PaidRoll.module.css';

interface PaidRollProps {
  champions: Household[];
  query: string;
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function PaidRoll({ champions: filteredChampions, query }: PaidRollProps) {
  const [isOpen, setIsOpen] = useState(true);

  const sorted = [...filteredChampions].sort((a, b) => a.name.localeCompare(b.name));
  const totalCollected = filteredChampions.length * ANNUAL_FEE;
  const totalChampions = champions.length;
  const isFiltered = query.trim().length > 0;

  return (
    <section className={styles.paidBlock}>
      <div className={styles.celebrationHeader}>
        <div className={styles.headerContent}>
          <div className={styles.trophyBadge}>
            <TrophyIcon />
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.title}>
              <StarIcon /> Settled Club <StarIcon />
            </h3>
            <p className={styles.subtitle}>
              {isFiltered ? (
                <>{filteredChampions.length} of {totalChampions} matches · <span className="mono">{fmtIDR(totalCollected)}</span></>
              ) : (
                <>{totalChampions} households paid in full! · <span className="mono">{fmtIDR(totalCollected)}</span> raised</>
              )}
            </p>
          </div>
        </div>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Hide list' : 'Show list'}
        >
          <ChevronIcon
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
      </div>

      {isOpen && (
        <div className={styles.rollContainer}>
          {sorted.length === 0 ? (
            <div className={styles.empty}>No matches in paid households.</div>
          ) : (
            <>
              <div className={styles.paidGrid}>
                {sorted.map((r, i) => (
                  <div
                    key={`${r.unit}-${r.name}`}
                    className={styles.championBadge}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <span className={styles.badgeSparkle}></span>
                    <div className={styles.badgeRow}>
                      <span className={styles.badgeName}>{r.name}</span>
                      <span className={`${styles.badgeUnit} mono`}>{r.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.celebrationFoot}>
                <span className={styles.celebrationText}>🎉 Fully paid · Rp 300,000 each</span>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
