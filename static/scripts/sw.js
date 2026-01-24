self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}

  const title = data.title || "Bildiriş";
  const options = { body: data.body || "" };

  event.waitUntil(self.registration.showNotification(title, options));
});
