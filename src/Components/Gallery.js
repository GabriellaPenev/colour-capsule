import { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import firebase from '../firebase';
import React from 'react';


const Gallery = ({ canvasRef }) => {

    const [imageURL, setImageURL] = useState('');

    const addToGallery = () => {
        // convert the image to a dataURL
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();

        // reference firebase database at /canvas node where we'll insert the dataURL
        const database = getDatabase(firebase)
        const dbRef = ref(database, `/canvas`);

        // Upload the dataURL to the database
        push(dbRef, dataURL)


    }

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/canvas`);

        // check if there's data held in firebase at /canvas node
        onValue(dbRef, (response) => {
            const data = response.val();

            // if there is data, then return it as an array of elements that correspond with the key/value pairs in the /canvas object in fb
            if (data != null) {
                const dataArray = Object.entries(data);
                // set state with that data
                setImageURL(dataArray);
            } else setImageURL('')
        });
    }, [])

    const handleRemoveCanvas = (imageID) => {
        // dbRef points to the specific node of the capsule I want to remove
        const database = getDatabase(firebase);
        const dbRef = ref(database, `canvas/${imageID}`);
        // remove the node specific to the capsule id
        remove(dbRef)
    }

    return (
        <div className="animate__animated animate__fadeIn">
            <button onClick={addToGallery}>Upload</button>

            <div>
                <h3>Paint Gallery</h3>
                {
                    imageURL ?
                        imageURL.map((image) => {
                            return (
                                <div className='image-container' key={image[0]}>
                                    <img src={image[1]} alt="Canvas Image"  style={{backgroundColor: 'white'}}/>
                                    <button className='deleteCanvas' onClick={() => { handleRemoveCanvas(image[0]) }}>Delete Drawing</button>
                                </div>
                            )
                        })
                        :
                        <div><p>Click the 'upload' button to see your art displayed below!</p></div>
                }
            </div>
        </div>
    )


}

export default Gallery;