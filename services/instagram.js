export async function postToInstagram({
  accessToken,
  videoUrl,
  caption = ""
}) {
  if (!accessToken) {
    throw new Error("Instagram account is not connected.");
  }

  if (!videoUrl) {
    throw new Error("Instagram video URL is required.");
  }

  /*
   * Instagram publishing requires the appropriate
   * Meta authorization and account configuration.
   */

  return {
    ok: false,
    platform: "instagram",
    status: "not_configured",
    message: "Instagram OAuth/API authorization is required."
  };
}
