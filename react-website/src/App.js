import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Base from './base/Base.js'
import Table from './pages/Table.js'
import Form from './pages/Form.js'
import Homepage from './pages/Homepage.js'
import Confirmation from './pages/Confirmation.js'
import AdminForm from './pages/AdminForm.js'


function App() {
  const [docId, setDocId] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route path="data" element={<Table setDocId={setDocId} />} />
          <Route index element={<Homepage />}/>
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="form" element={<Form />} />
          <Route path="admin-form" element={<AdminForm docId={docId} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;