import Header from './Header.js'
import Footer from './Footer.js'
import { Outlet } from 'react-router-dom'

function Base (props) {
    return (
        <div>
            <Header isAuthenticated={props.isAuthenticated} setAuth={props.setAuth}/>
            <Outlet />  
            <Footer />
        </div>
    )
}

export default Base;