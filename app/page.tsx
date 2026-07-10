'use client';

import { useState } from "react";

import { useSceneCapability } from "@hooks";
import CanvasErrorBoundary from "./components/common/CanvasErrorBoundary";
import CanvasLoader from "./components/common/CanvasLoader";
import MobileFallback from "./components/common/MobileFallback";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";

const Home = () => {
  const { ready, shouldUseMobileFallback } = useSceneCapability();
  const [sceneFailed, setSceneFailed] = useState(false);

  if (!ready) {
    return <main className="min-h-screen bg-black" />;
  }

  if (shouldUseMobileFallback || sceneFailed) {
    return <MobileFallback />;
  }

  return (
    <CanvasErrorBoundary fallback={<MobileFallback />}>
      <CanvasLoader onSceneError={() => setSceneFailed(true)}>
        <ScrollWrapper>
          <Hero/>
          <Experience/>
          <Footer/>
        </ScrollWrapper>
      </CanvasLoader>
    </CanvasErrorBoundary>
  );
};
export default Home;
