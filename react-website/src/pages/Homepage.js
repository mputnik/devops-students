import { Link } from 'react-router-dom'

function Homepage() {

    return (
        <>
            
            <main property="mainContentOfPage" class="container" resource="#wb-main" typeof="WebPageElement"> 
                <Welcome />
                <SubmitForm />
                <br/><br/>
            </main>
        </>
    )
  }
  
  
  
  //Grey box part
  function SubmitForm() {
    return (
        <>
            <h2>Submit information by phone</h2>
            <p>Call 1-613-RESERVE (1-613-737-3783)<br/>
               Office hours from 8am to 6pm Eastern Time
            </p>
  
            <p>Outside of Canada 519-826-5391</p>
            <p>For general information, please call the Health Canada information line at 1-888-773-8888</p>
  
  
            <Link to="/" className="btn btn-primary">Submit Online</Link>
        </>
    )
  }
  
  function Welcome() {
    return (
    <>
        <h1>Welcome to our Form App</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </>
     )      
  }
  
  
  export default Homepage;