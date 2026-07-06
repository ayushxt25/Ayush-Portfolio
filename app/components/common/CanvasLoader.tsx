'use client';

import { useGSAP } from "@gsap/react";
import { AdaptiveDpr, Preload, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isMobile } from "react-device-detect";

import { useThemeStore } from "@stores";

import AwwardsBadge from "./AwwardsBadge";
import Preloader from "./Preloader";
import ProgressLoader from "./ProgressLoader";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";

const CanvasLoader = (props: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundColor = useThemeStore((state) => state.theme.color);
  const { progress } = useProgress();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const [forceShowCanvas, setForceShowCanvas] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShowCanvas(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const canvasStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: forceShowCanvas ? 1 : 0,
    overflow: "hidden",
    touchAction: "pan-y",
    ...(mounted && !isMobile && {
      inset: '1rem',
      width: 'calc(100% - 2rem)',
      height: 'calc(100% - 2rem)',
    }),
  };

  useGSAP(() => {
    if (progress >= 95 || forceShowCanvas) {
      gsap.to('.base-canvas', { opacity: 1, duration: 1.5, delay: 0.5 });
    }
  }, [progress, forceShowCanvas]);

  const noiseOverlayStyle = {
    backgroundBlendMode: "soft-light",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "100px",
  };

  useGSAP(() => {
    gsap.to(ref.current, {
      backgroundColor: backgroundColor,
      duration: 1,
    });

    gsap.to(canvasRef.current, {
      backgroundColor: backgroundColor,
      duration: 1,
      ...noiseOverlayStyle,
    });
  }, [backgroundColor]);

  return (
    <div className="h-[100dvh] min-h-[100vh] wrapper relative overflow-hidden">
      <div className="h-[100dvh] min-h-[100vh] relative" ref={ref}>
        <Canvas
          className="base-canvas"
          shadows={!isMobile}
          style={canvasStyle}
          ref={canvasRef}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{
            antialias: !isMobile,
            alpha: false,
            powerPreference: isMobile ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          performance={{ min: 0.3 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />

            <ScrollControls
              pages={4}
              damping={isMobile ? 0.25 : 0.4}
              maxSpeed={1}
              distance={1}
              style={{ zIndex: 1 }}
            >
              {props.children}
              <Preloader />
            </ScrollControls>

            {!isMobile && <Preload all />}
          </Suspense>

          {!isMobile && <AdaptiveDpr pixelated />}
        </Canvas>

        <ProgressLoader progress={forceShowCanvas ? 100 : progress} />
      </div>

      <AwwardsBadge />
      <ThemeSwitcher />
      <ScrollHint />
    </div>
  );
};

export default CanvasLoader;