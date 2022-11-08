function FormBase (props) {
    return (
        <>
            <form id='form' onSubmit={(e) => props.handleSubmit(e)} property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement">
                <h1>{props.title}</h1>
                <div data-testid={'FnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label data-testid={'FnameLabel'} className="control-label required" htmlFor="Fname">First Name <strong className="required">(required)</strong></label>
                    {props.firstNameErr && <ErrorMsg htmlFor="Fname"/>}
                    <input type="text" className="form-control" id="Fname" size="40" placeholder="John" value={props.firstName} onChange={(e) => props.setFirstName(e.target.value)}/>
                </div>
                <div data-testid={'LnameInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label data-testid={'LnameLabel'} className="control-label required" htmlFor="Lname">Last Name <strong className="required">(required)</strong></label>
                    {props.lastNameErr && <ErrorMsg htmlFor="Lname"/>}
                    <input type="text" className="form-control" id="Lname" size="40" placeholder="Doe" value={props.lastName} onChange={(e) => props.setLastName(e.target.value)}/>
                </div>
                <div data-testid={'ColourInput'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label data-testid={'ColourLabel'} className="control-label required" htmlFor="Colour">Colour <strong className="required">(required)</strong></label>
                    {props.colourErr && <ErrorMsg htmlFor="Colour"/>}
                    <input type="text" className="form-control" id="Colour" size="40" placeholder="Red" value={props.favoriteColor} onChange={(e) => props.setFavColor(e.target.value)}/>
                </div>
                <div data-testid={'PetSelect'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label data-testid={'PetLabel'} className="control-label required" htmlFor="Pet">Pet Preference <strong className="required">(required)</strong></label>
                    {props.petErr && <ErrorMsg htmlFor="Pet"/>}
                    <select className="form-control" id="Pet" value={props.favoritePet} onChange={(e) => props.setFavPet(e.target.value)}>
                        <option value=""></option>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Fish</option>
                    </select>
                </div>
                <div data-testid={'msgBox'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label className="control-label" htmlFor="feedback">Nice Message</label>
                    <textarea className="form-control" rows={5} cols={50} id="feedback" placeholder="Add message for cookie." value={props.message} onChange={(e) => props.setMessage(e.target.value)}/>
                    <br></br>
                    {/* Unique stuff here: */}
                    {props.children}
                </div>
            </form>
            <br></br>
        </>
    );
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

export default FormBase;