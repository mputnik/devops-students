import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormBase from '../base/FormBase';
    
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
            method: 'DELETE'
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
            <FormBase
                title={`Edit Form Entry ID: ${props.docId}`}
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                favoriteColor={favoriteColor} setFavColor={setFavColor}
                favoritePet={favoritePet} setFavPet={setFavPet}
                message={message} setMessage={setMessage}
                firstNameErr={firstNameErr}
                lastNameErr={lastNameErr}
                colourErr={colourErr}
                petErr={petErr}
            >
                <button type="button" className="btn btn-default" onClick={() => editDocument()}>Save Changes</button>
                <span>{/* For spacing */}  </span>
                <button type="button" className="btn btn-danger" onClick={() => deleteDocument()}>Delete</button>
            </FormBase>
        </>
    )
}

export default AdminForm;
