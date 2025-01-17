import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import  Home  from "./pages/Home.jsx"
import  Layout  from "./components/Layout.jsx"
import  Dashboard  from "./pages/Dashboard.jsx"
import  Appointment from "./pages/Appointment.jsx"
import { StaffLogin } from "./pages/Stafflogin.jsx"
import ProfilePage from "./pages/Profilepage.jsx"
import LogoutPage from "./pages/Logout.jsx"
import StaffPage from "./pages/StaffPage.jsx"
import Messages from "./pages/Messages.jsx"
import "react-datepicker/dist/react-datepicker.js"
import StaffPatients from "./pages/StaffPatients.jsx"
import StaffStaff from "./pages/Staffstaff.jsx"
import StaffAppointments from "./pages/StaffAppointments.jsx"
import AuthProvider from "./contexts/AuthContext.jsx"


function App() {

  return (
    <AuthProvider>
    <Layout>
        <Routes>
          <Route path="login" element={<Login/>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route index element={<Home/>}></Route>
          <Route path="dashboard" element={<Dashboard/>}></Route>
          <Route path="appointment" element={<Appointment/>}></Route>
          <Route path="stafflogin" element={<StaffLogin/>}></Route>
          <Route path="profilepage" element={<ProfilePage/>}></Route>
          <Route path="logout" element={<LogoutPage/>}></Route>
          <Route path="staffpage" element={<StaffPage/>}></Route>
          <Route path="messages" element={<Messages/>}></Route>
          <Route path="staffpatients" element={<StaffPatients/>}></Route>
          <Route path="staffstaff" element={<StaffStaff/>}></Route>
          <Route path="staffappointments" element={<StaffAppointments/>}></Route>
        </Routes>
    </Layout>
    </AuthProvider>
  )
}

export default App
