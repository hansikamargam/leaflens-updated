"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Account created successfully!");

      router.push("/login");
    } catch (error: any) {
      console.error("Firebase registration error:", error);

      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <BackButton />
      </div>

      {/* Register Card */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-green-700">
            Create Account
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Register to save your scan history.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {error && (
              <p className="text-red-600 text-sm text-center break-words">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-green-700
                text-white
                py-3
                rounded-lg
                font-semibold
                cursor-pointer
                hover:bg-green-800
                hover:shadow-lg
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-200
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:scale-100
              "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-700 font-semibold"
            >
              Login
            </a>
          </p>

        </div>
      </div>

    </main>
  );
}