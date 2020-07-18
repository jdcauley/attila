import {setCacheNameDetails, cacheNames, skipWaiting, clientsClaim} from 'workbox-core'
import {precacheAndRoute} from 'workbox-precaching'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import { registerRoute } from 'workbox-routing'
import {NetworkFirst, CacheFirst, StaleWhileRevalidate} from 'workbox-strategies'
import * as googleAnalytics from 'workbox-google-analytics'

const version = 'v2'
const offlineFundamentals = [{"url":"/","revision":"204"}]

const ignorePaths = [
    'ghost'
]

setCacheNameDetails({
    prefix: 'ghostCache',
    suffix: version,
    precache: 'it',
    runtime: 'rt',
    googleAnalytics: 'ga',
})

const shouldCache = (all) => {
    console.log(all)
    if (!all.url) {
        return false
    }
    const url = all.url.href

    if ( !url ) {
        return false;
    }

    if (all.request.method !== 'GET') {
        return false;
    }

    if (!url.includes('https')) {
        return false;
    }

    if (ignorePaths.includes(url)) {
        return false;
    }

    if (ignorePaths.some(path => url.includes(path))) {
        return false;
    }

    return true
}

registerRoute(
    new RegExp('.*\\.css'),
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
        ]
    })
);

registerRoute(
    new RegExp('.*\\.js'),
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
        ]
    })
);
const handlerCb = ({url, request, event, params}) => {
    console.log('handler')
    return fetch(`https://theformat.app/unsafe/filters:format(webp)/${url}`).then(response => {
        console.log(response)
        return response; 
    })
};

registerRoute(
    /\.(?:jpg|jpeg|png|jp2|svg|gif|webp)$/,
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
        ]
    })
)

registerRoute(
    /\.(?:woff|woff2|otf|ttf|)$/,
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
        ]
    })
)

registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
        ]
    })
)

registerRoute(
    shouldCache,
    new NetworkFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
        ]
    })
)

precacheAndRoute(
    offlineFundamentals
)

googleAnalytics.initialize()

self.addEventListener('activate', function(event) {
    caches
        .keys()
        .then(function (keys) {
            keys
                    .filter(function (key) {
                        // Filter by keys that don't start with the latest version prefix.
                        return !key.startsWith(version);
                    })
                    .map(function (key) {
                        return caches.delete(key);
                    })
            return true
        })
    return clientsClaim()
})


self.addEventListener('install', (event) => {
    const urls = offlineFundamentals.map(item => item.url)
    const cacheName = cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)))

    precacheAndRoute(
        offlineFundamentals
    )
})
