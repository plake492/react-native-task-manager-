export const clipText = (text: string, maxChars: number): string => {
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars) + '...';
};

export const daysUntilDue = (date: Date | string): number => {
  const dueDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  // Reset time to start of day for accurate day calculation
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const timeDiff = dueDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};
