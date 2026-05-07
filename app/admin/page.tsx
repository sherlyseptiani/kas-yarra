'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function AdminPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [records, setRecords] = useState<Array<{ unit: string; name: string; amount: number }>>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      // Mock extraction - in a real app, this would parse the PDF
      setRecords([
        { unit: 'E1/3a', name: 'Aditya Putra', amount: 300000 },
        { unit: 'E5/7b', name: 'Ririn', amount: 300000 },
      ]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setRecords([
        { unit: 'E1/3a', name: 'Aditya Putra', amount: 300000 },
        { unit: 'E5/7b', name: 'Ririn', amount: 300000 },
      ]);
    }
  };

  return (
    <div className="shell">
      <TopBar />

      <section className={styles.hero}>
        <div className={styles.eyebrow}>Treasurer</div>
        <h1>Admin Dashboard</h1>
        <p className={styles.lede}>
          Upload treasury reports to update household payment records.
        </p>
      </section>

      <section className={styles.uploadSection}>
        <div
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className={styles.fileInput}
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className={styles.dropLabel}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <span>Drop PDF report here or click to browse</span>
          </label>
        </div>

        {file && (
          <div className={styles.fileInfo}>
            <div className={styles.fileName}>{file.name}</div>
            <div className={styles.records}>
              <h3>Extracted Records</h3>
              {records.length > 0 ? (
                <table className={styles.recordsTable}>
                  <thead>
                    <tr>
                      <th>Unit</th>
                      <th>Resident</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i}>
                        <td className="mono">{r.unit}</td>
                        <td>{r.name}</td>
                        <td className="mono tabular">Rp {r.amount.toLocaleString()}</td>
                        <td>
                          <button className={styles.editBtn}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className={styles.noRecords}>No records found in PDF</p>
              )}
            </div>
            <div className={styles.actions}>
              <button className={styles.publishBtn}>Publish to Dashboard</button>
              <button className={styles.discardBtn} onClick={() => { setFile(null); setRecords([]); }}>
                Discard
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
