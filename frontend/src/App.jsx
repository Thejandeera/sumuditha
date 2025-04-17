import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Booking from "./Pages/Booking";
import ContactPage from "./Pages/ContactPage";


// Simple placeholder components
function Services() {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>We offer a variety of services to meet your needs.</p>
    </div>
  );
}

// The original Contact component is now replaced with ContactPage
// But we'll keep it as a backup in case you need it
function OldContact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you!</p>
      <p><strong>Email:</strong> info@example.com</p>
      <p><strong>Phone:</strong> (555) 123-4567</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Updated to use ContactPage */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;