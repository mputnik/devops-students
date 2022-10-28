import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Base from './base/Base.js'
import Table from './pages/Table.js'
import Form from './pages/Form.js'
import Homepage from './pages/Homepage.js'
import Confirmation from './pages/Confirmation.js'
import AdminSignIn  from './pages/AdminSignIn.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const object = JSON.parse(window.localStorage.getItem('token'))

    if(object){
      //Authorization Header is used to sent token to backend API
      //format: Bearer <key>
      const sendKey = 'Bearer ' + object.token

      axios({
        url: '/api/admin/is-auth',
        method: 'POST',
        headers: {Authorization: sendKey}
      })
      .then((res) => {
        setAuthenticated(res.status === 200)
      })
      .catch((error) => {
        console.log('could not authenticate')
      })
    }

}, []);//end useEffect


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base isAuthenticated={authenticated} setAuth={setAuthenticated}/>}>
          <Route path="data" element={<Table />} />
          <Route index element={<Homepage />}/>
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="form" element={<Form />} />
          <Route path="admin/sign-in" element={<AdminSignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;