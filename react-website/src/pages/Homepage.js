import { Link } from 'react-router-dom'
import {GreyBox} from './HomepageElements';

function Homepage() {

    return (
        <>
            <main property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement"> 
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
        <GreyBox>
            <b><p>Submit information by phone</p></b>
            <p>Call 1-613-RESERVE (1-613-737-3783)<br/>
               Office hours from 8am to 6pm Eastern Time
            </p>
  
            <p>Outside of Canada 519-826-5391</p>
            <p>For general information, please call the Health Canada information line at 1-888-773-8888</p>
  
  
            <Link to="/form" className="btn btn-primary">Submit Online</Link>
            </GreyBox>
        </>
    )
  }
  
  function Welcome() {
    return (
    <>
        <h1>Health Canada Form App</h1>
        <p>
        Health Canada is the Federal department responsible for helping
         Canadians maintain and improve their health, while respecting 
         individual choices and circumstances.
        </p>
        <p>Welcome to our form app. This portal will take you to a form where 
            you can fill out information about yourself, and save that data to
             a database.
        </p>
    </>
     )      
  }
  
  
  export default Homepage;