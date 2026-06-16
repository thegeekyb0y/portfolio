"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  slug: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProjectImage({
  src,
  alt,
  slug,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProjectImageProps) {
  return (
    <motion.div layoutId={`project-image-${slug}`} className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />
    </motion.div>
  );
}
