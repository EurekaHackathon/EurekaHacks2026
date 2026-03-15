import { generateState } from "arctic";
import { github } from "@/lib/oauth";
import { cookies } from "next/headers";

export async function POST(): Promise<Response> {
  const state = generateState();
  const url = github.createAuthorizationURL(state, ["read:user"]);

  (await cookies()).set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.json({ url });
}
