import SignUp from "./Components/SignUp"
import BloodInventory from "./Components/Inventory"
import BloodRequestForm from "./Components/BloodReq"
import { Route, Routes } from "react-router-dom"
import About from "./Components/About"
import Certification from "./Components/Certification"
import Donors from "./Components/Donors"
function App() {

  return (
    <>
     <Routes>
      <Route exact path="/" Component={BloodInventory}/>
      <Route path="/donors" Component={Donors}/>
      <Route path="/certification" Component={Certification}/>
      <Route path="/about" Component={About}/>
      <Route path='/BloodReq' Component={BloodRequestForm} />
      <Route path="/sign-up" Component={SignUp}></Route>
     </Routes>
    </>
  )
}

export default App
