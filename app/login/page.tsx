"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");

      router.push("/");
    } catch (error: any) {
      console.error("Firebase login error:", error);

      if (error.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(error.message || "Login failed. Please try again.");
      }
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

      {/* Login Card */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-green-700">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Login to continue using LeafLens.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

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

            {error && (
              <p className="text-red-600 text-sm text-center">
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
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-700 font-semibold"
            >
              Register
            </a>
          </p>

        </div>
      </div>

    </main>
  );
}