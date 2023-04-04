declare global {
  interface Window {
    FLIPPERS: Record<string, boolean>;
  }
}

export const useFlipper = (feature: string) => {
  if (!window.FLIPPERS) {
    return false;
  }

  return !!window.FLIPPERS[feature];
};
