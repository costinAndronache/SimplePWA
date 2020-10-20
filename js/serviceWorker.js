const pwaCACHE = "pwaCACHE";
const assets = [
  "/",
  "index.html",
  "style/style.css",
  "js/main.js",
  "resources/cpp.png",
  "resources/csharp.png",
  "resources/swift.jpg",
  "resources/cpp.txt",
  "resources/swift.txt",
  "resources/csharp.txt"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(pwaCACHE).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});