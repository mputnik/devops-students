

function Form () {
    return(
        <>
            <form property="mainContentOfPage" class="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Personal Information Form</h1>
                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                    <label class="control-label required" for="Fname">First Name</label>
                    <input type="text" class="form-control" id="Fname" size="40"/>
                </div>
                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                    <label class="control-label required" for="Lname">Last Name</label>
                    <input type="text" class="form-control" id="Lname" size="40"/>
                </div>
                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                    <label class="control-label required" for="Colour">Colour</label>
                    <input type="text" class="form-control" id="Colour" size="40"/>
                </div>
                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                    <label class="control-label required" for="Colour">Pet Preference</label>
                    <select class="form-control" id="Colour">
                        <option>Dog</option>
                        <option>Cat</option>
                    </select>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label class="control-label" for="feedback">Nice Message</label>
                    <textarea class="form-control" rows={5} cols={50} id="feedback" placeholder="Add message for cookie."></textarea>
                    <br></br>
                    <button type="submit" class="btn btn-default">Submit</button>
                </div>
            </form>
            <br></br>
        </>
    )
}

export default Form;