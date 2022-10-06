import { useState } from 'react'
import axios from 'axios'

function Form () {
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
            const body = {
                firstName: firstName,
                lastName: lastName,
                favoriteColor: favoriteColor,
                favoritePet: favoritePet,
                message: message
            };

            axios({
                // Full url defined in as proxy in package.json 
                url: '/api/save',
                method: 'POST',
                data: body
            })
                .then(()=>{
                    console.log('The form data was successfuly sent to the server')
                })
                .catch(()=>{
                    console.log('Internal server error: could not send form data to the server')
                });

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