"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  slug: string;
  className?: string;
  priority?: boolean;
}

export function ProjectImage({
  src,
  alt,
  slug,
  className,
  priority,
}: ProjectImageProps) {
  return (
    <motion.div layoutId={`project-image-${slug}`} className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </motion.div>
  );
}
