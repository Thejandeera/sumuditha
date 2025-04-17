import { useState, useEffect } from "react";
import "./ShowBookings.css";
import axios from "axios";

function ShowBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Load all bookings when component mounts
    fetchAllBookings();
  }, []);

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

  const handleImageClick = (imageData) => {
    setPreviewImage(imageData);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  // Helper function to convert service IDs to readable names
  const getServiceName = (serviceId) => {
    const serviceMap = {
      "cushion-repair": "Cushion Repair",
      "Seats": "Seats",
      "Carpets": "Carpets",
      "Hood Lining": "Hood Lining",
      "Door aposting": "Door Posting",
      "Steering wheel": "Steering Wheel"
    };
    return serviceMap[serviceId] || serviceId;
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h2>All Bookings</h2>
        <button onClick={fetchAllBookings} className="refresh-button">
          <span className="refresh-icon">↻</span>
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading bookings...</p>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Service</th>
                <th>Fabric</th>
                <th>Date</th>
                <th>Time</th>
                <th>Contact</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="booking-row">
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{getServiceName(booking.service)}</td>
                  <td>{booking.fabricType}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.time}</td>
                  <td>
                    <div className="contact-info">
                      <span className="email">{booking.email}</span>
                      <span className="phone">{booking.phone}</span>
                    </div>
                  </td>
                  <td>
                    {booking.imageData && (
                      <div className="image-cell">
                        <img 
                          src={`data:image/jpeg;base64,${booking.imageData}`} 
                          alt="Customer upload" 
                          className="booking-thumbnail"
                          onClick={() => handleImageClick(booking.imageData)}
                        />
                        <span className="view-icon">🔍</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-bookings">
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No bookings found.</p>
            <button onClick={fetchAllBookings} className="retry-button">Try Again</button>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="image-modal-overlay" onClick={closePreview}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closePreview}>×</button>
            <img 
              src={`data:image/jpeg;base64,${previewImage}`} 
              alt="Enlarged preview" 
              className="enlarged-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBookings;