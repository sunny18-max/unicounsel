import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// University image mapping with fallback
export function getUniversityImage(universityName: string): string {
  // Create a consistent hash from university name for deterministic image selection
  const hash = universityName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Use absolute value to ensure positive number
  const imageIndex = Math.abs(hash) % 20 + 1;
  
  // Use picsum.photos for reliable, consistent university/campus-style images
  // Each university will always get the same image based on its name
  return `https://picsum.photos/seed/${encodeURIComponent(universityName)}/800/400`;
}