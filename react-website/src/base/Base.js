import Header from './Header.js'
import Footer from './Footer.js'
import { Outlet } from 'react-router-dom'

function Base () {
    return (
        <div>
            <Header />
            <Outlet />  
            <Footer />
        </div>
    )
}

export default Base;