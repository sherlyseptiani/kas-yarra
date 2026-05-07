'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './TopBar.module.css';

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}></div>
        <div>
          <div className={styles.brandName}>Cluster Yarra</div>
          <div className={`${styles.brandSub} mono`}>RT 017 / RW 014 · JGC</div>
        </div>
      </div>
      <nav className={styles.topnav}>
        <Link href="/" className={pathname === '/' ? styles.active : ''}>
          Dashboard
        </Link>
        <span className={styles.topnavSep}>/</span>
        <Link href="/admin" className={pathname === '/admin' ? styles.active : ''}>
          Admin
        </Link>
      </nav>
    </header>
  );
}
