import { useNavigate } from 'react-router-dom'

function Form () {
    // Something something react's rule of hooks.
    const navigate = useNavigate();
    
    function handleSubmit () {
        // Potentially, code here for processing form data before POST to server/db.
        navigate("/confirmation");
    }

    return(
        <>
            <form onSubmit={handleSubmit} property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Personal Information Form</h1>
                <div data-testid={'FnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Fname">First Name</label>
                    <input type="text" className="form-control" id="Fname" size="40" placeholder="John"/>
                </div>
                <div data-testid={'LnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Lname">Last Name</label>
                    <input type="text" className="form-control" id="Lname" size="40" placeholder="Doe"/>
                </div>
                <div data-testid={'ColourInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Colour">Colour</label>
                    <input type="text" className="form-control" id="Colour" size="40" placeholder="Red"/>
                </div>
                <div data-testid={'PetSelect'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label required" htmlFor="Pet">Pet Preference</label>
                    <select className="form-control" id="Pet">
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

export default Form;