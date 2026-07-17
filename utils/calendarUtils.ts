// utils/calendarUtils.ts

/**
 * Returns an array of Date objects representing every day cell
 * needed to render a full month grid, including leading/trailing
 * days from adjacent months to fill complete weeks.
 */
export function getMonthGridDays(year: number, month: number): Date[] {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const startWeekday = firstOfMonth.getDay(); // 0 = Sunday
  const gridStart = new Date(year, month, 1 - startWeekday);

  const totalCells = Math.ceil((startWeekday + lastOfMonth.getDate()) / 7) * 7;

  return Array.from({ length: totalCells }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

export function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}