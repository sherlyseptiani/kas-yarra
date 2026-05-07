'use client';

import { CloseIcon, SunIcon, MoonIcon } from './Icons';
import styles from './TweaksPanel.module.css';

interface TweaksPanelProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: 'table' | 'grouped';
  setViewMode: (mode: 'table' | 'grouped') => void;
  groupBy: 'status' | 'block';
  setGroupBy: (by: 'status' | 'block') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export default function TweaksPanel({
  isOpen,
  onClose,
  viewMode,
  setViewMode,
  groupBy,
  setGroupBy,
  theme,
  setTheme,
}: TweaksPanelProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.tweaks} role="dialog" aria-label="Tweaks">
      <div className={styles.tweaksHd}>
        <b>Settings</b>
        <button className={styles.tweaksX} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      </div>
      <div className={styles.tweaksBody}>
        <div className={styles.tweaksRow}>
          <div className={styles.tweaksLbl}>Outstanding view</div>
          <div className={styles.seg}>
            <button
              className={viewMode === 'table' ? styles.active : ''}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
            <button
              className={viewMode === 'grouped' ? styles.active : ''}
              onClick={() => setViewMode('grouped')}
            >
              Grouped
            </button>
          </div>
        </div>
        <div className={styles.tweaksRow}>
          <div className={styles.tweaksLbl}>Group by</div>
          <div className={styles.seg}>
            <button
              className={groupBy === 'status' ? styles.active : ''}
              onClick={() => {
                setGroupBy('status');
                if (viewMode !== 'grouped') setViewMode('grouped');
              }}
            >
              Status
            </button>
            <button
              className={groupBy === 'block' ? styles.active : ''}
              onClick={() => {
                setGroupBy('block');
                if (viewMode !== 'grouped') setViewMode('grouped');
              }}
            >
              Block
            </button>
          </div>
        </div>
        <div className={styles.tweaksRow}>
          <div className={styles.tweaksLbl}>Theme</div>
          <div className={styles.seg}>
            <button
              className={theme === 'light' ? styles.active : ''}
              onClick={() => setTheme('light')}
            >
              <SunIcon className={styles.segIcon} /> Light
            </button>
            <button
              className={theme === 'dark' ? styles.active : ''}
              onClick={() => setTheme('dark')}
            >
              <MoonIcon className={styles.segIcon} /> Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
