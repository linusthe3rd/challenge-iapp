# Dependencies

* [Node.js]()
* [npm]()
* [Grunt]()

# Setup

1. Open a command line and set the terminal to the root of this project.
2. Run ```npm install```
3. Run ```grunt server```
4. Open a browser to http://localhost:9000

# Architecture

FILL OUT

# Notes

* I tried extremely hard to achieve the pixel-perfect layout. The following issues arose to prevent the pixel perfect layout from being achieved:
    - With the dropdown caret next to the avatar, the width of the caret is not perfect at the 100% zoom level. This seems to be due to the fact that the borders used to create the caret's width each uses a half pixel in their size. This creates some weirdness with calculating the caret's width in some browsers.