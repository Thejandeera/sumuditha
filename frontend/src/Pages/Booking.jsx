import { useState, useEffect } from "react";
import "./Booking.css";
import axios from "axios";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "cushion-repair",
    fabricType: "",
    measurements: "",
    date: "",
    time: "",
    notes: "",
    imageData: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  
  useEffect(() => {
    // Load all bookings when component mounts
    if (showBookings) {
      fetchAllBookings();
    }
  }, [showBookings]);

  const fetchAllBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to load bookings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store base64 string without the prefix
        const base64String = reader.result.split(',')[1];
        setFormData(prev => ({
          ...prev,
          imageData: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:8080/api/bookings", formData);
      console.log("Booking saved:", response.data);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "cushion-repair",
          fabricType: "",
          measurements: "",
          date: "",
          time: "",
          notes: "",
          imageData: ""
        });
      }, 3000);
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    { id: "cushion-repair", name: "Cushion Repair" },
    { id: "Seats", name: "Seats" },
    { id: "Carpets", name: "Carpets" },
    { id: "Hood Lining", name: "Hood Lining" },
    { id: "Door aposting", name: "Door aposting" }, 
    { id: "Steering wheel", name: "Steering wheel" },
  ];
  
  const fabricTypes = [
    "Cotton",
    "Linen",
    "Velvet",
    "Leather",
    "Synthetic Blend",
    "Other"
  ];
  
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      const hourStr = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? "AM" : "PM";
      slots.push(`${hourStr}:00 ${period}`);
      slots.push(`${hourStr}:30 ${period}`);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="booking-header">
          <h1>Yenlanka Cushion Works</h1>
          <p>Schedule Your Cushion Consultation & Service</p>
          <div className="view-bookings">
            <button 
              onClick={() => setShowBookings(!showBookings)} 
              className="view-bookings-btn"
            >
              {showBookings ? "Hide Bookings" : "View All Bookings"}
            </button>
          </div>
        </div>
        
        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Thank you, {formData.name}! Your appointment for {formData.service} on {formData.date} at {formData.time} has been scheduled. We'll contact you at {formData.email}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Service Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Select Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fabricType">Fabric Type</label>
                  <select
                    id="fabricType"
                    name="fabricType"
                    value={formData.fabricType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Fabric Type</option>
                    {fabricTypes.map(fabric => (
                      <option key={fabric} value={fabric}>
                        {fabric}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="measurements">Cushion/Furniture Measurements</label>
                <input
                  type="text"
                  id="measurements"
                  name="measurements"
                  value={formData.measurements}
                  onChange={handleChange}
                  placeholder="e.g., 24x24 inches, 3-seater sofa"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Image Upload</h3>
              <div className="form-group image-upload">
                <label htmlFor="image">Upload Item Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-upload"
                />
                {formData.imageData && (
                  <div className="image-preview">
                    <p>Image Preview:</p>
                    <img 
                      src={`data:image/jpeg;base64,${formData.imageData}`} 
                      alt="Preview" 
                      className="preview-img" 
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Additional Information</h3>
              <div className="form-group">
                <label htmlFor="notes">Special Instructions</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific requirements or additional details about your cushion work?"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="booking-footer">
              <p className="booking-notice">By booking an appointment, you agree to our <a href="#">terms of service</a> and <a href="#">cancellation policy</a>.</p>
              <button 
                type="submit" 
                className="book-button"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Confirm Consultation"}
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="booking-info">
        <h3>Why Choose Yenlanka Cushion Works</h3>
        <ul>
          <li>Expert craftsmanship with 20+ years of experience</li>
          <li>Custom solutions for all furniture types</li>
          <li>High-quality materials and fabrics</li>
          <li>Competitive pricing</li>
          <li>Free initial consultation</li>
        </ul>
        <h3>Need Help?</h3>
        <p>Contact us at <strong>(555) 987-6543</strong> or email <strong>support@yenlankacushions.com</strong></p>
      </div>
    </div>
  );
}

export default Booking;