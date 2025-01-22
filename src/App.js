import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Status from './components/Status';

function App() {
  return (
    <div>
     


      <Routes>
        <Route path='/' element ={ <Home />}/>
        <Route path='/status' element={<Status/>} />
      </Routes>
      
    </div>
  );
}

export default App;
