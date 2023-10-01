# Panel

[DEMO](##)
> **Provide a live demo of your plugin**


### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/peppu-panel@0.1.1"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['peppu-panel'],
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```

### Options

```js
bgColor: {
  one: '#fff',
  two: '#9ca8bb',
  three: '#1df205',
  four: '#1df205'
}
```


## Summary



## Download

* CDN
  * `https://unpkg.com/peppu-panel@0.1.1`
* NPM
  * `npm i peppu-panel`
* GIT
  * `git clone https://github.com/hannydevelop/peppugen`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/peppu-panel.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['peppu-panel'],
      pluginsOpts: {
        'peppu-panel': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'peppu-panel';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/hannydevelop/peppu-gen
$ cd panel
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
