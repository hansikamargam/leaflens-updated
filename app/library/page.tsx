"use client";

import { useMemo, useState } from "react";
import DiseaseCard from "@/components/DiseaseCard";
import { diseases } from "@/data/diseases";

export default function DiseaseLibrary() {
  const [search, setSearch] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("All");

  // Get unique plant names
  const plants = [
    "All",
    ...new Set(diseases.map((d) => d.plant)),
  ];

  // Filter diseases
  const filteredDiseases = useMemo(() => {
    return diseases.filter((disease) => {
      const matchesSearch =
        disease.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        disease.plant
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesPlant =
        selectedPlant === "All" ||
        disease.plant === selectedPlant;

      return matchesSearch && matchesPlant;
    });
  }, [search, selectedPlant]);

  return (
    <main className="min-h-screen bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Plant Disease Encyclopedia
          </span>

          <h1 className="text-5xl font-bold text-green-900 mt-6">
            Disease Library
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Explore common plant diseases, understand their causes,
            symptoms, treatments, and preventive measures to keep
            your plants healthy.
          </p>
        </div>

        {/* Search */}
        <div className="mt-12 flex justify-center">
          <input
            type="text"
            placeholder="Search diseases or plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              max-w-xl
              rounded-xl
              border
              border-green-300
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
            "
          />
        </div>

        {/* Plant Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {plants.map((plant) => (
            <button
              key={plant}
              onClick={() => setSelectedPlant(plant)}
              className={`
                px-5
                py-2
                rounded-full
                font-semibold
                border
                transition-all
                duration-200
                cursor-pointer

                ${
                  selectedPlant === plant
                    ? "bg-green-700 text-white border-green-700 shadow-md"
                    : "bg-white text-green-700 border-green-300 hover:bg-green-600 hover:text-white hover:border-green-600 hover:shadow-md"
                }
              `}
            >
              {plant}
            </button>
          ))}
        </div>

        {/* Disease Cards */}
        {filteredDiseases.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold text-gray-700">
              No diseases found
            </h2>

            <p className="mt-3 text-gray-500">
              Try another search keyword.
            </p>
          </div>
        ) : (
          <div
            className="
              mt-16
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {filteredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.slug}
                disease={disease}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}