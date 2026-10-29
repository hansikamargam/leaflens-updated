import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-green-700 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center">

        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to Check Your Plant?
        </h2>

        <p className="mt-4 text-green-100 text-base sm:text-lg max-w-2xl mx-auto">
          Upload a leaf image and let LeafLens AI help you identify
          possible plant diseases and understand how to manage them.
        </p>

        <Link
          href="/predict"
          className="
            inline-block
            mt-8
            bg-white
            text-green-700
            px-8
            py-3
            rounded-xl
            font-semibold
            hover:bg-green-50
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
          "
        >
          🌿 Start Detection
        </Link>

      </div>
    </section>
  );
}