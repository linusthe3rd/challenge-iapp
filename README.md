You can view the deployed version of this project at the following:

[http://johnryding.com/challenge-iapp/#/home](http://johnryding.com/challenge-iapp/#/home)

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

This is an SPA buils on knockout.js. It uses the following libraries to run:

* knockout.js for templating and data binding
* Sammy.js for routing
* Require.js for module loading
* Bluebird.js for Promises
* jQuery for DOM interactions
* moment.js for Date parsing
* LESS for CSS

For the architecture of the app, it follows a normal Model-View-ViewModel design with the following major components:

* Models
    - Example: [src/components/posts/Post.js](https://github.com/strife25/challenge-iapp/blob/master/src/components/posts/Post.js)
    - Naming: ```*.js```
    - These are the lowest level objects that are managed by the application. They essentially take data from the backend services and wrap it into a new instance of a Javascript object. These models may have methods that provide computed properties of its underlying data.
    - **NOTE**: One thing that I traded off here for the challenge was to not implement a low-level base model object. Generally speaking, it would be worthwhile to have a base model object that could take in a JSON object and convert its attributes into observable values, but I did not have a hard use case to do so for this challenge as all of the mock data I am interacting with is static. I.e. A post will most likely never change once it has been submitted into the system.
* Services
    - Example: [src/components/posts/postsService.js](https://github.com/strife25/challenge-iapp/blob/master/src/components/posts/postsService.js)
    - Naming: ```*Service.js```
    - These are singleton objects that act as the interface to the persistence layer of the application (which would normally be a backend REST API). These objects provide APIs that will run CRUD actions upon the data tier to retrieve and/or modify the state of the Model objects.
    - Due to the nature of this challenge, I did not have a backend to interact with. Despite that, I still felt that it was worthwhile to implement this tier of the system to show the importance of separating the data tier of an app from its presentation. If this app ever needed to work with a backend system in the future, all that would need to change is the implementation of the service objects as their Promise-based interface is in place for the rest of the app.
* ViewModels
    - Example: [src/components/posts/PostView.js](https://github.com/strife25/challenge-iapp/blob/master/src/components/posts/PostView.js)
    - Naming: ```*View.js```
    - Objects that will interact with the Service objects to retrieve models and prepare the data
    for presentation in a template. DOM interactions should never occur in ViewModels as these objects are meant for tracking the state of the view w/ data bindings and interact with the data persistence tier via Service objects.
* Binding Handlers
    - Example: [src/components/flipswitch-binding.js](https://github.com/strife25/challenge-iapp/blob/master/src/components/flipswitch/flipswitch-binding.js)
    - Naming: ```*-binding.js```
    - Knockout.js' native way to extend the actions it can take in a template. This is where code related to interacting with the DOM lives. Bindings can do whatever they wish with the DOM and generally take observable attributes as input. This observable attributes will trigger the "init" function for set up purposes. Whenever the observable's value changes, the "update" function will then trigger to update the template's state.

# Folder Structure

For this challenge, I decided to try and follow [AngularJS' recommended folder structure](https://docs.google.com/a/johnryding.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub). As such, I used the following organization:

* ```src/app/```
    - This is where the main views of the application live. Each child folder in the app directory represent a major UI in the SimpleSocial app.
* ```src/components/```
    - This directory contains the logical components that can exist outside of SimpleSocial. A number of the components in this directory are essentially binding handlers or modules of useful Javascript code. The most substantial directory here is the "posts/" directory as it is has a numbre of templates related to posts as well as LESS files for styling.
* ```src/less```
    - This is where the main CSS code lives. I tried to follow the SMACSS organizational pattern for the CSS codebase. The root directory contains files that define the base CSS rules of the application. The meat of the work here falls into the "modules" directory. Although a number of the files in the module library could live in the "src/components" directory, I decided to place modules that did not have any other file types associated with them into "src/less/modules". So, if a logical piece of code has only one LESS file, it goes into "src/less/modules". Otherwise, it goes into "src/components".

# Notes

* I tried extremely hard to achieve the pixel-perfect layout. The following issues arose to prevent the pixel perfect layout from being achieved:
    - With the dropdown caret next to the avatar, the width of the caret is not perfect at the 100% zoom level. This seems to be due to the fact that the borders used to create the caret's width each uses a half pixel in their size. This creates some weirdness with calculating the caret's width in some browsers.
* I was not able to create an icon font for the application and instead resorted to extracting SVGs from the PSD files. This was my first time doing this (and even using Adobe Illustrator), so I had a lot of difficulty performing the extraction and decided to just embed SVG files in order to save time. Obviously, there are problems with this - the different browsers seem to perform in different ways when loading an external SVG.
* You can create a new post from the "New Post Modal Window" as it has an explicit "Post" button on it. I did not implement this functionality for the text area on the landing page as of 10/31/14.
