import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// University image mapping with fallback
export function getUniversityImage(universityName: string): string {
  // Use picsum.photos for reliable, consistent university/campus-style images
  // Each university will always get the same image based on its name
  return `https://picsum.photos/seed/${encodeURIComponent(universityName)}/800/400`;
}