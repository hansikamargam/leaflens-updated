"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import BackButton from "@/components/BackButton";

interface Scan {
  id: string;
  plant?: string;
  disease?: string;
  confidence?: number;
  createdAt?: any;
}

export default function HistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        // User is not logged in
        if (!currentUser) {
          setScans([]);
          setLoading(false);
          return;
        }

        try {
          // User-specific scans collection
          const scansRef = collection(
            db,
            "users",
            currentUser.uid,
            "scans"
          );

          const scansQuery = query(
            scansRef,
            orderBy("createdAt", "desc")
          );

          const snapshot = await getDocs(scansQuery);

          const scanData: Scan[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setScans(scanData);
        } catch (error) {
          console.error(
            "Error loading scan history:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-green-50 py-6">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6">
        <BackButton />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">

        {/* Header */}
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
            Your Plant Scans
          </span>

          <h1 className="text-5xl font-bold text-green-900 mt-6">
            Scan History
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            View your previous plant scans and track your plant
            health over time.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-16 text-center">

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                border
                border-green-100
                p-10
                max-w-2xl
                mx-auto
              "
            >

              <div className="text-4xl">
                🌿
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-5">
                Loading your scan history...
              </h2>

              <p className="mt-3 text-gray-600">
                Please wait...
              </p>

            </div>

          </div>
        )}

        {/* Not Logged In */}
        {!loading && !user && (
          <div className="mt-16 max-w-2xl mx-auto">

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                border
                border-green-100
                p-10
                text-center
              "
            >

              <div
                className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >
                <span className="text-4xl">
                  🔐
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-6">
                Login Required
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                Your scan history is available only to registered
                LeafLens users. Please log in to view your previous
                scans and save new plant health results.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                <a
                  href="/login"
                  className="
                    bg-green-700
                    text-white
                    px-7
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-green-800
                    hover:scale-105
                    hover:shadow-md
                    active:scale-95
                    transition-all
                    duration-200
                  "
                >
                  Login
                </a>

                <a
                  href="/register"
                  className="
                    border
                    border-green-700
                    text-green-700
                    px-7
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-green-50
                    hover:scale-105
                    hover:shadow-md
                    active:scale-95
                    transition-all
                    duration-200
                  "
                >
                  Create Account
                </a>

              </div>

            </div>

          </div>
        )}

        {/* Logged In - No Scans */}
        {!loading && user && scans.length === 0 && (
          <div className="mt-16">

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                border
                border-green-100
                p-12
                text-center
                max-w-3xl
                mx-auto
              "
            >

              <div className="text-6xl">
                🌱
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-6">
                No scans yet
              </h2>

              <p
                className="
                  mt-4
                  text-gray-600
                  max-w-lg
                  mx-auto
                  leading-7
                "
              >
                You haven't scanned any plants yet. Start your
                first scan to check your plant's health. Your
                results will appear here for future reference.
              </p>

              <a
                href="/predict"
                className="
                  inline-block
                  mt-8
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
                  duration-200
                "
              >
                🌿 Scan Your First Plant
              </a>

            </div>

          </div>
        )}

        {/* Logged In - Has Scans */}
        {!loading && user && scans.length > 0 && (
          <div className="mt-12">

            {/* Section Heading */}
            <div className="mb-6">

              <h2 className="text-2xl font-bold text-green-900">
                Your Previous Scans
              </h2>

              <p className="text-gray-600 mt-1">
                {scans.length} scan
                {scans.length !== 1 ? "s" : ""} found
              </p>

            </div>

            {/* Scan Cards */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    border
                    border-green-100
                    p-6
                    hover:shadow-lg
                    transition
                  "
                >

                  <div className="text-4xl mb-4">
                    🌿
                  </div>

                  <h3 className="text-xl font-bold text-green-900">
                    {scan.plant || "Plant Scan"}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Disease:{" "}
                    <span className="font-semibold">
                      {scan.disease || "Not available"}
                    </span>
                  </p>

                  {scan.confidence !== undefined && (
                    <p className="text-gray-600 mt-2">
                      Confidence:{" "}
                      <span className="font-semibold">
                        {scan.confidence}%
                      </span>
                    </p>
                  )}

                  {scan.createdAt && (
                    <p className="text-sm text-gray-400 mt-4">
                      {scan.createdAt?.toDate
                        ? scan.createdAt
                            .toDate()
                            .toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  )}

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </main>
  );
}