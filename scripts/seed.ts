import { PGlite } from "@electric-sql/pglite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { SCHEMA_SQL } from "../lib/db/schema-sql";
import { hashPassword } from "../lib/auth/password";

const email = "demo@deskqueue.dev";
const orgId = "org_demo";
const userId = "user_demo";

async function main() {
  mkdirSync(path.join(process.cwd(), ".data"), { recursive: true });
  const db = new PGlite(path.join(process.cwd(), ".data", "pglite"));
  await db.waitReady;
  await db.exec(SCHEMA_SQL);
  const passwordHash = await hashPassword("DemoPass123!");
  await db.query("insert into users (id, email, password_hash) values ($1, $2, $3) on conflict (email) do nothing", [userId, email, passwordHash]);
  await db.query("insert into profiles (user_id, display_name) values ($1, $2) on conflict (user_id) do nothing", [userId, "Alex Demo"]);
  await db.query("insert into organizations (id, name, slug) values ($1, $2, $3) on conflict (id) do nothing", [orgId, "Pineside IT", "deskqueue"]);
  await db.query("insert into organization_members (id, organization_id, user_id, role) values ($1, $2, $3, $4) on conflict do nothing", ["mem_1", orgId, userId, "owner"]);

  const stale = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
  await db.query("insert into tickets (id, organization_id, title, priority, status, created_at) values ($1,$2,$3,$4,$5,$6)", ["t1", orgId, "VPN down for finance", "P1", "open", stale]);
  await db.query("insert into tickets (id, organization_id, title, priority, status) values ($1,$2,$3,$4,$5)", ["t2", orgId, "New laptop for intern", "P4", "open"]);
  await db.query("insert into tickets (id, organization_id, title, priority, status, assignee) values ($1,$2,$3,$4,$5,$6)", ["t3", orgId, "MFA reset", "P2", "open", "Alex"]);
  console.log("Seeded DeskQueue");
}

main();
