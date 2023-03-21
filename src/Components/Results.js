import { getDatabase, ref, remove } from 'firebase/database';
import firebase from '../firebase';

const Results = ({colors, setSelectedColor}) => {

    const handleRemoveCapsule = (capsuleID) => {
        // dbRef points to the specific node of the capsule I want to remove
        const database = getDatabase(firebase);
        const dbRef = ref(database, `colors/${capsuleID}`);
        // remove the node specific to the capsule id
        remove(dbRef)
    }
    

    return (
        <>
            {colors.map((color) => {
                return (
                    <div
                        key={`${color.key}`}
                        className="resultsContainer animate__animated animate__fadeIn">
                        <p>{color.name.title}</p>
                        <ul>
                            <li key={`${color.key} color1`}>
                                <div
                                    onClick={() => setSelectedColor(color.name.color1)}
                                    className="results"
                                    style={
                                        color.name.color1 === '#ffffff' ? { "backgroundColor": color.name.color1, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color1 }
                                    }>
                                </div>
                                <p>{color.name.color1}</p>
                            </li>
                            <li key={`${color.key} color2`}>
                                <div
                                    onClick={() => setSelectedColor(color.name.color2)}
                                    className="results"
                                    style={
                                        color.name.color2 === '#ffffff' ? { "backgroundColor": color.name.color2, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color2 }
                                    }>
                                </div>
                                <p>{color.name.color2}</p>
                            </li>
                            <li key={`${color.key} color3`}>
                                <div
                                    onClick={() => setSelectedColor(color.name.color3)}
                                    className="results"
                                    style={
                                        color.name.color3 === '#ffffff' ? { "backgroundColor": color.name.color3, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color3 }
                                    }>
                                </div>
                                <p>{color.name.color3}</p>
                            </li>
                            <li key={`${color.key} color4`}>
                                <div
                                    onClick={() => setSelectedColor(color.name.color4)}
                                    className="results"
                                    style={
                                        color.name.color4 === '#ffffff' ? { "backgroundColor": color.name.color4, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color4 }
                                    }>
                                </div>
                                <p>{color.name.color4}</p>
                            </li>
                            <li key={`${color.key} color5`}>
                                <div
                                    onClick={() => setSelectedColor(color.name.color5)}
                                    className="results"
                                    style={
                                        color.name.color5 === '#ffffff' ? { "backgroundColor": color.name.color5, "border": '1px solid lightgray' } : { "backgroundColor": color.name.color5 }
                                    }>
                                </div>
                                <p>{color.name.color5}</p>
                            </li>

                        </ul>
                        <button
                            className="removeButton"
                            onClick={() => { handleRemoveCapsule(color.key) }}>x</button>
                    </div>
                )
            })}
        </>
    )
}

export default Results;