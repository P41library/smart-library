import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Inside Libzy Study Spaces" },
      { name: "description", content: "Take a visual tour of Libzy's premium study halls, reading rooms and focus zones." },
      { property: "og:title", content: "Gallery — Inside Libzy" },
      { property: "og:description", content: "A visual tour of our premium study spaces." },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: g1, span: "row-span-2" },
  { src: g2, span: "" },
  { src: g4, span: "" },
  { src: g3, span: "col-span-2" },
  { src: g5, span: "row-span-2" },
  { src: g6, span: "col-span-2" },
];

function GalleryPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal type="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Gallery</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Step inside Libzy</h1>
          <p className="mt-4 text-muted-foreground">Calm, bright and built for deep focus. Tap any photo to view it larger.</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, i) => (
            <StaggerItem key={i} type="scale" className={img.span}>
              <button
                onClick={() => setActive(img.src)}
                data-cursor="hover"
                className="group h-full w-full overflow-hidden rounded-3xl"
              >
                <img
                  src={img.src}
                  alt="Libzy study space"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-foreground/70 p-6 backdrop-blur-md"
          >
            <button className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white">
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={active}
              alt="Libzy study space enlarged"
              className="max-h-[85vh] max-w-full rounded-3xl object-contain shadow-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
