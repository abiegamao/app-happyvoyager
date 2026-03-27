import { redirect } from "next/navigation";
import { guides } from "./data";

export default function GuidesRootPage() {
  // Automatically redirect to the first guide in the list
  redirect(`/playbook/spain-dnv/guides/${guides[0].id}`);
}
