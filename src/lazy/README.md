# Lazy Component

a image-lazyLoad component that using [IntersectionObserver API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)


## How To Use

first write the html code, with `data-src` attribute for real image url

```html
<img
    data-src="real.jpg"
    src="placeholder.jpg"
    rel="lazy"
/>
```

then write the js code

```js
Lazy('img', {
    // when img node is loaded the image
    onLoaded: function (node) {
      console.log(node.dataset.title)
    }
})
```
