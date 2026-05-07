'use client';

import styles from './TweaksButton.module.css';

interface TweaksButtonProps {
  onClick: () => void;
}

export default function TweaksButton({ onClick }: TweaksButtonProps) {
  return (
    <button className={styles.tweaksBtn} onClick={onClick} aria-label="Open tweaks">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m4.22-13.22l-4.24 4.24m-4.24 4.24l-4.24 4.24M23 12h-6m-6 0H1m20.07 4.93l-4.24-4.24m-4.24-4.24l-4.24-4.24" />
      </svg>
      Settings
    </button>
  );
}
