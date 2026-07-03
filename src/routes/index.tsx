import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/hero";
import {
  Features,
  GalleryPreview,
  HomeCTA,
  Occupancy,
  Testimonials,
} from "@/components/home/home-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Libzy — Reserve Your Perfect Study Seat" },
      {
        name: "description",
        content:
          "Your perfect study space awaits. Reserve a seat instantly at Libzy and study in a premium, peaceful, productive environment with 24x7 access.",
      },
      { property: "og:title", content: "Libzy — Reserve Your Perfect Study Seat" },
      {
        property: "og:description",
        content: "Reserve your seat instantly and study in a peaceful, productive environment.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Features />
      <Occupancy />
      <Testimonials />
      <GalleryPreview />
      <HomeCTA />
    </>
  );
}
