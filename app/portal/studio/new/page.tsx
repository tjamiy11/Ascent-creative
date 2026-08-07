import type { Metadata } from "next";
import { BriefingComposer } from "@/components/portal/briefing-composer";

// Server wrapper so the route can still declare metadata — the composer itself
// is stateful and has to be a client component, and those can't export it.
export const metadata: Metadata = {
  title: "New proposal",
  robots: { index: false, follow: false },
};

export default function NewBriefingPage() {
  return <BriefingComposer />;
}
