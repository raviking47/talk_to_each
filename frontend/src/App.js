import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Page/Homepage';
import Chatapage from './Page/Chatapage';

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/' element={<Homepage/>}/>
      <Route path='/chat' element={<Chatapage/>}/>
     </Routes>

    </div>
  );
}
export default App; 
