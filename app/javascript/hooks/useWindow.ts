declare global {
  interface Window {
    FLIPPERS: Record<string, boolean>;
    GIT_REVISION: GitRevision;
  }
}

type GitRevision = {
  message: string;
  tag: string;
  revision: string;
};

export const useFlipper = (feature: string) => {
  if (!window.FLIPPERS) {
    return false;
  }

  return !!window.FLIPPERS[feature];
};

export const useGitRevision = () => {
  return window.GIT_REVISION || {};
};
