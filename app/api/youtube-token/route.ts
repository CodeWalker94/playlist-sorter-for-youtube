import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();
  const oauthRes = await client.users.getUserOauthAccessToken(
    userId,
    "oauth_google",
  );
  const oauthToken = oauthRes.data[0];

  if (!oauthToken?.token) {
    return NextResponse.json(
      { error: "No Google OAuth token found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ token: oauthToken.token });
}
