

function Form () {
    return(
        <>
            <form property="mainContentOfPage" class="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Personal Information Form</h1>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                    <label class="control-label required" for="Fname">First Name</label>
                    <input type="text" class="form-control" id="Fname" size="35"/>
                </div>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                    <label class="control-label required" for="Lname">Last Name</label>
                    <input type="text" class="form-control" id="Lname" size="35"/>
                </div>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                    <label class="control-label required" for="Colour">Colour</label>
                    <input type="text" class="form-control" id="Colour" size="35"/>
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-12">
                    <fieldset class="gc-chckbxrdio">
                    <legend class="required">Which is your favorite pet?</legend>
                        <ul class="list-unstyled lst-spcd-2">
                            <li class="radio">
			                    <input type="radio" name="animal" id="Dog"/>
			                    <label for="Dog">Dog</label>
		                    </li>
                            <li class="radio">
			                    <input type="radio" name="animal" id="Cat"/>
			                    <label for="Cat">Cat</label>
		                    </li>
                        </ul>
                    </fieldset>
                </div>
                <div className="form-group">
                    <textarea class="form-control" rows={5} cols={50} id="feedback" placeholder="Add message for cookie.">
                        This is simple textarea
                    </textarea>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </>
    )
}

export default Form;