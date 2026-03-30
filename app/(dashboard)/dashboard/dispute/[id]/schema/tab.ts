import { z } from "zod";

import type { DisputeTabKey } from "../types/dispute";

const disputeTabSchema = z.enum(["details", "progress"]);

export function parseDisputeTab(tab?: string | string[]): DisputeTabKey {
  const value = Array.isArray(tab) ? tab[0] : tab;
  const parsed = disputeTabSchema.safeParse(value);

  return parsed.success ? parsed.data : "details";
}
