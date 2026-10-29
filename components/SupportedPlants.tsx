const plants = [
  {
    name: "Tomato",
    emoji: "🍅",
    description: "Detect common tomato leaf diseases.",
  },
  {
    name: "Apple",
    emoji: "🍎",
    description: "Identify common apple leaf diseases.",
  },
  {
    name: "Corn",
    emoji: "🌽",
    description: "Check corn leaves for disease symptoms.",
  },
  {
    name: "Grape",
    emoji: "🍇",
    description: "Detect common grape leaf diseases.",
  },
  {
    name: "Potato",
    emoji: "🥔",
    description: "Identify common potato leaf diseases.",
  },
];

export default function SupportedPlants() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-green-700 font-semibold">
            🌱 Supported Plants
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Protect Your Plants with LeafLens
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            LeafLens can help identify diseases in several commonly grown
            plants using AI-powered image analysis.
          </p>
        </div>

        {/* Plant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {plants.map((plant) => (
            <div
              key={plant.name}
              className="
                bg-green-50
                rounded-2xl
                p-6
                text-center
                border
                border-green-100
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-4">
                {plant.emoji}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {plant.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {plant.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}