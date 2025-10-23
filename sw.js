// === DEPLOYMENT CRITICAL ===
// This file ('sw.js') MUST be served from the root of your domain.
// Example: If your site is 'https://example.com', this file must be accessible at 'https://example.com/sw.js'.
//
// A 404 ERROR FOR THIS FILE IS A SERVER CONFIGURATION PROBLEM.
//
// To fix this, you must configure your hosting provider (Vercel, Netlify, Firebase, etc.)
// to serve this file from the root path. This cannot be fixed by changing the code in 'index.html'.
// The service worker is required for Progressive Web App (PWA) features like offline access.

const CACHE_NAME = 'activador-energetico-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap'
];

// Instalar el Service Worker y cachear los assets principales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error('Failed to open cache', err);
      })
  );
});

// Activar el Service Worker y limpiar cachés antiguos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar las peticiones de red (estrategia Cache First)
self.addEventListener('fetch', event => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la respuesta está en el caché, la retornamos
        if (response) {
          return response;
        }

        // Si no, la buscamos en la red
        return fetch(event.request).then(
          networkResponse => {
            // Verificamos si la respuesta es válida
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
              return networkResponse;
            }

            // Clonamos la respuesta para poder guardarla en caché y retornarla
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
      .catch(err => {
        console.error('Fetch error:', err);
        // Podríamos devolver una página offline por defecto aquí
      })
  );
});