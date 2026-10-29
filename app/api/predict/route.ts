import { NextResponse } from "next/server";

export async function POST() {

  // Temporary Dummy Response

  const isPlant = true;

  if (!isPlant) {
    return NextResponse.json({
      success: false,
      message: "No plant leaf detected. Please upload a valid leaf image.",
    });
  }

  return NextResponse.json({
    success: true,
    disease: "Tomato Early Blight",
    confidence: 98.1,
    healthScore: 84,
  });
}