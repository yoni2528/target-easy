import { MOCK_INSTRUCTORS } from "@/lib/mock-data";
import InstructorPageContent from "./InstructorPageContent";

export function generateStaticParams() {
  return MOCK_INSTRUCTORS.map((i) => ({ id: i.id }));
}

export default async function InstructorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InstructorPageContent id={id} />;
}
