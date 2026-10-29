import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-16 sm:py-20 lg:py-24">
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-8
          flex
          flex-col-reverse
          lg:flex-row
          items-center
          justify-between
          gap-10
          lg:gap-16
        "
      >
        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">

          {/* AI Badge */}
          <span
            className="
              inline-flex
              items-center
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
              text-sm
              sm:text-base
              font-semibold
              mb-5
            "
          >
            🤖 AI Powered
          </span>

          {/* Heading */}
          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-6xl
              font-extrabold
              text-gray-900
              leading-tight
            "
          >
            Protect Your Crops with{" "}
            <span className="text-green-700">
              LeafLens AI
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              sm:mt-6
              text-base
              sm:text-lg
              text-gray-600
              leading-7
              sm:leading-8
            "
          >
            Detect plant diseases quickly and accurately using
            Artificial Intelligence. Upload a leaf image to receive
            disease prediction, confidence score, plant health
            analysis, and personalized treatment recommendations.
          </p>

          {/* Buttons */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-center
              lg:justify-start
              gap-4
              mt-8
            "
          >
            {/* Start Detection */}
            <Link
              href="/predict"
              className="
                w-full
                sm:w-auto
                text-center
                bg-green-700
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                hover:bg-green-800
                hover:scale-105
                hover:shadow-lg
                active:scale-95
                transition-all
                duration-300
                shadow-lg
              "
            >
              🌿 Start Detection
            </Link>

            {/* Learn More */}
            <a
              href="#about"
              className="
                w-full
                sm:w-auto
                text-center
                border-2
                border-green-700
                text-green-700
                px-8
                py-3
                rounded-xl
                font-semibold
                hover:bg-green-700
                hover:text-white
                hover:scale-105
                hover:shadow-lg
                active:scale-95
                transition-all
                duration-300
              "
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full flex justify-center">

          {/* Background Glow */}
          <div
            className="
              absolute
              inset-0
              bg-green-200
              rounded-full
              blur-3xl
              opacity-30
            "
          ></div>

          {/* Image Card */}
          <div
            className="
              relative
              bg-white
              rounded-3xl
              shadow-2xl
              p-4
              sm:p-6
            "
          >
            <Image
              src="/logo.jpeg"
              alt="LeafLens AI"
              width={430}
              height={430}
              priority
              className="
                rounded-2xl
                w-64
                sm:w-80
                lg:w-[430px]
                h-auto
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}