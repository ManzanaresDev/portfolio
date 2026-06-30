// components/ProjectsGallery.tsx
import { getProjects } from "@/app/actions/projects";
import ProjectsGalleryClient from "./ProjectsGalleryClient";

export default async function ProjectsGallery() {
  const projects = await getProjects();
  return <ProjectsGalleryClient projects={projects} />;
}
