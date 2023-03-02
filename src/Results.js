
function Results({ colors, handleRemoveCapsule }) {

    return (
        <>
            {colors.map((color) => {
                return (
                    <div className="resultsContainer animate__animated animate__fadeIn">
                        <p>{color.name.title}</p>
                        <ul key={color.key}>
                            <li>
                                <div
                                    className="results"
                                    style={
                                        color.name.color1 === '#ffffff' ? { "backgroundColor": color.name.color1, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color1 }
                                    }>
                                </div>
                                <p>{color.name.color1}</p>
                            </li>
                            <li>
                                <div
                                    className="results"
                                    style={
                                        color.name.color2 === '#ffffff' ? { "backgroundColor": color.name.color2, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color2 }
                                    }>
                                </div>
                                <p>{color.name.color2}</p>
                            </li>
                            <li>
                                <div
                                    className="results"
                                    style={
                                        color.name.color3 === '#ffffff' ? { "backgroundColor": color.name.color3, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color3 }
                                    }>
                                </div>
                                <p>{color.name.color3}</p>
                            </li>
                            <li>
                                <div
                                    className="results"
                                    style={
                                        color.name.color4 === '#ffffff' ? { "backgroundColor": color.name.color4, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color4 }
                                    }>
                                </div>
                                <p>{color.name.color4}</p>
                            </li>
                            <li>
                                <div
                                    className="results"
                                    style={
                                        color.name.color5 === '#ffffff' ? { "backgroundColor": color.name.color5, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color5 }
                                    }>
                                </div>
                                <p>{color.name.color5}</p>
                            </li>


                            <button className="removeButton" onClick={() => { handleRemoveCapsule(color.key) }}>x</button>

                        </ul>
                    </div>
                )
            })}
        </>
    )
}

export default Results;