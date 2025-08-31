import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Nav";

// Dummy Pages
// import About from "./pages/About";
import Services from "./Pages/ServiceSection/Service";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Home from "./Pages/HomeSection/Home";
import Footer from "./components/Layout/Footer";
import StudentForm from "./features/Forms/StudentForm";
import TutorForm from "./features/Forms/TutorForm";
import StudentRegistration from "./features/Forms/StudentForm";
import GuestSignup from "./features/Forms/GuestSignup";
import ContactPage from "./Pages/Contact/ContactPage";
import About from "./Pages/About/About";
import AboutSection from "./Pages/About/AboutSection";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/services" element={<Services />} />
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/student-enroll" element={<StudentRegistration />}/>
          <Route path="/tutor-register" element={<TutorForm />}/>
          <Route path="/guest-register" element={<GuestSignup />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/about" element={<AboutSection />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
