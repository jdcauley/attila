let iCanHasFancyImages = 'loading'
let supportedExtensions = [ 'jpg', 'jpeg', 'png' ]

export const imageBuilder = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onerror = () => resolve('unsupported');
    image.onload = () => {
      if (image.width === 1) {
        resolve('supported');
      }
      resolve('unsupported')
    }
    image.src = src
  })
}

export const imageCodecSupport = async () => {
  const supportsWebP = await imageBuilder('data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=')
  if (supportsWebP === 'supported') {
    return '.webp'
  }
  return 'unsupported'
}

export const assetSwap = (img, imgExt) => {
    console.log(img)
  if (
    !img.dataset.src
  ) {
    return img
  }
  if (img.dataset.src.includes('localhost')) {
      return img
  }
  let srcsetReplaceRegex = new RegExp( 'http', 'gm' )

  if (img.dataset.src) {
    img.dataset.src = `https://theformat.app/unsafe/filters:format(webp)/${img.dataset.src}`
  }
  if (img.dataset.srcset) {
      console.log('src set replace')
    img.dataset.srcset = img.dataset.srcset.replace(srcsetReplaceRegex, 'https://theformat.app/unsafe/filters:format(webp)/http')
    // img.dataset.srcset = img.dataset.srcset.replace(srcsetReplaceRegex, '.' + currentImgExt + imgExt + ' ')
  }

  return img
}

export const loadImages = async () => {

  const nativeLazy = ('loading' in HTMLImageElement.prototype)
  let enableWebp = true

  if ( !enableWebp && nativeLazy ) {
      console.log('no webp, native lazy')
    const images = document.querySelectorAll('img.lazyload')
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset
      }
    })
    return
  }

  // If we don't know about webp support find out
  if (iCanHasFancyImages === 'loading') {
    iCanHasFancyImages = await imageCodecSupport()
  }

  // serialize the options that make up webp support into one conditional
  enableWebp = enableWebp && ( iCanHasFancyImages !== 'unsupported')
  console.log(enableWebp)
  // If webp support and nativeLazy support use native
  if (enableWebp && nativeLazy) {
      console.log('web and lazy')
    const images = document.querySelectorAll("img.lazyload")
    images.forEach(img => {
      const ele = assetSwap(img, iCanHasFancyImages)
      if (ele.dataset.src) {
        ele.src = ele.dataset.src;
      }
      if (img.dataset.srcset) {
          console.log('moving the sets')
          console.log(ele.dataset.srcset)
        ele.srcset = ele.dataset.srcset
      }
    })
    return
  }

  // If we get to this point we need lazy sizes
  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.loadMode = 1;
  // require('lazysizes')
  import(/* webpackChunkName: "lazysizes" */ 'lazysizes').then(
    (ls) => {
      // If we support webp we need to add a listener to swap assets
      if ( enableWebp && ( iCanHasFancyImages !== 'unsupported' ) ) {
        document.addEventListener('lazybeforeunveil', (evt) => {
          assetSwap(evt.target, iCanHasFancyImages)
        })
      }
      // If we don't need to swap assets lazy sizes will take care of the simple swap
      return
    }
  )

}

export default loadImages