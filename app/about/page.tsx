"use client";

export default function About() {
  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-5xl font-bold text-green-900 leading-tight">
              About <span className="text-green-700">LeafLens</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              LeafLens is an AI-powered plant health assistant designed
              to detect plant diseases, analyze leaf conditions, and provide
              smart recommendations using advanced artificial intelligence.
            </p>

            <p className="mt-4 text-lg text-gray-600">
              Detect. Understand. Protect your plants with AI.
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-10
              flex
              justify-center
              items-center
            "
          >
            <div
              className="
                w-72
                h-72
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
                text-8xl
              "
            >
              🌱
            </div>
          </div>

        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-green-900">
            The Problem We Solve
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
            Plant diseases can significantly reduce crop productivity
            when they are not identified at an early stage. Traditional
            disease detection methods require expert knowledge and
            manual inspection, making it difficult for many users to
            identify problems quickly.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="p-8 rounded-2xl bg-green-50">
              <h3 className="text-xl font-bold text-green-800">
                🌱 Late Detection
              </h3>

              <p className="mt-3 text-gray-600">
                Diseases often spread before they are recognized.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-green-50">
              <h3 className="text-xl font-bold text-green-800">
                👨‍🌾 Expert Dependency
              </h3>

              <p className="mt-3 text-gray-600">
                Manual identification requires agricultural expertise.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-green-50">
              <h3 className="text-xl font-bold text-green-800">
                ⏳ Time Consuming
              </h3>

              <p className="mt-3 text-gray-600">
                Traditional methods take more time for diagnosis.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-green-900">
            How LeafLens Helps
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-12">

            {[
              {
                icon: "📷",
                title: "Upload Image",
                text: "Upload a leaf image from gallery or camera.",
              },
              {
                icon: "🤖",
                title: "AI Analysis",
                text: "Deep learning models analyze plant patterns.",
              },
              {
                icon: "🔍",
                title: "Disease Detection",
                text: "Identify diseases with confidence scores.",
              },
              {
                icon: "💊",
                title: "Smart Suggestions",
                text: "Get treatment and prevention guidance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  bg-white
                  p-6
                  rounded-2xl
                  shadow-sm
                "
              >
                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="mt-4 font-bold text-green-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-900">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            {[
              "AI Disease Detection",
              "Plant Health Score",
              "Confidence Based Prediction",
              "Disease Information",
              "Treatment Suggestions",
              "Scan History",
              "Disease Library",
              "Before & After Comparison",
              "Follow-up Monitoring",
            ].map((feature) => (
              <div
                key={feature}
                className="
                  border
                  border-green-200
                  rounded-2xl
                  p-6
                  hover:shadow-lg
                  transition
                "
              >
                <h3 className="font-semibold text-green-800">
                  ✓ {feature}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-green-900">
            Powered By Artificial Intelligence
          </h2>

          <div className="mt-10 text-xl font-semibold text-green-700 leading-loose">
            Leaf Image
            <span className="mx-4">↓</span>
            Image Processing
            <span className="mx-4">↓</span>
            CNN / Transfer Learning
            <span className="mx-4">↓</span>
            Disease Prediction
            <span className="mx-4">↓</span>
            Smart Recommendations
          </div>

        </div>
      </section>

      {/* Future Scope */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-green-900">
            Future Vision
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {[
              "🌍 Multi-language Support",
              "🌦 Weather-based Disease Prediction",
              "📱 Mobile Application",
              "🛰 Drone Crop Monitoring",
              "🔊 Voice Assistance",
              "🌱 Smart Agriculture Integration",
            ].map((item) => (
              <div
                key={item}
                className="
                  bg-green-50
                  p-6
                  rounded-xl
                  font-semibold
                "
              >
                {item}
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}