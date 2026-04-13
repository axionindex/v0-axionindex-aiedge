import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labour Codes — Axion Index",
  description:
    "Navigate India's four labour codes with decision intelligence, compliance triggers, and implementation playbooks.",
};

export default function LabourCodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
