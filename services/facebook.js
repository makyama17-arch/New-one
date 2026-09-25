export async function postToFacebook({
  accessToken,
  videoUrl,
  description = ""
}) {
  if (!accessToken) {
    throw new Error("Facebook account is not connected.");
  }

  if (!videoUrl) {
    throw new Error("Facebook video URL is required.");
  }

  /*
   * Official Meta API integration goes here.
   *
   * We intentionally do not pretend that a normal Facebook
   * username/password login can be used as an API token.
   */

  return {
    ok: false,
    platform: "facebook",
    status: "not_configured",
    message: "Facebook OAuth/API authorization is required."
  };
}
