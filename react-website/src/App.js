import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Base from './base/Base.js'
import Table from './pages/table/Table.js';
import Form from './pages/Form.js'
import Homepage from './pages/Homepage.js'
import Confirmation from './pages/Confirmation.js'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route path="data" element={<Table />} />
          <Route index element={<Homepage />}/>
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="form" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;