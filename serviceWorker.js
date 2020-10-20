const offline = "pwaCACHE";
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

// install trigger -> cache index.html
self.addEventListener('install', function(event) {
  var indexPage = new Request('/');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open(offline).then(function(cache) {
        return cache.put(indexPage, response);
      });
  }));
});
// fetch trigger -> fetch from server, save to cache, if fail: serve from cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      return caches.open(offline).then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function (error) {
      return caches.open(offline).then(function(cache) {
        return cache.match(event.request);
      });
    })
  );
});