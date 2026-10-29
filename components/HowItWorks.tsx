export default function HowItWorks() {
  const steps = [
    {
      icon: "📷",
      title: "Upload Leaf Image",
      description:
        "Upload a clear image of your plant leaf using your gallery or camera."
    },
    {
      icon: "🤖",
      title: "AI Analysis",
      description:
        "Our AI model analyzes the leaf pattern and identifies possible diseases."
    },
    {
      icon: "🔍",
      title: "Disease Detection",
      description:
        "LeafLens predicts the disease with confidence score and plant health analysis."
    },
    {
      icon: "💊",
      title: "Treatment Suggestions",
      description:
        "Get prevention methods and smart recommendations to protect your plant."
    }
  ];


  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">


        {/* Heading */}

        <div className="text-center mb-14">

          <h2 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-green-900
          ">
            How LeafLens Works
          </h2>


          <p className="
          mt-4
          text-gray-600
          max-w-2xl
          mx-auto
          ">
            Detect plant diseases in four simple steps using
            artificial intelligence.
          </p>

        </div>





        {/* Steps */}

        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8
        ">


          {steps.map((step,index)=>(

            <div
              key={index}
              className="
              bg-green-50
              rounded-3xl
              p-8
              text-center
              hover:shadow-xl
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >


              <div className="
              text-5xl
              mb-5
              ">
                {step.icon}
              </div>



              <h3 className="
              text-xl
              font-bold
              text-green-800
              ">
                {step.title}
              </h3>



              <p className="
              mt-3
              text-gray-600
              leading-7
              ">
                {step.description}
              </p>


            </div>

          ))}


        </div>


      </div>

    </section>
  );
}