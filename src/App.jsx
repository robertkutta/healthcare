import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register.jsx"
import  Home  from "./pages/Home.jsx"
import  Layout  from "./components/Layout.jsx"
import  Dashboard  from "./pages/Dashboard.jsx"
import  Appointment from "./pages/Appointment.jsx"
import  StaffLogin  from "./pages/StaffLogin.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import LogoutPage from "./pages/Logout.jsx"
import StaffPage from "./pages/StaffPage.jsx"
import Messages from "./pages/Messages.jsx"
import "react-datepicker/dist/react-datepicker.js"
import StaffPatients from "./pages/StaffPatients.jsx"
import StaffStaff from "./pages/Staffstaff.jsx"
import StaffAppointments from "./pages/StaffAppointments.jsx"
import AuthProvider from "./contexts/AuthContext.jsx"
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Layout>
          <Routes>
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
    </ QueryClientProvider>
  )
}

export default App
