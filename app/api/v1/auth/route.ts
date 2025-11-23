import { NextRequest, NextResponse } from "next/server";

// Example error messages in English and Arabic
const errorMessages = {
  en: {
    missingFields: "Required fields are missing.",
    serverError: "Internal server error.",
    unauthorized: "Unauthorized access.",
  },
  ar: {
    missingFields: "الحقول المطلوبة مفقودة.",
    serverError: "خطأ في الخادم الداخلي.",
    unauthorized: "دخول غير مصرح به.",
  },
};

// Helper to get error message by language
function getErrorMessage(key: keyof typeof errorMessages["en"], lang: "en" | "ar" = "en") {
  return errorMessages[lang][key] || errorMessages["en"][key];
}

/**
 * POST /api/v1/auth
 * Authenticates a user.
 * 
 * Request Body:
 *   - username (string, required): The user's username.
 *   - password (string, required): The user's password.
 * 
 * Headers:
 *   - accept-language (string, optional): Used to determine error message language ("en" or "ar").
 * 
 * Response:
 *   - 200: { message: "Login successful." }
 *   - 400: { error: "Required fields are missing." }
 *   - 401: { error: "Unauthorized access." }
 *   - 500: { error: "Internal server error." }
 */
export async function POST(req: NextRequest) {
  try {
    const lang = req.headers.get("accept-language")?.startsWith("ar") ? "ar" : "en";
    const body = await req.json();

    // Example: Check for required fields
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: getErrorMessage("missingFields", lang) },
        { status: 400 }
      );
    }

    // Example: Dummy authentication logic
    if (body.username !== "admin" || body.password !== "password") {
      return NextResponse.json(
        { error: getErrorMessage("unauthorized", lang) },
        { status: 401 }
      );
    }

    // Success response
    return NextResponse.json({ message: "Login successful." });
  } catch (error) {
    const lang = req.headers.get("accept-language")?.startsWith("ar") ? "ar" : "en";
    return NextResponse.json(
      { error: getErrorMessage("serverError", lang) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/v1/auth
 * Health check endpoint for the auth API.
 * 
 * Request Body: None
 * 
 * Response:
 *   - 200: { message: "Auth API route is working." }
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Auth API route is working." });
}