import Signup from "./components/Signup"
import Login from "./components/Login"
import Category from "./components/Category"
import {HashRouter  , Route,Routes } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div>
       <HashRouter >
      <Routes>
        <Route path="/signup"  element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Category />} />
      </Routes>
    </HashRouter >
    </div>
  )
}

export default App;
