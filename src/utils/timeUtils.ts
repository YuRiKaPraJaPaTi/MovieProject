export const formatRuntime = (runtime: number): string => {
  if (!runtime || runtime <= 0) return 'N/A';
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};