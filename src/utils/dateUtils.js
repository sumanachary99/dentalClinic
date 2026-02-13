/**
 * Format a date string for display
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Get today's date as YYYY-MM-DD
 */
export function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Generate next N days as date objects
 */
export function getNextDays(count = 14) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      dateStr: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      isToday: i === 0,
    });
  }
  return days;
}

/**
 * Check if a date string is today
 */
export function isToday(dateStr) {
  return dateStr === getTodayString();
}

/**
 * Check if a date is in the past
 */
export function isPast(dateStr) {
  return new Date(dateStr) < new Date(getTodayString());
}

/**
 * Get relative day label
 */
export function getRelativeDay(dateStr) {
  const today = new Date(getTodayString());
  const target = new Date(dateStr);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return formatDate(dateStr);
}
