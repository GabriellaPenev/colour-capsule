import { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import firebase from '../firebase';
import React from 'react';


const UploadCanvas = ({ canvasRef }) => {

    const [imageURL, setImageURL] = useState('');

    const addToGallery = () => {

        // Get the Canvas element and convert the image to a data URL
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();

        // Get a reference to the Firebase Realtime Database node where you want to upload the image
        const database = getDatabase(firebase)
        const dbRef = ref(database, `/canvas`);

        // Upload the image as a string to the database
        push(dbRef, dataURL)
            .then(() => {
                console.log('Image uploaded to Firebase Realtime Database');
            })
            .catch((error) => {
                console.error('Error uploading image to Firebase Realtime Database:', error);
            });
    }

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef =  ref(database, `/canvas`);

        onValue(dbRef, (response) => {
            const dbCanvas = [];
            const data = response.val();
            for (let key in data) {
                // inside the loop, we push each color name and colour value to the dbColors array:
                dbCanvas.push(data[key]);
            }
            // update state using the local array dbColors so that colors state now holds whatever was in stored in firebase
            setImageURL(dbCanvas);
        });
    }, [])

    return (
        <>
            <button onClick={addToGallery}>Upload</button>

            <div className='image-container'>
                {imageURL ? (
                    <img src={imageURL} alt="Canvas Image" />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )


}

export default UploadCanvas;