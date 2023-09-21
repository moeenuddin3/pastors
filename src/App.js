import './App.css';
import { Routes, Route } from "react-router-dom"
import Main from './pages/main';
import Modal from './pages/modal';

function App() {
  return (
    <div className='App'>
      <Main/>
      <Routes>
        <Route path="/modal/:modalTitle" element={<Modal />} />
      </Routes>
    </div>
  );
}

export default App;
