'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "8252fe99cfd282977f2ef52a490a95eb",
"assets/assets/icons/coronadr.svg": "73974216d5f1fbbd48c8fa47c7cf0484",
"assets/assets/icons/Drcorona.svg": "c217fadbe3a672ae15f81a1a6e2ba445",
"assets/assets/icons/dropdown.svg": "0203a35cf8bd93804162bd9cf64b06e3",
"assets/assets/icons/forward.svg": "46bd4975b216c2ac9015688c423777fd",
"assets/assets/icons/Intersection.svg": "0034b2d04f4cceb7ac452f59ec47a0fb",
"assets/assets/icons/map.svg": "2a5eafe6850e066b8344d0f127339cb4",
"assets/assets/icons/maps-and-flags.svg": "a27b3b54e09f25847321d99cfe718dbf",
"assets/assets/icons/menu.svg": "b0ecf67d730680020a2d8ed0dd388652",
"assets/assets/icons/shape_small.svg": "89bca80b57a27fc88001f8bcbb3bf6ea",
"assets/assets/images/Banner1.jpg": "7d9b607dcfae9db2d0eae666344fa012",
"assets/assets/images/Banner2.jpg": "92576a943c6db2789ecf57f1b99b3022",
"assets/assets/images/Banner3.jpg": "e88a9d851c5677062b9e74e51da389c8",
"assets/assets/images/Banner4.jpg": "b0d2c1f3e96bed5e15e6a4368ebfb6be",
"assets/assets/images/Banner5.jpg": "60e39b8ebdcc6e5acbb92082c049e782",
"assets/assets/images/Banner6.jpg": "5dfa34bc218438d9f6ba3d65aa68cd7a",
"assets/assets/images/devlogo.PNG": "b2939bb0b21341c66b846d2f367f6977",
"assets/assets/images/facelogo.png": "1d77797615c2737319e85324fb6e20e8",
"assets/assets/images/gitlogo.jpg": "7781a8980c6158388d0e79a445500985",
"assets/assets/images/hackerlogo.png": "d38a06be295aab3c83c2a9611eb17c6c",
"assets/assets/images/instalogo.png": "f998ab810139a6bf1eee1b505a8c0922",
"assets/assets/images/linklogo.jpg": "69ecd24261fe984e855bdbdc4c8a8b8b",
"assets/assets/images/medilogo.png": "c8346009c9dd4b584fa82446b29f46b1",
"assets/assets/images/mypic.JPG": "d04cc58421b9e23ee18d79a9193c496a",
"assets/assets/images/twitlogo.jpg": "6f80476ba576e068259d1409988c0f93",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "348ceb471617e0958f740597b1a2560c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "3eca48eca2424377c8c9ea19bd5b1fa6",
"/": "3eca48eca2424377c8c9ea19bd5b1fa6",
"main.dart.js": "dd6f6b3653071fd66d5a0f55c906cb30",
"manifest.json": "e80a82718061098d8a80e0e677b321d9",
"version.json": "8ed2f71a28adf209f1515080b3f8014d"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
