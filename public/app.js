const serverStatus = document.getElementById("serverStatus");
const postButton = document.getElementById("postButton");
const message = document.getElementById("message");
const results = document.getElementById("results");

async function checkServer() {
  try {
    const response = await fetch("/health");

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    if (data.ok) {
      serverStatus.textContent = "Online";
    } else {
      serverStatus.textContent = "Offline";
    }

  } catch (error) {
    serverStatus.textContent = "Offline";
  }
}


async function loadAccounts() {
  try {
    const response = await fetch("/api/status");

    if (!response.ok) return;

    const data = await response.json();

    updateAccount(
      "facebookStatus",
      data.facebook?.connected
    );

    updateAccount(
      "instagramStatus",
      data.instagram?.connected
    );

    updateAccount(
      "youtubeStatus",
      data.youtube?.connected
    );

    updateAccount(
      "tiktokStatus",
      data.tiktok?.connected
    );

  } catch (error) {
    console.error(error);
  }
}


function updateAccount(id, connected) {
  const element = document.getElementById(id);

  if (!element) return;

  element.textContent = connected
    ? "Connected"
    : "Not connected";
}


function selectedPlatforms() {
  const platforms = [];

  if (
    document.getElementById("facebook").checked
  ) {
    platforms.push("facebook");
  }

  if (
    document.getElementById("instagram").checked
  ) {
    platforms.push("instagram");
  }

  if (
    document.getElementById("youtube").checked
  ) {
    platforms.push("youtube");
  }

  if (
    document.getElementById("tiktok").checked
  ) {
    platforms.push("tiktok");
  }

  return platforms;
}


function showResults(items) {
  if (!Array.isArray(items) || !items.length) {
    results.textContent = "No results.";
    return;
  }

  results.innerHTML = "";

  for (const item of items) {

    const div = document.createElement("div");

    div.className = "result";

    div.textContent =
      `${item.platform}: ${item.message || item.status}`;

    results.appendChild(div);
  }
}


postButton.addEventListener("click", async () => {

  const videoUrl =
    document.getElementById("videoUrl").value.trim();

  const caption =
    document.getElementById("caption").value.trim();

  const platforms = selectedPlatforms();

  if (!videoUrl) {
    message.textContent = "Paste a video URL first.";
    return;
  }

  if (!platforms.length) {
    message.textContent =
      "Select at least one platform.";
    return;
  }

  postButton.disabled = true;

  message.textContent =
    "Preparing your video...";

  results.textContent =
    "Processing...";

  try {

    const response = await fetch(
      "/api/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          videoUrl,
          caption,
          platforms
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Request failed."
      );
    }

    message.textContent =
      data.message || "Finished.";

    showResults(data.results);

  } catch (error) {

    message.textContent =
      error.message || "Something went wrong.";

    results.textContent =
      "Post failed.";

  } finally {

    postButton.disabled = false;
  }

});


checkServer();
loadAccounts();

setInterval(checkServer, 30000);
