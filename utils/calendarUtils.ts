// utils/calendarUtils.ts

/**
 * Returns an array of Date objects representing every day cell
 * needed to render a full month grid, including leading/trailing
 * days from adjacent months to fill complete weeks.
 */
export interface CalendarDay {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
}

export function getMonthGridDays(
  year: number,
  month: number
): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const startWeekday = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startWeekday);

  const totalCells =
    Math.ceil((startWeekday + lastOfMonth.getDate()) / 7) * 7;

  return Array.from({ length: totalCells }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);

    return {
      date,
      dateKey: toDayKey(date),
      isCurrentMonth: date.getMonth() === month,
    };
  });
}

export function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}