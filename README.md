# Juno Project 3: Colour Capsule

**View live site [here](https://colourcapsule.netlify.app/)**

## Overview
Colour Capsule is a web application that allows users to create custom colour collections, or capsules, with up to five unique colours and a capsule name, and store them or delete them from the site. Users can create as many colour capsules as they like, and can select any of the colours available in the capsules to paint on a blank HTML Canvas element below the capsules. Users have the option to change the thickness and opacity of the paintbrush, and can erase, reset, and even download their drawing at any stage. 

## Functionalities
- CRUD (Create, Read, Update, Delete) functionalities for colour capsules
- Display all created colour capsules in list form on the page, stored with Firebase
- Ability to select any colour stored in a colour capsule to use on the HTML Canvas
- Ability to change the opacity and thickness of the paint on canvas 
- Ability to erase, reset, or download the drawing as a PNG image to the user's computer
- Responsive down to 320px / mobile friendly design

## Technologies Used
- React (useState, useEffect, useRef, forwardRef, props, components)
- HTML Canvas
- Firebase Realtime Database
- HTML
- CSS

## Possible improvements
- Storing user drawings in Firebase
- Prevent the user from selecting the same colour more than once in the same capsule (currently there is error handling that prevents users from having more than one white or black colour in a capsule)
- Undo button that undos the most recent drawn paint line
- Display drawings on the page from multiple users once saved to Firebase

## Preview
![Screenshot of the colour capsule app](./src/assets/screenshots/colour-capsules.png 'Colour Capsule')
![Screenshot of the colour capsule app](./src/assets/screenshots/blank-canvas.png 'Canvas')
![Screenshot of the colour capsule app](./src/assets/screenshots/canvas-drawing.png 'Drawing on Canvas')
![Screenshot of the colour capsule app](./src/assets/screenshots/erase-drawing.png 'Erase Drawing')
