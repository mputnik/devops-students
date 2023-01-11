import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminSignIn() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    
    const [userErr, setUserErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [loginFailedErr, setLoginFailedErr] = useState(false);

    function handleSubmit (event) {
        event.preventDefault();
        
        setUserErr(user === "");
        setPasswordErr(password === "");

        if(user !== "" && password !== ""){
            const body = {
                username: user,
                password: password,
            };

            axios({
                // Full url defined in as proxy in package.json 
                url: '/api/admin/login',
                method: 'POST',
                data: body
            })
                .then((res)=>{
                    window.location.href= "/data";
                    window.localStorage.setItem('token', JSON.stringify(res.data));
                    console.log('Sign in successful');
                })
                .catch((error)=>{
                    setLoginFailedErr(true);
                    setPassword("");
                    if(error.response){
                        console.log(error.response.data);
                    }
                    console.log('Admin sign in failed');
                });
        }

    }
    return (
        <>
            <form id='form' onSubmit={(e) => handleSubmit(e)} property="mainContentOfPage" className="container" resource="#wb-main" typeof="WebPageElement">
                <h1>Enter Username & Password</h1>
                <div data-testid={'adminUsername'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label data-testid={'adminUsernameLabel'} className="control-label required" htmlFor="User">Username <strong className="required">(required)</strong></label>
                    {userErr && <ErrorMsg htmlFor="User"/>}
                    <input type="text" className="form-control" id="User" size="40" placeholder="" value={user} onChange={(e) => setUser(e.target.value)}/>
                </div>
                <div data-testid={'adminPass'} className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label data-testid={'adminPassLabel'} className="control-label required" htmlFor="Password">Password <strong className="required">(required)</strong></label>
                    {passwordErr && <ErrorMsg htmlFor="Password"/>}
                    <input type="password" className="form-control" id="Password" size="40" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <br></br>
                    <button data-testid={'SignInBtn'} type="submit" className="btn btn-default">Sign In </button>
                </div>
                <div>{loginFailedErr && <LoginFailedMsg htmlFor="LoginFailed"/>}</div>
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

function LoginFailedMsg(props) {
    return (
        <>
            <br/>
            <label className="control-label" htmlFor={props.htmlFor}>
            <strong id="title1-error" className="error"><span className="label label-danger"><span className="prefix">Error: </span>incorrect username or password.</span></strong>
            </label>
        </>
    )
}
export default AdminSignIn;