
function Form({ userInput, handleInputChange, handleSubmit }) {
    return(
        <form action="submit">
            <div className="options">
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
            <button className="submitButton" type="submit" onClick={handleSubmit}>Create colour capsule</button>
        </form>
    )
}

export default Form;