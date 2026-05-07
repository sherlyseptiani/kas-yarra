'use client';

import { useState, useMemo } from 'react';
import { pending, PendingHousehold } from '../data/households';
import { fmtIDR, statusOf, buildWA } from '../lib/utils';
import { SearchIcon, CopyIcon } from './Icons';
import styles from './UnpaidSection.module.css';

interface UnpaidSectionProps {
  viewMode: 'table' | 'grouped';
  groupBy: 'status' | 'block';
  hideClose: boolean;
  query: string;
  setQuery: (q: string) => void;
  filtered: PendingHousehold[];
}

interface Group {
  key: string;
  label: string;
  items: PendingHousehold[];
}

function StatusPill({ status }: { status: ReturnType<typeof statusOf> }) {
  return (
    <span className={`${styles.uStatus} ${styles[status.key]}`}>
      <span className={styles.dot}></span>
      {status.label}
    </span>
  );
}

function CopyButton({ unit, name, due }: { unit: string; name: string; due: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const msg = buildWA(unit, name, due);
    await navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      className={`${styles.btnGhost} ${copied ? styles.copied : ''}`}
      onClick={handleCopy}
    >
      <CopyIcon />
    </button>
  );
}

function TableView({ list }: { list: PendingHousehold[] }) {
  if (!list.length) {
    return <div className={styles.empty}>No matches.</div>;
  }

  return (
    <div className={styles.unpaidTable}>
      <div className={`${styles.urow} ${styles.head}`}>
        <div>Unit</div>
        <div>Resident</div>
        <div>Status</div>
        <div>Paid</div>
        <div>Due</div>
        <div style={{ textAlign: 'right' }}>Action</div>
      </div>
      {list.map((r) => {
        const st = statusOf(r.due);
        return (
          <div key={`${r.unit}-${r.name}`} className={styles.urow}>
            <div className={`${styles.uUnit} mono`}>{r.unit}</div>
            <div className={styles.uName}>{r.name}</div>
            <div>
              <StatusPill status={st} />
            </div>
            <div className={`${styles.uAmount} ${styles.paid} tabular mono`}>
              {fmtIDR(r.paid)}
            </div>
            <div className={`${styles.uAmount} ${styles.due} tabular mono`}>
              {fmtIDR(r.due)}
            </div>
            <div className={styles.uAction}>
              <CopyButton unit={r.unit} name={r.name} due={r.due} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GroupedView({
  list,
  groupBy,
  hideClose,
}: {
  list: PendingHousehold[];
  groupBy: 'status' | 'block';
  hideClose: boolean;
}) {
  const groups = useMemo<Group[]>(() => {
    if (groupBy === 'block') {
      const byBlock: Record<string, PendingHousehold[]> = {};
      list.forEach((r) => {
        const block = r.unit.match(/^E\d+/)?.[0] || 'Other';
        byBlock[block] = byBlock[block] || [];
        byBlock[block].push(r);
      });
      return Object.keys(byBlock)
        .sort()
        .map((b) => ({ key: 'close', label: b, items: byBlock[b] }));
    }

    const defs = [
      { key: 'urgent', label: 'Urgent', filter: (r: PendingHousehold) => r.due >= 200000 },
      { key: 'behind', label: 'Behind', filter: (r: PendingHousehold) => r.due >= 125000 && r.due < 200000 },
      { key: 'close', label: 'Almost there', filter: (r: PendingHousehold) => r.due < 125000 },
    ];
    return defs
      .map((g) => ({ ...g, items: list.filter(g.filter) }))
      .filter((g) => !(hideClose && g.key === 'close'));
  }, [list, groupBy, hideClose]);

  if (!list.length) {
    return <div className={styles.empty}>No matches.</div>;
  }

  const ANNUAL_FEE = 300000;

  return (
    <div>
      {groups.map((g) => {
        if (!g.items.length) return null;
        const totalDue = g.items.reduce((s, r) => s + r.due, 0);
        return (
          <div key={g.label} className={styles.group}>
            <div className={styles.groupHead}>
              <span className={`${styles.groupTag} ${styles[g.key]}`}>
                <span className={styles.dot}></span>
                {g.label}
              </span>
              <span className={`${styles.groupMeta} mono`}>
                <b>{g.items.length}</b>{' '}
                {g.items.length === 1 ? 'household' : 'households'} ·{' '}
                <b>{fmtIDR(totalDue)}</b> outstanding
              </span>
            </div>
            <div className={styles.gcards}>
              {g.items.map((r) => {
                const pct = Math.round((r.paid / ANNUAL_FEE) * 100);
                const cardKey = groupBy === 'block' ? statusOf(r.due).key : g.key;
                return (
                  <div key={`${r.unit}-${r.name}`} className={`${styles.gcard} ${styles[cardKey]}`}>
                    <div className={styles.gcHeader}>
                      <div className={styles.gcHeaderInfo}>
                        <div className={styles.gcName}>{r.name}</div>
                        <div className={`${styles.gcUnit} mono`}>{r.unit}</div>
                      </div>
                      <div className={styles.gcHeaderActions}>
                        <div className={`${styles.gcDue} tabular mono`}>{fmtIDR(r.due)}</div>
                        <CopyButton unit={r.unit} name={r.name} due={r.due} />
                      </div>
                    </div>
                    <div className={styles.gcBar}>
                      <div className={styles.fill} style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className={styles.gcFoot}>
                      <div className={`${styles.gcPaid} mono`} data-pct={`${pct}%`}>
                        <span>{fmtIDR(r.paid)} of {fmtIDR(ANNUAL_FEE)} · {pct}%</span>
                        {pct}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function UnpaidSection({ viewMode, groupBy, hideClose, query, setQuery, filtered }: UnpaidSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionTitle}>
          Outstanding
          <span className={`${styles.sectionCount} mono`}>
            {filtered.length} / {pending.length}
          </span>
        </div>
        <div className={styles.sectionTools}>
          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              className={styles.search}
              placeholder="Search name or unit…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <TableView list={filtered} />
      ) : (
        <GroupedView list={filtered} groupBy={groupBy} hideClose={hideClose} />
      )}
    </section>
  );
}
