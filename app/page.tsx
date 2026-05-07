'use client';

import { useState, useEffect, useMemo } from 'react';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ProgressBar from './components/ProgressBar';
import UnpaidSection from './components/UnpaidSection';
import PaidRoll from './components/PaidRoll';
import Footer from './components/Footer';
import TweaksButton from './components/TweaksButton';
import TweaksPanel from './components/TweaksPanel';
import { champions, pending } from './data/households';

export default function Home() {
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('grouped');
  const [groupBy, setGroupBy] = useState<'status' | 'block'>('status');
  const [hideClose, setHideClose] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const filteredPending = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter(
      (r) => r.unit.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredChampions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return champions;
    return champions.filter(
      (r) => r.unit.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section>
      <Hero />
      <div className="shell">
        <Stats />
        <ProgressBar />
        <UnpaidSection
          viewMode={viewMode}
          groupBy={groupBy}
          hideClose={hideClose}
          query={query}
          setQuery={setQuery}
          filtered={filteredPending}
        />
        <PaidRoll champions={filteredChampions} query={query} />
        <Footer />

        {!tweaksOpen && (
          <TweaksButton onClick={() => setTweaksOpen(true)} />
        )}

        <TweaksPanel
          isOpen={tweaksOpen}
          onClose={() => setTweaksOpen(false)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    </section>
  );
}
