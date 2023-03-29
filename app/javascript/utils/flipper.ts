declare global {
  interface Window {
    FLIPPERS: Record<string, boolean>;
  }
}

export const isFlipperEnabled = (feature: string) => {
  return !!window.FLIPPERS[feature];
};
