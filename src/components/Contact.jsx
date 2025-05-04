import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(prev => ({ ...prev, submitting: true }));

    try {
      const response = await axios.post('/api/contact', formData);
      setFormStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: null
      });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a question or want to work together? Feel free to contact me!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Feel free to reach out to me through any of these channels. I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Phone</h4>
                  <a 
                    href="tel:+1234567890" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    San Francisco, California
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-medium text-lg mb-4">Find me on</h4>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="mailto:contact@example.com" aria-label="Email"
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              
              {formStatus.submitted && formStatus.success && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-2">
                  <CheckCircle size={20} />
                  <p>Thank you! Your message has been sent successfully.</p>
                </div>
              )}
              
              {formStatus.submitted && !formStatus.success && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-2">
                  <AlertCircle size={20} />
                  <p>{formStatus.error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message" 
                    name="message" 
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-colors"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;