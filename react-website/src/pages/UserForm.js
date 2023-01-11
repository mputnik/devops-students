import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormBase from '../base/FormBase';

function UserForm () {
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
            <FormBase
                handleSubmit={handleSubmit}
                title="Personal Information Form"
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
                <button data-testid={'SubmitBtn'} type="submit" className="btn btn-default">Submit</button>
            </FormBase>
        </>
    )
}


export default UserForm;
