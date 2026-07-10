'use client';

import { useSyncExternalStore } from 'react';

type SceneCapability = {
  ready: boolean;
  shouldUseMobileFallback: boolean;
};

function supportsWebGL() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

function getSnapshot(): SceneCapability {
  if (typeof window === 'undefined') {
    return {
      ready: false,
      shouldUseMobileFallback: false,
    };
  }

  const smallScreen = window.matchMedia('(max-width: 1024px)').matches;
  const touchCapable = navigator.maxTouchPoints > 0;
  const webglSupported = supportsWebGL();

  return {
    ready: true,
    // Keep the 3D scene off small touch devices to avoid mobile WebGL crashes
    // and expensive initial GLTF/canvas work during first paint.
    shouldUseMobileFallback: (smallScreen && touchCapable) || !webglSupported,
  };
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(max-width: 1024px)');
  window.addEventListener('resize', onStoreChange);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    window.removeEventListener('resize', onStoreChange);
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

export function useSceneCapability() {
  return useSyncExternalStore(subscribe, getSnapshot, () => ({
    ready: false,
    shouldUseMobileFallback: false,
  }));
}
