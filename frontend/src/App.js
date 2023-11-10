import {Routes, Route} from "react-router-dom";
import Aboutme  from "./pages/about";
import Login from "./pages/login";
import Upload from "./pages/upload";
import Result from "./pages/displayresult";
import Myclass from "./pages/myclass";
import Test from "./pages/test";
import Signup  from "./pages/signup";
import AddStudent from "./pages/addstudent";
import Register from "./pages/signup";

import './App.css';

function App() {
  return (
    <>
    <Routes>
      
      <Route path="/about" element={<Aboutme />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/upload" element={<Upload />}></Route>
      <Route path="/myclass" element={<Myclass />}></Route>
      <Route path="/result" element={<Result />}></Route>
      <Route path="/addstudent" element={<AddStudent />}></Route>
      <Route path="/test" element={<Test />}></Route>
      <Route path="/signup" element={<Register/>}></Route>
      <Route path="/home" element={<Login />}></Route>
      
    </Routes>
    </>
  );
}

export default App;
