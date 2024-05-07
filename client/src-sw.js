const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precaching the files
precacheAndRoute(self.__WB_MANIFEST);

/*
If there is a Response in the cache, the Request will be fulfilled using the cached response
and the network will not be used at all. If there isn't a cached response, 
the Request will be fulfilled by a network request and the response will be cached
so that the next request is served directly from the cache.
*/

// Implementing page caching
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Ensure that only responses with a 200 status are cached
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    //will expire in 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Implementing image caching
const imageCache =  new CacheFirst({
  cacheName: "my-image-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    }),
  ],
})

// to serve the offline page when the user is offline
offlineFallback(
  {
    pageFallback: "./index.html",
  },
  pageCache
);

// to load provided urls in cache during service worker installation
warmStrategyCache({
  urls: ["./index.html", "/"],
  strategy: pageCache,
});

//routing the requests to pageCache when the request is a navigation request
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// routing the requests to imageCache when the request is an image request
registerRoute(({ request }) => request.destination === "image", imageCache);
