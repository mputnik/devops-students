import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
    
function Form () {
    const navigate = useNavigate();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [favoriteColor, setFavColor] = useState("");
    const [favoritePet, setFavPet] = useState("");
    const [message, setMessage] = useState("");
    
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [colourErr, setColourErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    
    function handleSubmit (event) {
        event.preventDefault();
        
        setFirstNameErr(firstName === "");
        setLastNameErr(lastName === "");
        setColourErr(favoriteColor === "");
        setPetErr(favoritePet === "");

        if(firstName !== "" && lastName !== "" && favoriteColor !== "" && favoritePet !== ""){
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
                    navigate("/confirmation");
                    console.log('The form data was successfuly sent to the server');
                })
                .catch((error)=>{
                    console.log('Internal server error: could not send form data to the server');
                });
        }

    }

    return(
        <>
            <form id='form' onSubmit={(e) => handleSubmit(e)} property="mainContentOfPage" class="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Personal Information Form</h1>
                <div data-testid={'FnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Fname">First Name <strong class="required">(required)</strong></label>
                    {firstNameErr && <ErrorMsg />}
                    <input type="text" className="form-control" id="Fname" size="40" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div data-testid={'LnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Lname">Last Name <strong class="required">(required)</strong></label>
                    {lastNameErr && <ErrorMsg />}
                    <input type="text" className="form-control" id="Lname" size="40" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div data-testid={'ColourInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Colour">Colour <strong class="required">(required)</strong></label>
                    {colourErr && <ErrorMsg />}
                    <input type="text" className="form-control" id="Colour" size="40" placeholder="Red" value={favoriteColor} onChange={(e) => setFavColor(e.target.value)}/>
                </div>
                <div data-testid={'PetSelect'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Pet">Pet Preference <strong class="required">(required)</strong></label>
                    {petErr && <ErrorMsg />}
                    <select className="form-control" id="Pet" value={favoritePet} onChange={(e) => setFavPet(e.target.value)}>
                        <option value=""></option>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Fish</option>
                    </select>
                </div>
                <div data-testid={'SubmitBtn'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label" htmlFor="feedback">Nice Message</label>
                    <textarea className="form-control" rows={5} cols={50} id="feedback" placeholder="Add message for cookie." value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <br></br>
                    <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </form>
            <br></br>
        </>
    )
}
function ErrorMsg() {
    return (
        <>
            <br/>
            <label class="control-label" for="Fname">
            <strong id="title1-error" class="error"><span class="label label-danger"><span class="prefix">Error: </span>This field is required.</span></strong>
            </label>
        </>
    )
  }

export default Form;
