import { getPendingTestimonials } from "@/app/actions/testimonial";
import AdminTestimonialsList from "@/components/dashboard/AdminTestimonialsList";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const pending = await getPendingTestimonials();
  return <AdminTestimonialsList initialPending={pending} />;
}
