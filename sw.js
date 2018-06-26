const CACHE_VERSION = 'static-v1';
const CACHE_DYNAMIC_VERSION = 'dynamic-v1'


self.addEventListener('install', function(event){
  console.log(`installing the service worker... ${event}`);
  event.waitUntil(
    caches.open(CACHE_VERSION)
    .then(function(cache){
      console.log('Precaching app shell..');
      cache.addAll([
        '/',
        '/index.html',
        '/js/app.js',
        '/style.css',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
      ])
    })
  );
});


self.addEventListener('activate', function(event){
  console.log(`activating the service worker... ${event}`);
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key !== CACHE_VERSION && key !==CACHE_DYNAMIC_VERSION){
          console.log(`Removing old cache... ${key}`);
          return caches.delete(key);
        }
      }))
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      if(response){
        return response;
      } else {
        return fetch(event.request)
        .then(function(res){
          return caches.open(CACHE_DYNAMIC_VERSION)
          .then(function(cache){
            cache.put(event.request.url, res.clone())
            return res;
          })
        })
        .catch(function(err){

        })
      }
    })
  );
});