import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>
          <p className="section-subtitle">Let's discuss your next project or just say hi!</p>
        </div>

        <div className="contact-single">
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-form glass"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-primary form-submit">
              Send Message <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
