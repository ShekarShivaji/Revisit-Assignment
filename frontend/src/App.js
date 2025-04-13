import Signup from "./components/Signup"
import Login from "./components/Login"
import Category from "./components/Category"
import {BrowserRouter , Route,Routes } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/signup"  element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Category />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
