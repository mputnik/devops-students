import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
    
function AdminForm (props) {
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
    
    // On load, send HTTP request to server.
    // Fires twice because StrictMode (see index.js) renders components twice on dev. Should not be an issue in production.
    useEffect(() => {
        axios.get(`/api/search/${props.docId}`)
          .then((response) =>{
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setFavColor(response.data.favoriteColor);
            setFavPet(response.data.favoritePet);
            setMessage(response.data.message);
          })
          .catch((error) => {
            alert(`Error: ${error.message}`)
          });
    // Keep the empty array.
    }, [props.docId]);
    
    function editDocument () {
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
                // TODO: update url when route is decided.
                url: `/api/.../${props.docId}`,
                method: 'PUT',
                data: body
            })
                .then(()=>{
                    navigate("/data");
                    console.log('The form data was successfuly sent to the server');
                })
                .catch((error)=>{
                    console.log(`Internal server error: could not send form data to the server.\nError: ${error.message}`);
                });
        }

    }

    function deleteDocument() {
        axios({
            // TODO: update url when route is decided.
            url: `/api/.../${props.docId}`,
            method: 'DELETE',
            data: { _id: props.docId }
        })
            .then(() => {
                console.log("The document was successfully deleted from the database.");
                navigate("/data");
            })
            .catch((error) => {
                console.log(`Deletion failed.\nError: ${error.message}`);
            });
    }

    return(
        <>
            <form id='form' property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Edit Form Entry</h1>
                <div data-testid={'FnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Fname">First Name <strong className="required">(required)</strong></label>
                    {firstNameErr && <ErrorMsg htmlFor="Fname"/>}
                    <input type="text" className="form-control" id="Fname" size="40" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div data-testid={'LnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Lname">Last Name <strong className="required">(required)</strong></label>
                    {lastNameErr && <ErrorMsg htmlFor="Lname"/>}
                    <input type="text" className="form-control" id="Lname" size="40" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div data-testid={'ColourInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Colour">Colour <strong className="required">(required)</strong></label>
                    {colourErr && <ErrorMsg htmlFor="Colour"/>}
                    <input type="text" className="form-control" id="Colour" size="40" placeholder="Red" value={favoriteColor} onChange={(e) => setFavColor(e.target.value)}/>
                </div>
                <div data-testid={'PetSelect'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Pet">Pet Preference <strong className="required">(required)</strong></label>
                    {petErr && <ErrorMsg htmlFor="Pet"/>}
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
                    {/* Unique stuff here: */}
                    <button type="button" className="btn btn-default" onClick={() => editDocument()}>Save Changes</button>
                    <span>{/* For spacing */}  </span>
                    <button type="button" className="btn btn-danger" onClick={() => deleteDocument()}>Delete</button>
                </div>
            </form>
            <br></br>
        </>
    )
}
function ErrorMsg(props) {
    return (
        <>
            <br/>
            <label className="control-label" htmlFor={props.htmlFor}>
            <strong id="title1-error" className="error"><span className="label label-danger"><span className="prefix">Error: </span>This field is required.</span></strong>
            </label>
        </>
    )
  }

export default AdminForm;
