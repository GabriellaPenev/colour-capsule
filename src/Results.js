
function Results({ color, handleRemoveCapsule }) {

    return (
        <>
            {color.map((capsule) => {
                return (
                    <ul key={capsule.key} className="animate__animated animate__fadeIn">
                        <li>
                            <div
                                className="results"
                                style={{ "backgroundColor": capsule.name.color1 }}>
                            </div>
                            <p>{capsule.name.color1}</p>
                        </li>
                        <li>
                            <div
                                className="results"
                                style={{ "backgroundColor": capsule.name.color2 }}>
                            </div>
                            <p>{capsule.name.color2}</p>
                        </li>
                        <li>
                            <div
                                className="results"
                                style={{ "backgroundColor": capsule.name.color3 }}>
                            </div>
                            <p>{capsule.name.color3}</p>
                        </li>
                        <li>
                            <div
                                className="results"
                                style={{ "backgroundColor": capsule.name.color4 }}>
                            </div>
                            <p>{capsule.name.color4}</p>
                        </li>
                        <li>
                            <div
                                className="results"
                                style={{ "backgroundColor": capsule.name.color5 }}>
                            </div>
                            <p>{capsule.name.color5}</p>
                        </li>


                        <button className="removeButton" onClick={() => { handleRemoveCapsule(capsule.key) }}>x</button>

                    </ul>
                )
            })}
        </>
    )
}

export default Results;