import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtIDR(n: number): string {
  return 'Rp ' + n.toLocaleString('en-US').replace(/,/g, ',');
}

export function fmtIDRcompact(n: number): string {
  if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return 'Rp ' + (n / 1e3).toFixed(0) + 'K';
  return 'Rp ' + n;
}

export interface StatusInfo {
  key: 'urgent' | 'behind' | 'close';
  label: string;
}

export function statusOf(due: number): StatusInfo {
  if (due >= 200000) return { key: 'urgent', label: 'Urgent' };
  if (due >= 125000) return { key: 'behind', label: 'Behind' };
  return { key: 'close', label: 'Almost there' };
}

export function buildWA(unit: string, name: string, due: number): string {
  return `Halo Bpk/Ibu ${name},\n\nSaya dari pengurus RT Cluster Yarra (RT 017 / RW 014). Mohon izin mengingatkan masih terdapat tunggakan kas warga 2025 untuk unit ${unit} sebesar ${fmtIDR(due)}.\n\nMohon dapat dilunasi melalui bendahara RT. Terima kasih.\n\n— Pengurus RT Cluster Yarra`;
}
