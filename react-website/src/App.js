import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Base from './base/Base.js'
import Table from './pages/Table.js';
// import Confirmation from './pages/Confirmation.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          {/* <Route path="confirmation" element={<Confirmation />} /> */}
          <Route path="data" element={<Table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;