declare global {
  interface Window {
    FLIPPERS: Record<string, boolean>;
  }
}

export const useFlipper = (feature: string) => {
  return !!window.FLIPPERS[feature];
};
