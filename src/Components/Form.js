import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ setColors, resultRef }) => {

    const initialValues = {
        title: '',
        color1: "#ffffff",
        color2: "#ffffff",
        color3: "#ffffff",
        color4: "#ffffff",
        color5: "#ffffff"
    };

    // store user's input data and push them to firebase:
    const [userInput, setUserInput] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database)

        onValue(dbRef, (response) => {
            const dbColors = [];
            const data = response.val();
            for (let key in data) {
                // inside the loop, we push each color name and colour value to the dbColors array:
                dbColors.push({ name: data[key], key: key });
            }
            // update the component's state using the local array dbColors
            setColors(dbColors);
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const database = getDatabase(firebase)
        const dbRef = ref(database)

        // error handling if user doesn't add a capsule name, or selects white / black more than once
        let white = 0;
        let black = 0;
        for (let value in userInput) {
            if (userInput[value] === '#ffffff') {
                white += 1
            } else if (userInput[value] === '#000000') {
                black += 1
            }
        }

        if (userInput.title === '') {
            toast('❗You forgot to add a capsule name!')
        } else if (!userInput.title.trim().length) {
            toast('❗Your capsule name has only blank spaces, please add more characters to make it a valid name!')
        } else if (white > 1) {
            toast('🚫 You have selected white as more than one of your capsule colours!')
        } else if (black > 1) {
            toast('🚫 You have selected black as more than one of your capsule colours!')
        } else {

            push(dbRef, userInput);
            setUserInput(initialValues);
            resultRef.current.previousSibling.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
        }
    }



    return (
        <>
            <form action="submit">
                <div className='animate__animated animate__fadeIn'>
                    <label htmlFor="title">Capsule Name </label>
                    <input
                        autoComplete='off'
                        type="text"
                        id='title'
                        value={userInput.title}
                        onChange={handleInputChange}
                        name='title'
                        label='title'
                        maxLength={30}
                    />
                </div>
                <div className="options animate__animated animate__fadeIn">
                    <div className="option">
                        <label htmlFor="color1">Colour 1</label>
                        <input
                            type="color"
                            id="color1"
                            value={userInput.color1}
                            onChange={handleInputChange}
                            name="color1"
                            label="color1"
                        />
                    </div>

                    <div className="option">
                        <label htmlFor="color2">Colour 2</label>
                        <input
                            type="color"
                            id="color2"
                            value={userInput.color2}
                            onChange={handleInputChange}
                            name="color2"
                            label="color2"
                        />
                    </div>

                    <div className="option">
                        <label htmlFor="color3">Colour 3</label>
                        <input
                            type="color"
                            id="color3"
                            value={userInput.color3}
                            onChange={handleInputChange}
                            name="color3"
                            label="color3"
                        />
                    </div>

                    <div className="option">
                        <label htmlFor="color4">Colour 4</label>
                        <input
                            type="color"
                            id="color4"
                            value={userInput.color4}
                            onChange={handleInputChange}
                            name="color4"
                            label="color4"
                        />
                    </div>

                    <div className="option">
                        <label htmlFor="color5">Colour 5</label>
                        <input
                            type="color"
                            id="color5"
                            value={userInput.color5}
                            onChange={handleInputChange}
                            name="color5"
                            label="color5"
                        />
                    </div>
                </div>
                <button className="submitButton animate__animated animate__fadeIn" type="submit" onClick={handleSubmit}>Create colour capsule</button>
            </form>

            <ToastContainer
                newestOnTop={false}
                autoClose={2000}
            />
        </>
    )
}

export default Form;
