"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        flex
        items-center
        gap-2
        text-green-700
        font-semibold
        cursor-pointer
        hover:text-green-900
        hover:-translate-x-1
        transition-all
        duration-200
      "
    >
      ← Back
    </button>
  );
}