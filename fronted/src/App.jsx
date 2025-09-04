import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Nav";
import Services from "./Pages/ServiceSection/Service";
import Home from "./Pages/HomeSection/Home";
import Footer from "./components/Layout/Footer";
import StudentRegistration from "./features/Forms/StudentForm";
import GuestSignup from "./features/Forms/GuestSignup";
import ContactPage from "./Pages/Contact/ContactPage";
import AboutSection from "./Pages/About/AboutSection";
import TutorRegistration from "./features/Forms/TutorForm";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton"; // ✅ import

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/student-enroll" element={<StudentRegistration />} />
          <Route path="/tutor-register" element={<TutorRegistration />} />
          <Route path="/guest-register" element={<GuestSignup />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutSection />} />
        </Routes>
        <Footer />

        {/* ✅ WhatsApp floating button */}
        <WhatsAppButton />
      </BrowserRouter>
    </>
  );
}

export default App;
