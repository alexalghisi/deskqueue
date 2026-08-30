import { requireUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { isBreached, queueRank, slaDue } from "@/lib/domain";
import { assignTicketAction, resolveTicketAction } from "@/features/work/actions";
import { Button } from "@/components/ui/button";

export default async function QueuePage() {
  const user = await requireUser();
  const db = await getDb();
  const rows = await db.query<{ id: string; title: string; priority: string; status: string; assignee: string | null; created_at: Date }>(
    "select id, title, priority, status, assignee, created_at from tickets where organization_id = $1",
    [user.organizationId],
  );
  const now = new Date();
  const ranked = rows.rows
    .map((row) => {
      const due = slaDue(new Date(row.created_at), row.priority);
      const breached = row.status !== "resolved" && isBreached(due, now);
      return { ...row, due, breached, rank: queueRank(row.priority, breached) };
    })
    .sort((a, b) => a.rank - b.rank);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Queue</h1>
      <ul className="space-y-2">
        {ranked.map((row) => (
          <li key={row.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-sm">
            <div>
              <p>{row.title}</p>
              <p className="text-muted-foreground">{row.priority} · {row.status} · {row.breached ? "BREACHED" : "on track"} · {row.assignee ?? "unassigned"}</p>
            </div>
            <div className="flex gap-1">
              <form action={assignTicketAction.bind(null, row.id)}><Button size="sm" variant="outline">Assign me</Button></form>
              <form action={resolveTicketAction.bind(null, row.id)}><Button size="sm">Resolve</Button></form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
