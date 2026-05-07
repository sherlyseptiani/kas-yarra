"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [0.8, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translateY = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <div
      className="h-[80vh] md:h-[100vh] flex items-center justify-center relative"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translateY={translateY} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translateY, titleComponent }: { translateY: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{
        y: translateY,
      }}
      className="max-w-5xl mx-auto text-center mb-8"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-5xl mx-auto h-[20rem] md:h-[30rem] w-full border-4 border-[#6C6C6C] p-2 md:p-4 bg-[#222222] rounded-[20px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
