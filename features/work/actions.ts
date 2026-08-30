"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { newId } from "@/lib/utils";

export async function createTicketAction(formData: FormData) {
  const user = await requireUser();
  const db = await getDb();
  await db.query(
    "insert into tickets (id, organization_id, title, priority, status) values ($1,$2,$3,$4,'open')",
    [newId(), user.organizationId, String(formData.get("title") ?? "").trim(), String(formData.get("priority") ?? "P3")],
  );
  revalidatePath("/app");
}

export async function resolveTicketAction(id: string) {
  const user = await requireUser();
  const db = await getDb();
  await db.query("update tickets set status = 'resolved' where id = $1 and organization_id = $2", [id, user.organizationId]);
  revalidatePath("/app");
}

export async function assignTicketAction(id: string) {
  const user = await requireUser();
  const db = await getDb();
  await db.query("update tickets set assignee = $1 where id = $2 and organization_id = $3", [user.displayName, id, user.organizationId]);
  revalidatePath("/app");
}
