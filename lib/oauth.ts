import { GitHub, Google } from "arctic";

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID ?? "",
  process.env.GITHUB_CLIENT_SECRET ?? "",
  "https://eurekahacks.ca/login/github/callback",
);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID ?? "",
  process.env.GOOGLE_CLIENT_SECRET ?? "",
  "https://eurekahacks.ca/login/google/callback",
);
