import {
  formatErrorResponse,
  formatResponse,
  routeErrorHandler,
} from "@/lib/api-response-handler";
import { db } from "@/lib/db";

/**
 * Handles a POST request.
 * @param request - The incoming request object.
 * @returns A formatted response or error.
 */
export async function GET() {
  try {
    const users = await db.user.findMany({});
    if (false) {
      return formatErrorResponse("Something good", 403);
    }
    return formatResponse(users, "Data fetched successfully");
  } catch (error) {
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
