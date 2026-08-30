import { describe, expect, it } from "vitest";
import { isBreached, queueRank, slaDue } from "./domain";

describe("slaDue", () => {
  it("gives P1 one hour", () => {
    const created = new Date("2026-08-30T10:00:00.000Z");
    expect(slaDue(created, "P1").toISOString()).toBe("2026-08-30T11:00:00.000Z");
  });
});

describe("queueRank", () => {
  it("puts a breached P3 before a healthy P1", () => {
    expect(queueRank("P3", true)).toBeLessThan(queueRank("P1", false));
  });
});

describe("isBreached", () => {
  it("is true after due", () => {
    expect(isBreached(new Date("2026-08-30T11:00:00Z"), new Date("2026-08-30T11:00:01Z"))).toBe(true);
  });
});
