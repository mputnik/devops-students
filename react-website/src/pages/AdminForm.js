import { useState, useEffect } from 'react'
import axios from 'axios'
import FormBase from '../base/FormBase';
    
function AdminForm (props) {
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

            const object = JSON.parse(window.localStorage.getItem('token'));

            if(object){
            
                const sendKey = 'Bearer ' + object.token;

                axios({
                    // Full url defined in as proxy in package.json 
                    // TODO: update url when route is decided.
                    url: `/api/admin/edit/${props.docId}`,
                    method: 'PUT',
                    data: body,
                    headers: {Authorization: sendKey}
                })
                    .then(()=>{
                        window.location.href = '/data';
                        console.log('The form data was successfuly sent to the server');
                    })
                    .catch((error)=>{
                        alert("Could not modify from data. Check error logs for more information.");
                        window.location.href = '/data';
                        console.log(`Internal server error: could not send form data to the server.\nError: ${error.message}`);
                    });                
            }else{
                alert("Admin session token has expired. Click the 'Admin sign in' button to sign in as Admin again.");
                window.location.href = '/';
                console.log(`Unable to modify form data, admin session token expired.`);
            }

        }

    }

    function deleteDocument() {
        const object = JSON.parse(window.localStorage.getItem('token'));

        if(object){

            const sendKey = 'Bearer ' + object.token;

            axios({
                // TODO: update url when route is decided.
                url: `/api/admin/delete/${props.docId}`,
                method: 'DELETE',
                headers: {Authorization: sendKey}
            })
                .then(() => {
                    console.log("The document was successfully deleted from the database.");
                    window.location.href = '/data';
                })
                .catch((error) => {
                    alert("Could not delete from data. Check error logs for more information.");
                    window.location.href = '/data';
                    console.log(`Deletion failed.\nError: ${error.message}`);
                });
            }else{
                alert("Admin session token has expired. Click the 'Admin sign in' button to sign in as Admin again.");
                window.location.href = '/';
                console.log(`Unable to delete form data, admin session token expired.`);
            }
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
                <button data-testid="saveChanges" type="button" className="btn btn-default" onClick={() => editDocument()}>Save Changes</button>
                <span>{/* For spacing */}  </span>
                <button data-testid="delete" type="button" className="btn btn-danger" onClick={() => deleteDocument()}>Delete</button>
            </FormBase>
        </>
    )
}

export default AdminForm;
