export default function DiseasePreview() {

  const diseases = [
    {
      emoji: "🍅",
      name: "Tomato Early Blight",
      description:
        "A fungal disease causing dark spots and yellowing of tomato leaves."
    },
    {
      emoji: "🍎",
      name: "Apple Scab",
      description:
        "A common disease affecting apple leaves with dark lesions."
    },
    {
      emoji: "🌽",
      name: "Corn Rust",
      description:
        "A fungal infection that appears as rust-colored spots on corn leaves."
    },
    {
      emoji: "🍇",
      name: "Grape Black Rot",
      description:
        "A disease causing black spots and damage to grape plants."
    },
    {
      emoji: "🥔",
      name: "Potato Blight",
      description:
        "A serious disease affecting potato leaves and crop health."
    },
    {
      emoji: "🌱",
      name: "Healthy Leaf",
      description:
        "A healthy plant leaf with no visible disease symptoms."
    }
  ];



  return (

    <section className="py-20 bg-green-50">


      <div className="
      max-w-7xl
      mx-auto
      px-6
      ">


        {/* Heading */}

        <div className="text-center mb-14">


          <h2 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-green-900
          ">

            Explore Plant Diseases

          </h2>


          <p className="
          mt-4
          text-gray-600
          max-w-2xl
          mx-auto
          ">

            Learn about common plant diseases detected by LeafLens AI.

          </p>


        </div>





        {/* Cards */}

        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
        ">


          {diseases.map((disease,index)=>(


            <div
  key={index}
  className="
  bg-white
  rounded-3xl
  p-8
  shadow-sm
  cursor-pointer
  hover:shadow-xl
  hover:-translate-y-2
  hover:bg-green-50
  transition-all
  duration-300
  "
>


              <div className="
              text-6xl
              mb-5
              text-center
              ">
                {disease.emoji}
              </div>



              <h3 className="
              text-xl
              font-bold
              text-green-800
              text-center
              ">

                {disease.name}

              </h3>



              <p className="
              mt-3
              text-gray-600
              text-center
              leading-7
              ">

                {disease.description}

              </p>


            </div>


          ))}



        </div>






        {/* Button */}

        <div className="
        text-center
        mt-12
        ">


          <a
            href="/library"
            className="
            inline-block
            bg-green-700
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            hover:bg-green-800
            hover:scale-105
            transition-all
            duration-300
            "
          >

            View Disease Library

          </a>


        </div>



      </div>


    </section>

  );

}