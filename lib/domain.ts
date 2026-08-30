export const SLA_HOURS: Record<string, number> = { P1: 1, P2: 4, P3: 8, P4: 24 };

export function slaDue(createdAt: Date, priority: string): Date {
  const hours = SLA_HOURS[priority] ?? 24;
  return new Date(createdAt.getTime() + hours * 60 * 60 * 1000);
}

export function isBreached(due: Date, now: Date): boolean {
  return now.getTime() > due.getTime();
}

export function queueRank(priority: string, breached: boolean): number {
  const base = { P1: 0, P2: 1, P3: 2, P4: 3 }[priority] ?? 4;
  return (breached ? 0 : 10) + base;
}
