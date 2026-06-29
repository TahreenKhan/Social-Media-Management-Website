import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../config';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Full Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.phone) tempErrors.phone = "Phone Number is required";
    if (!formData.service) tempErrors.service = "Please select a service";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.contact.email}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            _subject: `New Enquiry from ${formData.name}`,
            _template: 'table'
          })
        });

        if (response.ok) {
          setIsSuccess(true);
          setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        console.error("Submission failed, using mailto fallback", err);
        // Fallback for formsubmit failure
        const fallbackMessage = `Hi! I'm interested in an Enquiry.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AService: ${formData.service}%0AMessage: ${formData.message}`;
        window.location.href = `mailto:${siteConfig.contact.email}?subject=Enquiry from ${formData.name}&body=${fallbackMessage}`;
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-container">
        
        <div className="contact-info">
          <h2>Let's Engineer Your Growth</h2>
          <p>Ready to dominate your market? Reach out to our ecosystem architects and let's construct a digital presence that converts.</p>
          
          <div className="social-icons" style={{ marginTop: '2rem' }}>
            <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#E1306C' }}><FaInstagram size={24} /></a>
            <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#1877F2' }}><FaFacebookF size={24} /></a>
            <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#0A66C2' }}><FaLinkedinIn size={24} /></a>
            <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#25D366' }}><FaWhatsapp size={24} /></a>
          </div>
        </div>

        <div className="contact-form">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Fill Form For Enquiry</h3>
          
          {isSuccess ? (
            <div className="form-success">
              <h4 style={{ marginBottom: '0.5rem' }}>Thank You!</h4>
              <p>Your enquiry has been received. Our team will contact you shortly.</p>
              <button className="btn btn-outline" style={{ marginTop: '1rem', background: 'white' }} onClick={() => setIsSuccess(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="John Doe" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="john@company.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="+91 98765 43210" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Service Interested In</label>
                <select name="service" value={formData.service} onChange={handleChange} className="form-control">
                  <option value="">Select a Service</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Content Creation">Content Creation</option>
                  <option value="Paid Advertising">Paid Advertising</option>
                  <option value="Branding">Branding Strategy</option>
                  <option value="Video Production">Video Production</option>
                </select>
                {errors.service && <span className="form-error">{errors.service}</span>}
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="4" placeholder="Tell us about your project..."></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contact;
