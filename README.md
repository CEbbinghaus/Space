# Space

A Simple Space Background That reacts to your mouse movement.

*Other Branches will be alternate versions Including a version for Wallpaper Engine*

# How to Use

Download `space.js` and Include it in any Html File with 
```html
<script src="./space.js"></script>
```
Then call it on any Canvas Element
```js
new space(document.getElementById("myCanvas"));
new space("mycanvas");
```
The Class takes Two options:

(element, __<Fullscreen>(default false)__, __<Relative Cursor>(default true)__)

The first will try and make the Canvas Fullscreen. Use this only if you arent resizing the Canvas Element with CSS.

The Second will use the center of the Element opposed to the Center of the screen for the Star Direction.

