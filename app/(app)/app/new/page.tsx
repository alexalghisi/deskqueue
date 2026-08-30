import { createTicketAction } from "@/features/work/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewTicketPage() {
  return (
    <form action={createTicketAction} className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">New ticket</h1>
      <div className="space-y-1.5"><Label htmlFor="title">Title</Label><Input id="title" name="title" required /></div>
      <div className="space-y-1.5">
        <Label htmlFor="priority">Priority</Label>
        <select id="priority" name="priority" className="flex h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
          <option>P1</option><option>P2</option><option>P3</option><option>P4</option>
        </select>
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
