import { DottedSurface } from "@/app/components/ui/dotted-surface";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <DottedSurface fixed={false} className="h-full w-full">
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(184,137,58,0.15),transparent_50%)] blur-[40px] dark:bg-[radial-gradient(ellipse_at_center,rgba(184,137,58,0.1),transparent_50%)]"
          />
          <div className="relative z-20 flex flex-col items-center justify-center text-center">
            <h1
              className={`${styles.shimmerText} ${styles.heroTitle} font-sans font-bold tracking-tight`}
            >
              Kas Cluster Yarra
            </h1>
            <p
              className={`${styles.shimmerText} mono mt-4 text-3xl font-medium tracking-widest sm:text-4xl lg:text-5xl`}
              style={{ animationDelay: "0.5s" }}
            >
              2025
            </p>
          </div>
        </div>
      </DottedSurface>
    </div>
  );
}
