import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h1>Get in Touch</h1>
            <p className="section-subtitle">Connect with our team for any inquiries</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-method">
                <div className="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Visit Us</h3>
                  <p>123 Business Avenue</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Email Us</h3>
                  <p>contact@business.com</p>
                  <p>support@business.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri: 9am - 5pm EST</p>
                </div>
              </div>
            </div>

            <div className="map-container">
              <iframe
                title="Business Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s123%20Example%20St%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1616209613771!5m2!1sen!2sus"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;