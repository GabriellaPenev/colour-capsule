# Juno Project 3: Colour Capsule

**View live site [here](https://colourcapsule.netlify.app/)**

## Overview
Colour Capsule is a web application that allows users to create custom colour collections with up to five colours, and have them display permanently on the page. Users can create as many colour capsules as they like, and can select any of the colours available in the capsules to paint on a blank HTML Canvas element below the capsules. Users have the option to change the thickness and opacity of the paintbrush, and can erase, reset, and even download their drawing at any stage. If they feel like sharing their art on the site, they can add their image to the gallery section and have it stored on the page.  

## Functionalities
- CRUD (Create, Read, Update, Delete) functionalities for colour capsules and canvas art
- Display all created colour capsules on the page, stored in Firebase via useState hooks
- Ability to select any colour stored in a colour capsule to use on the HTML Canvas
- Ability to change the opacity and thickness of the paint on the canvas 
- Ability to erase, reset, or download the canvas drawing as a PNG image file to the user's computer
- Ability to save their drawing to the Gallery section for public display, as drawings are converted to a dataURL and stored in Firebase via useState hooks
- Ability to delete the colour capsules and gallery art from the app
- Responsive down to 320px / mobile friendly design

## Technologies Used
- React (useState, useEffect, useRef, forwardRef, props, components)
- HTML Canvas
- Firebase Realtime Database
- HTML
- CSS

## Possible improvements
- Prevent the user from selecting the same colour more than once in the same capsule (currently there is error handling that prevents users from having more than one white or black colour in a capsule)
- Undo button that undos the most recent drawn paint line
- Display drawings on the page from multiple users once saved to Firebase

## Preview
![Screenshot of the colour capsule app](./src/assets/screenshots/colour-capsules.png 'Colour Capsule')
![Screenshot of the colour capsule app](./src/assets/screenshots/select-colours.png 'Colour Capsule')
![Screenshot of the colour capsule app](./src/assets/screenshots/blank-canvas.png 'Canvas')
![Screenshot of the colour capsule app](./src/assets/screenshots/canvas-drawing.png 'Drawing on Canvas')
![Screenshot of the colour capsule app](./src/assets/screenshots/erase-drawing.png 'Erase Drawing')
