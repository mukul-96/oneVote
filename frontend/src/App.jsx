
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Voting from './Components/Voting';
import SignUp from './Components/SignUp';
import AdminPanel from './Components/AdminPanel';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing></Landing>}></Route>
      <Route path="/voter/voting" element={<Voting></Voting>}></Route>
      <Route path="/voter/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/admin/manage" element={<AdminPanel></AdminPanel>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
