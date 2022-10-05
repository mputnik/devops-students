import { Link } from 'react-router-dom'

function Confirmation() {
    return (
        <>
            <main property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Confirmation</h1>
                <p>The form has been successfully submitted. Your submission is now saved in the database.</p>
                <p>You can view your entry alongside others on the table page  <a href="/data">here</a>.</p>
                <p><Link to="/" className="btn btn-primary">Return to home page</Link></p>
                <br /> <br /> <br />
            </main>
        </>
    );
}

export default Confirmation;