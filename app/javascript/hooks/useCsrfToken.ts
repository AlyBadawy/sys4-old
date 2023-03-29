export const useCsrfToken = () => {
  const token = document
    ?.querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
  return token || '';
};
