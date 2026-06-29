// app/admin/projects/page.tsx
import { getProjects, getAllTags } from "@/app/actions/projects";
import AdminProjectsList from "@/app/dashboard/projects/AdminProjectsList";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [projects, tags] = await Promise.all([getProjects(), getAllTags()]);
  return <AdminProjectsList initialProjects={projects} allTags={tags} />;
}
