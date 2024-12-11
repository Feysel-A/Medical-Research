import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import AddPatient from "./Pages/AddPatient/AddPatient";
import Patients from "./Pages/Patients/Patients";
import SinglePatientDetail from "./Pages/SinglePatient/SinglePatient";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/view-patient/:patientId"
          element={<SinglePatientDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
