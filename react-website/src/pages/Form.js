import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Form () {
    // Something something react's rule of hooks.
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [favoriteColor, setFavColor] = useState("");
    const [favoritePet, setFavPet] = useState("");
    const [message, setMessage] = useState("");
    
    function handleSubmit (event) {
        event.preventDefault();

        if (firstName === "" || lastName === "" || favoriteColor === "") {
            alert(`Missing fields: ${firstName ? "" : "First Name, "}${lastName ? "" : "Last Name, "}${favoriteColor ? "":"Colour"}`);
        } else {
            // Potentially, code here for processing form data before POST to server/db.
            let http = new XMLHttpRequest();
            http.onreadystatechange = () => {   // Set the function for when the response is sent back.
              if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                console.log(http.response);
                navigate("/confirmation");
              }
            }
            http.open("POST", "http://localhost:8080/data/entry", true);   // true => async
    
            const body = {
                firstName: firstName,
                lastName: lastName,
                favoriteColor: favoriteColor,
                favoritePet: favoritePet,
                message: message
            };
            http.send(body);
        }
    }

    return(
        <>
            <form onSubmit={(event) => handleSubmit(event)} property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Personal Information Form</h1>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Fname">First Name</label>
                    <input type="text" className="form-control" id="Fname" name="firstName" size="40" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Lname">Last Name</label>
                    <input type="text" className="form-control" id="Lname" name="lastName" size="40" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Colour">Colour</label>
                    <input type="text" className="form-control" id="Colour" name="favoriteColor" size="40" placeholder="Red" value={favoriteColor} onChange={(e) => setFavColor(e.target.value)}/>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Colour">Pet Preference</label>
                    <select className="form-control" id="Pet" name="favoritePet" value={favoritePet} onChange={(e) => setFavPet(e.target.value)}>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Fish</option>
                    </select>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label" htmlFor="feedback">Nice Message</label>
                    <textarea className="form-control" rows={5} cols={50} id="feedback" name="message" placeholder="Add message for cookie." value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <br></br>
                    <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </form>
            <br></br>
        </>
    )
}

export default Form;