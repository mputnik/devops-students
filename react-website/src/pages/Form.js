import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Form () {
    const navigate = useNavigate();
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [colourErr, setColourErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    
    function HandleSubmit(e) {
        e.preventDefault();
        
        let firstName = document.getElementById('Fname');
        let lastName = document.getElementById('Lname');
        let colour = document.getElementById('Colour');
        let pet = document.getElementById('Pet');

        //sets state to true or false depending on result of operator
        setFirstNameErr(firstName.value === "");
        setLastNameErr(lastName.value === "");
        setColourErr(colour.value === "");
        setPetErr(pet.value === "");

            if(firstName.value !== "" && lastName.value !== "" && colour.value !== "" && pet.value !== ""){
                navigate("/confirmation");
            }
    }

    return(
        <>
            <form id='form' onSubmit={(e) => HandleSubmit(e)} property="mainContentOfPage" class="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Personal Information Form</h1>
                <div data-testid={'FnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Fname">First Name <strong class="required">(required)</strong></label>
                    {firstNameErr && <ErrorMsg />}
                    <input type="text" className="form-control" id="Fname" size="40" placeholder="John"/>
                </div>
                <div data-testid={'LnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Lname">Last Name <strong class="required">(required)</strong></label>
                    {lastNameErr && <ErrorMsg />}
                    <input type="text" className="form-control" id="Lname" size="40" placeholder="Doe"/>
                </div>
                <div data-testid={'ColourInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Colour">Colour <strong class="required">(required)</strong></label>
                    {colourErr && <ErrorMsg />}
                    <input type="text" className="form-control" id="Colour" size="40" placeholder="Red"/>
                </div>
                <div data-testid={'PetSelect'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Pet">Pet Preference <strong class="required">(required)</strong></label>
                    {petErr && <ErrorMsg />}
                    <select className="form-control" id="Pet">
                        <option value=""></option>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Fish</option>
                    </select>
                </div>
                <div data-testid={'SubmitBtn'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label" htmlFor="feedback">Nice Message</label>
                    <textarea className="form-control" rows={5} cols={50} id="feedback" placeholder="Add message for cookie."></textarea>
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