import Link from "next/link";
import { notFound } from "next/navigation";
import { diseases } from "@/data/diseases";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DiseaseDetails({
  params,
}: PageProps) {
  const { slug } = await params;

  const disease = diseases.find(
    (item) => item.slug === slug
  );

  if (!disease) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-green-50 py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Back Button */}
        <Link
          href="/library"
          className="inline-flex items-center text-green-700 font-semibold hover:text-green-900 transition"
        >
          ← Back to Disease Library
        </Link>

        {/* Header */}
        <div className="mt-8 grid lg:grid-cols-2 gap-10 items-start">

          {/* Disease Image */}
          <div className="bg-white rounded-3xl shadow-lg p-5">
            <img
              src={disease.image}
              alt={disease.name}
              className="rounded-2xl w-full h-auto"
            />
          </div>

          {/* Disease Information */}
          <div>

            <p className="text-green-700 font-semibold text-lg">
              {disease.plant}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              {disease.name}
            </h1>

            {/* Severity */}
            <div className="mt-5">
              <span
                className={`inline-block px-5 py-2 rounded-full font-semibold ${
                  disease.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : disease.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {disease.severity} Severity
              </span>
            </div>

            {/* Overview */}
            <div className="mt-7 bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-green-800">
                Overview
              </h2>

              <p className="mt-3 text-gray-600 leading-7">
                {disease.overview}
              </p>
            </div>

            {/* Cause */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-green-800">
                Cause
              </h2>

              <p className="mt-3 text-gray-600 leading-7">
                {disease.cause}
              </p>
            </div>

          </div>
        </div>

        {/* Early Symptoms */}
        <section className="mt-10 bg-white rounded-3xl shadow p-8">
          <h2 className="text-3xl font-bold text-green-800">
            Early Symptoms
          </h2>

          <ul className="mt-5 space-y-3">
            {disease.earlySymptoms.map((symptom, index) => (
              <li
                key={index}
                className="flex gap-3 text-gray-700"
              >
                <span className="text-green-600 font-bold">
                  ✓
                </span>
                {symptom}
              </li>
            ))}
          </ul>
        </section>

        {/* Advanced Symptoms */}
        <section className="mt-6 bg-white rounded-3xl shadow p-8">
          <h2 className="text-3xl font-bold text-red-700">
            Advanced Symptoms
          </h2>

          <ul className="mt-5 space-y-3">
            {disease.advancedSymptoms.map((symptom, index) => (
              <li
                key={index}
                className="flex gap-3 text-gray-700"
              >
                <span className="text-red-600 font-bold">
                  !
                </span>
                {symptom}
              </li>
            ))}
          </ul>
        </section>

        {/* Treatment */}
        <section className="mt-6 bg-white rounded-3xl shadow p-8">
          <h2 className="text-3xl font-bold text-green-800">
            Treatment
          </h2>

          <ul className="mt-5 space-y-3">
            {disease.treatment.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-gray-700"
              >
                <span className="text-green-600 font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Prevention */}
        <section className="mt-6 bg-white rounded-3xl shadow p-8">
          <h2 className="text-3xl font-bold text-green-800">
            Prevention
          </h2>

          <ul className="mt-5 space-y-3">
            {disease.prevention.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-gray-700"
              >
                <span className="text-green-600 font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Recovery */}
        <section className="mt-6 bg-green-100 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-green-800">
            Recovery Chances
          </h2>

          <p className="mt-4 text-gray-700 leading-7">
            {disease.recovery}
          </p>
        </section>

        {/* Related Diseases */}
        {disease.relatedDiseases.length > 0 && (
         <section className="mt-10">
  <h2 className="text-3xl font-bold text-green-800">
    Related Diseases
  </h2>

  <div className="mt-5 flex flex-wrap gap-3">
    {disease.relatedDiseases.map((related, index) => {
      const relatedDisease = diseases.find(
        (item) =>
          item.name.toLowerCase() === related.toLowerCase() ||
          item.slug.toLowerCase() === related.toLowerCase()
      );

      if (!relatedDisease) {
        return null;
      }

      return (
        <Link
          key={index}
          href={`/library/${relatedDisease.slug}`}
          className="bg-white shadow px-5 py-3 rounded-full text-green-700 font-semibold hover:bg-green-700 hover:text-white transition"
        >
          {relatedDisease.name} →
        </Link>
      );
    })}
  </div>
</section>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/library"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            ← Back to Disease Library
          </Link>
        </div>

      </div>
    </main>
  );
}