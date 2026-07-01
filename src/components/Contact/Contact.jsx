import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../config/supabase';
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
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

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
    if (!validate()) {
      showToast("Please check the form for validation errors.", "error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Save submission to Supabase
      const { data, error: dbError } = await supabase
        .from('inquiries')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      // 2. Send email notification using EmailJS
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          throw new Error("EmailJS environment variables are missing");
        }

        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              phone_number: formData.phone,
              service_interested: formData.service,
              message: formData.message,
              full_name: formData.name,
              email: formData.email,
              phone: formData.phone,
              service: formData.service
            }
          })
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          throw new Error(errText || 'Failed to send email notification');
        }

        showToast("Enquiry submitted successfully!", "success");
      } catch (emailErr) {
        console.error("EmailJS notification failed:", emailErr);
        // Saved in Supabase successfully, but EmailJS failed
        showToast("Enquiry saved, but email notification failed to send.", "warning");
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (dbErr) {
      console.error("Supabase submission failed:", dbErr);
      showToast(dbErr.message || "Failed to submit enquiry. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 99999,
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: toast.type === 'success' 
                ? '1px solid rgba(74, 222, 128, 0.3)' 
                : toast.type === 'warning'
                ? '1px solid rgba(234, 179, 8, 0.3)'
                : '1px solid rgba(139, 0, 0, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--text-primary)',
              maxWidth: '350px'
            }}
          >
            {toast.type === 'success' && <CheckCircle size={18} style={{ color: '#22c55e', flexShrink: 0 }} />}
            {toast.type === 'warning' && <AlertCircle size={18} style={{ color: '#eab308', flexShrink: 0 }} />}
            {toast.type === 'error' && <AlertCircle size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />}
            <span style={{ fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.4 }}>
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
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
