"use client";

import { useEffect, useRef, useState } from "react";
import BackButton from "@/components/BackButton";

interface Prediction {
  disease: string;
  confidence: number;
}

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // -----------------------------
  // Handle gallery image
  // -----------------------------
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic image validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Stop camera if running
    closeCamera();

    // Remove old preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(url);
    setPredictions([]);
    setError("");
  };

  // -----------------------------
  // Open camera
  // -----------------------------
  const openCamera = async () => {
    try {
      setError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera access is not supported by this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error("Camera error:", error);

      setError(
        "Unable to access the camera. Please allow camera permission and try again."
      );
    }
  };

  // -----------------------------
  // Close camera
  // -----------------------------
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  };

  // -----------------------------
  // Capture image from camera
  // -----------------------------
  const captureImage = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setError("Camera is not ready yet. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Unable to capture the image.");
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Unable to create the captured image.");
          return;
        }

        const file = new File(
          [blob],
          "camera-scan.jpg",
          {
            type: "image/jpeg",
          }
        );

        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }

        const url = URL.createObjectURL(file);

        setSelectedFile(file);
        setPreviewUrl(url);
        setPredictions([]);
        setError("");

        closeCamera();
      },
      "image/jpeg",
      0.95
    );
  };

  // -----------------------------
  // Analyze image
  // -----------------------------
  const analyzePlant = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setPredictions([]);
    setError("");

    try {
      const formData = new FormData();

      // MUST match Flask:
      // request.files["image"]
      formData.append("image", selectedFile);
      console.log("FILE SENT TO BACKEND:", selectedFile.name, selectedFile.size, selectedFile.type);
      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      // Check HTTP response
      if (!response.ok) {
        throw new Error(
          `Backend error: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("LeafLens backend response:", data);

      if (!data.success) {
        throw new Error(
          data.error ||
            data.message ||
            "Unable to analyze the image."
        );
      }

      if (
        !data.predictions ||
        !Array.isArray(data.predictions) ||
        data.predictions.length === 0
      ) {
        throw new Error(
          "The AI model could not find a confident prediction."
        );
      }

      setPredictions(data.predictions);
    } catch (error) {
      console.error("Prediction error:", error);

      if (error instanceof TypeError) {
        setError(
          "Unable to connect to the LeafLens AI backend. Make sure Flask is running on port 5000."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Unable to analyze the image."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Remove image
  // -----------------------------
  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setPredictions([]);
    setError("");
  };

  // -----------------------------
  // Cleanup
  // -----------------------------
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <main className="min-h-screen bg-green-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Heading */}
        <div className="text-center">

          <span
            className="
              inline-block
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
              font-semibold
            "
          >
            AI Powered
          </span>

          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-green-900
              mt-6
            "
          >
            Scan Your Plant
          </h1>

          <p
            className="
              mt-4
              text-gray-600
              text-lg
              max-w-2xl
              mx-auto
              leading-7
            "
          >
            Upload a clear photo of your plant leaf and
            LeafLens will analyze it for possible diseases.
          </p>

        </div>

        {/* Main Card */}
        <div className="mt-10 max-w-2xl mx-auto">

          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              border
              border-green-100
              p-8
              md:p-10
            "
          >

            {/* ========================= */}
            {/* CAMERA */}
            {/* ========================= */}

            {cameraOpen ? (

              <div>

                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    bg-black
                  "
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="
                      w-full
                      aspect-video
                      object-cover
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    mt-5
                  "
                >

                  <button
                    type="button"
                    onClick={captureImage}
                    className="
                      flex-1
                      bg-green-700
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      hover:bg-green-800
                      hover:shadow-md
                      transition-all
                    "
                  >
                    Capture Image
                  </button>

                  <button
                    type="button"
                    onClick={closeCamera}
                    className="
                      flex-1
                      border-2
                      border-gray-300
                      text-gray-700
                      py-3
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      hover:bg-gray-100
                      transition-all
                    "
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ) : previewUrl ? (

              /* ========================= */
              /* IMAGE PREVIEW */
              /* ========================= */

              <div>

                <div className="text-center">

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Image Preview
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Make sure the leaf is clearly visible.
                  </p>

                </div>

                {/* Image */}
                <div
                  className="
                    mt-6
                    rounded-2xl
                    overflow-hidden
                    border
                    border-green-100
                    bg-gray-50
                  "
                >
                  <img
                    src={previewUrl}
                    alt="Selected plant leaf"
                    className="
                      w-full
                      max-h-[400px]
                      object-contain
                    "
                  />
                </div>

                {/* File Name */}
                <p
                  className="
                    text-center
                    text-sm
                    text-gray-500
                    mt-4
                    break-words
                  "
                >
                  {selectedFile?.name}
                </p>

                {/* Choose / Remove */}
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    mt-6
                  "
                >

                  <label
                    className="
                      flex-1
                      text-center
                      border-2
                      border-green-700
                      text-green-700
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      hover:bg-green-700
                      hover:text-white
                      transition-all
                    "
                  >
                    Choose Another

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={removeImage}
                    className="
                      flex-1
                      border-2
                      border-red-500
                      text-red-600
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      hover:bg-red-50
                      transition-all
                    "
                  >
                    Remove Image
                  </button>

                </div>

                {/* Analyze */}
                <button
                  type="button"
                  onClick={analyzePlant}
                  disabled={loading}
                  className="
                    w-full
                    mt-6
                    bg-green-700
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    cursor-pointer
                    hover:bg-green-800
                    hover:shadow-lg
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    disabled:hover:scale-100
                    transition-all
                  "
                >
                  {loading
                    ? "Analyzing..."
                    : "Analyze Plant"}
                </button>

                {/* Error */}
                {error && (
                  <div
                    className="
                      mt-6
                      bg-red-50
                      border
                      border-red-200
                      rounded-xl
                      p-4
                      text-center
                    "
                  >
                    <p className="text-red-700 font-medium">
                      {error}
                    </p>
                  </div>
                )}

                {/* ========================= */}
                {/* RESULTS */}
                {/* ========================= */}

                {predictions.length > 0 && (

                  <div className="mt-8">

                    <div
                      className="
                        bg-green-50
                        border
                        border-green-200
                        rounded-2xl
                        p-6
                      "
                    >

                      <div className="text-center">

                        <div
                          className="
                            inline-flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            bg-green-100
                            text-green-700
                            rounded-full
                            mb-4
                            text-2xl
                            font-bold
                          "
                        >
                          ✓
                        </div>

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-green-900
                          "
                        >
                          Prediction Successful!
                        </h2>

                        <p className="text-gray-600 mt-2">
                          LeafLens analyzed your image.
                        </p>

                      </div>

                      {/* Predictions */}
                      <div className="mt-6 space-y-4">

                        {predictions.map(
                          (prediction, index) => (

                            <div
                              key={`${prediction.disease}-${index}`}
                              className="
                                bg-white
                                rounded-xl
                                border
                                border-green-100
                                p-4
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-4
                                "
                              >

                                <div>

                                  <p
                                    className="
                                      text-sm
                                      text-gray-500
                                    "
                                  >
                                    {index === 0
                                      ? "Top Prediction"
                                      : "Alternative Prediction"}
                                  </p>

                                  <p
                                    className="
                                      text-lg
                                      font-bold
                                      text-gray-900
                                      mt-1
                                    "
                                  >
                                    {prediction.disease}
                                  </p>

                                </div>

                                <div className="text-right">

                                  <p
                                    className="
                                      text-lg
                                      font-bold
                                      text-green-700
                                    "
                                  >
                                    {prediction.confidence}%
                                  </p>

                                  <p
                                    className="
                                      text-xs
                                      text-gray-500
                                    "
                                  >
                                    Confidence
                                  </p>

                                </div>

                              </div>

                              {/* Confidence Bar */}
                              <div
                                className="
                                  mt-3
                                  h-2
                                  bg-gray-200
                                  rounded-full
                                  overflow-hidden
                                "
                              >
                                <div
                                  className="
                                    h-full
                                    bg-green-600
                                    rounded-full
                                  "
                                  style={{
                                    width: `${Math.min(
                                      Math.max(
                                        prediction.confidence,
                                        0
                                      ),
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                )}

              </div>

            ) : (

              /* ========================= */
              /* UPLOAD AREA */
              /* ========================= */

              <div>

                <div className="text-center">

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Upload Your Leaf Image
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Choose an image from your device
                    or use your camera.
                  </p>

                </div>

                {/* Buttons */}
                <div
                  className="
                    mt-8
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    gap-4
                  "
                >

                  {/* Choose Image */}
                  <label
                    className="
                      flex-1
                      text-center
                      bg-green-700
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      hover:bg-green-800
                      hover:shadow-md
                      hover:scale-[1.02]
                      active:scale-[0.98]
                      transition-all
                    "
                  >
                    Choose Image

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {/* Camera */}
                  <button
                    type="button"
                    onClick={openCamera}
                    className="
                      flex-1
                      border-2
                      border-green-700
                      text-green-700
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      hover:bg-green-700
                      hover:text-white
                      hover:shadow-md
                      hover:scale-[1.02]
                      active:scale-[0.98]
                      transition-all
                    "
                  >
                    Open Camera
                  </button>

                </div>

                {/* Formats */}
                <p
                  className="
                    text-sm
                    text-gray-400
                    text-center
                    mt-5
                  "
                >
                  Supported formats: JPG, JPEG, PNG
                </p>

              </div>

            )}

          </div>

        </div>

      </div>
    </main>
  );
}