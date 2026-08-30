import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AUTHOR } from "@/lib/contact";

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Personal portfolio · technical case study</p>
      <h1 className="mt-3 text-4xl font-semibold">DeskQueue</h1>
      <p className="mt-4 text-muted-foreground">Internal helpdesk: priority, SLA due time, breach flag, and assignment.</p>
      <p className="mt-3 text-sm text-muted-foreground">A queue is only useful if P1 is actually due sooner than P4. Seed data is fictional. No customers or revenue are claimed.</p>
      <div className="mt-8 flex gap-2">
        <Button asChild>
          <Link href="/login">Open the demo</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={AUTHOR.github}>GitHub</a>
        </Button>
      </div>
      <section className="mt-12 space-y-2 text-sm">
        <h2 className="font-semibold">Implemented</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Tickets with P1–P4 and computed SLA due</li>
          <li>Breach is a function of due time vs now, not a stored guess</li>
          <li>Assign / resolve actions</li>
          <li>Dashboard sorted by breach then priority</li>
        </ul>
      </section>
      <footer className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
        {AUTHOR.name} · <a className="underline" href={AUTHOR.linkedin}>{AUTHOR.linkedin.replace("https://www.", "")}</a>
      </footer>
    </main>
  );
}
