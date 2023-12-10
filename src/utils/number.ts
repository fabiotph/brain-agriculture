const calculatePercentage = (value: number, total: number) =>
  (Math.round(((value * 100) / total) * 100) / 100) ?? 0;

export { calculatePercentage };
