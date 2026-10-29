import Link from "next/link";
import { Disease } from "@/data/diseases";

interface DiseaseCardProps {
  disease: Disease;
}

export default function DiseaseCard({
  disease,
}: DiseaseCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        overflow-hidden
        border
        border-green-100
      "
    >
      {/* Disease Image */}
      <div className="h-52 bg-green-100 overflow-hidden">
        <img
          src={disease.image}
          alt={disease.name}
          className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition-transform
            duration-300
          "
        />
      </div>

      <div className="p-6">

        {/* Disease Name */}
        <h2 className="text-2xl font-bold text-green-800">
          {disease.name}
        </h2>

        {/* Plant */}
        <p className="mt-2 text-gray-600">
          <span className="font-semibold">
            Plant:
          </span>{" "}
          {disease.plant}
        </p>

        {/* Severity */}
        <div className="mt-4">
          <span
            className={`
              inline-block
              px-4
              py-1
              rounded-full
              text-sm
              font-semibold
              ${
                disease.severity === "High"
                  ? "bg-red-100 text-red-700"
                  : disease.severity === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }
            `}
          >
            {disease.severity} Severity
          </span>
        </div>

        {/* Overview */}
        <p className="mt-5 text-gray-600 line-clamp-3">
          {disease.overview}
        </p>

        {/* Button */}
        <Link
          href={`/library/${disease.slug}`}
          className="
            inline-block
            mt-6
            bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-green-800
            transition
          "
        >
          View Details →
        </Link>

      </div>
    </div>
  );
}