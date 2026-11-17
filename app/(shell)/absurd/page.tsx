import type { Metadata } from "next";
import { OrbScene } from "@/components/orb/OrbScene";

const description = "An encounter with the absurd. An interactive particle study.";

export const metadata: Metadata = {
  title: "The absurd",
  description,
  alternates: { canonical: "/absurd/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "The absurd",
    description,
    url: "/absurd/",
    images: [],
  },
  twitter: { card: "summary", title: "The absurd", description, images: [] },
};

export default function AbsurdPage() {
  return <OrbScene />;
}
