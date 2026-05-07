'use client';

import { CloseIcon } from './Icons';
import styles from './TweaksPanel.module.css';

interface TweaksPanelProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: 'table' | 'grouped';
  setViewMode: (mode: 'table' | 'grouped') => void;
  groupBy: 'status' | 'block';
  setGroupBy: (by: 'status' | 'block') => void;
  hideClose: boolean;
  setHideClose: (hide: boolean) => void;
}

export default function TweaksPanel({
  isOpen,
  onClose,
  viewMode,
  setViewMode,
  groupBy,
  setGroupBy,
  hideClose,
  setHideClose,
}: TweaksPanelProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.tweaks} role="dialog" aria-label="Tweaks">
      <div className={styles.tweaksHd}>
        <b>Tweaks</b>
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
          <div className={styles.switch}>
            <label htmlFor="tw-collapse-close">Hide "Almost there"</label>
            <input
              type="checkbox"
              id="tw-collapse-close"
              checked={hideClose}
              onChange={(e) => setHideClose(e.target.checked)}
            />
            <span
              className={styles.track}
              onClick={() => setHideClose(!hideClose)}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
