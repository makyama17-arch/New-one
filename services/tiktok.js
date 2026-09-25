export async function postToTikTok({
  accessToken,
  videoPath,
  title = ""
}) {
  if (!accessToken) {
    throw new Error("TikTok account is not connected.");
  }

  if (!videoPath) {
    throw new Error("TikTok video file is required.");
  }

  /*
   * TikTok Direct Post requires the official Content Posting
   * API and the required product scopes/approval.
   */

  return {
    ok: false,
    platform: "tiktok",
    status: "not_configured",
    message: "TikTok Content Posting API authorization is required."
  };
}
