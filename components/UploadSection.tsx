"use client";

import { useRef, useState } from "react";

export default function UploadSection() {

  const fileInput = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [isPlant, setIsPlant] = useState<boolean | null>(null);



  const handleUploadClick = () => {
    fileInput.current?.click();
  };



  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;


    setSelectedImage(URL.createObjectURL(file));

    setLoading(true);
    setIsPlant(null);
    setStatus("Checking whether this is a plant image...");



    // Temporary validation
    // Later connect AI model here

    setTimeout(() => {


      const plantDetected = true;


      if (plantDetected) {

        setIsPlant(true);

        setStatus(
          "Plant detected successfully. Ready for scanning."
        );

      } else {

        setIsPlant(false);

        setStatus(
          "This image does not appear to be a plant. Please upload a clear leaf image."
        );

      }


      setLoading(false);


    }, 2000);


  };





  const startScan = () => {

    console.log("Starting disease scan...");

    // Later:
    // router.push("/results")

  };






  return (

    <section
      id="upload"
      className="py-12 sm:py-16 bg-white"
    >


      <div className="
      max-w-5xl
      mx-auto
      px-4
      sm:px-6
      ">



        {/* Heading */}

        <div className="text-center">


          <h2 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-green-900
          ">

            Scan Your Plant

          </h2>



          <p className="
          mt-4
          text-gray-600
          text-sm
          sm:text-base
          ">

            Upload a leaf image or capture one using your camera.

          </p>


        </div>







        {/* Upload Container */}

        <div
          className="
          mt-10
          sm:mt-12
          bg-green-50
          border-2
          border-dashed
          border-green-400
          rounded-3xl
          p-5
          sm:p-12
          text-center
          flex
          flex-col
          items-center
          w-full
          "
        >






          {/* Image Preview */}

          {selectedImage ? (


            <img

              src={selectedImage}

              alt="Selected plant"

              className="
              w-full
              max-w-xs
              aspect-square
              object-cover
              rounded-3xl
              mb-8
              "

            />


          ) : (


            <div

              className="
              w-full
              max-w-xs
              aspect-square
              bg-white
              rounded-3xl
              flex
              flex-col
              items-center
              justify-center
              mb-8
              "

            >


              <span className="text-6xl sm:text-7xl">

                🍃

              </span>



              <p className="mt-4 text-gray-500">

                Upload plant image

              </p>


            </div>


          )}







          <input

            type="file"

            accept="image/*"

            hidden

            ref={fileInput}

            onChange={handleFileChange}

          />







          {/* Buttons */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-5
            w-full
            "
          >



            <button

              onClick={handleUploadClick}

              className="
              w-full
              max-w-xs
              sm:w-44
              h-12
              bg-green-700
              text-white
              rounded-xl
              hover:bg-green-800
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
              "

            >

              Upload Image

            </button>







            <button

              className="
              w-full
              max-w-xs
              sm:w-44
              h-12
              border-2
              border-green-700
              text-green-700
              bg-white
              rounded-xl
              hover:bg-green-700
              hover:text-white
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
              "

            >

              Open Camera

            </button>



          </div>









          {/* Loading */}

          {loading && (


            <p
              className="
              mt-6
              text-green-700
              font-semibold
              "
            >

              {status}

            </p>


          )}









          {/* Plant Detected */}


          {!loading && isPlant === true && (


            <div className="mt-6">


              <p
                className="
                text-green-700
                font-semibold
                "
              >

                ✓ {status}

              </p>




              <button

                onClick={startScan}

                className="
                mt-5
                bg-green-700
                text-white
                px-10
                py-3
                rounded-xl
                hover:bg-green-800
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
                "

              >

                Start Scan

              </button>



            </div>


          )}









          {/* Not Plant */}


          {!loading && isPlant === false && (


            <p

              className="
              mt-6
              text-red-600
              font-semibold
              "

            >

              ❌ {status}

            </p>


          )}




        </div>



      </div>


    </section>


  );

}