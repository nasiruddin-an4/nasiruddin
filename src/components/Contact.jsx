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
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-400 text-lg mb-4 tracking-wider"
          >
            || GET IN TOUCH
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-serif text-white mb-8"
          >
            Let's Work Together
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 h-full flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Feel free to reach out. I'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200 mb-1">Email</h4>
                    <a 
                      href="mailto:contact@example.com" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      contact@example.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-green-500/10 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200 mb-1">Phone</h4>
                    <a 
                      href="tel:+1234567890" 
                      className="text-gray-400 hover:text-green-400 transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200 mb-1">Location</h4>
                    <p className="text-gray-400">
                      San Francisco, California
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-700/50">
              <h4 className="font-medium text-gray-200 mb-6">Connect With Me</h4>
              <div className="flex gap-4 flex-wrap">
                {/* Twitter/X */}
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5 }}
                  className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </motion.a>
                
                {/* LinkedIn */}
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5 }}
                  className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                
                {/* GitHub */}
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5 }}
                  className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </motion.a>
                
                {/* Instagram */}
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5 }}
                  className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7.5c-2.486 0-4.5 2.014-4.5 4.5s2.014 4.5 4.5 4.5 4.5-2.014 4.5-4.5-2.014-4.5-4.5-4.5zm0 7.5c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                    <path d="M18 4.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.334 2h9.332C19.637 2 22 4.363 22 7.334v9.332c0 2.971-2.363 5.334-5.334 5.334H7.334C4.363 22 2 19.637 2 16.666V7.334C2 4.363 4.363 2 7.334 2zm9.332 18.666c2.071 0 3.741-1.671 3.741-3.742V7.334c0-2.07-1.67-3.741-3.741-3.741H7.334c-2.071 0-3.741 1.67-3.741 3.741v9.332c0 2.071 1.67 3.742 3.741 3.742h9.332z"/>
                  </svg>
                </motion.a>
                
                {/* YouTube */}
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5 }}
                  className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.582 7.203c-.254-.915-.973-1.636-1.897-1.894C18.034 4.834 12 4.834 12 4.834s-6.033 0-7.685.475c-.924.258-1.643.979-1.897 1.894-.472 1.662-.472 5.132-.472 5.132s0 3.47.472 5.132c.254.915.973 1.636 1.897 1.894 1.652.475 7.685.475 7.685.475s6.033 0 7.685-.475c.924-.258 1.643-.979 1.897-1.894.472-1.662.472-5.132.472-5.132s0-3.47-.472-5.132zm-11.423 8.29V8.177l5.138 3.658-5.138 3.659z"/>
                  </svg>
                </motion.a>
                
                {/* Dribbble */}
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5 }}
                  className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-pink-400 transition-colors"
                  aria-label="Dribbble"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61c1.33 1.645 2.133 3.731 2.133 6.01 0 .29-.012.576-.037.857h-5.012c.073-1.665.094-3.363.094-4.943 0-.666-.023-1.286-.07-1.923zm-11.973 6.96c.084-1.446.213-2.788.367-4.012h3.838c-.047.637-.07 1.257-.07 1.924 0 1.587.022 3.285.096 4.943H6.97c-.055-.282-.087-.57-.087-.865 0-.71.144-1.365.387-1.99H6.63zm8.655.99c-.002.428-.023.865-.064 1.31-.235 2.511-.836 4.271-1.793 4.83-.382.228-.818.34-1.297.34-.475 0-.909-.111-1.289-.335-.959-.56-1.56-2.321-1.795-4.832-.042-.445-.063-.883-.066-1.311-.002-.428-.002-.846-.002-1.252 0-.405.001-.822.004-1.25.001-.429.023-.865.064-1.31.235-2.511.836-4.271 1.793-4.83.382-.228.818-.34 1.297-.34.475 0 .909.111 1.289.335.959.56 1.56 2.321 1.795 4.832.042.445.063.883.066 1.311.002.428.002.846.002 1.252 0 .405-.001.822-.004 1.25zm-5.24 2c.024-.453.051-.917.083-1.39h3.738c.033.471.06.934.085 1.385.039.733.06 1.484.06 2.235 0 .751-.02 1.503-.06 2.236H9.632c-.038-.733-.059-1.485-.059-2.236 0-.753.021-1.506.06-2.24h.009zM7.75 13.95c.054.281.084.57.084.866 0 .711-.145 1.367-.389 1.993.644.848 1.459 1.548 2.376 2.033-.393-1.125-.65-2.413-.769-3.798-.1-.471-.176-.917-.24-1.347H7.839c-.039.42-.067.833-.089 1.251v.002zm7.087 4.893c.918-.486 1.735-1.185 2.379-2.033-.243-.626-.388-1.282-.388-1.993 0-.296.03-.585.083-.866-.022-.417-.05-.831-.088-1.251h-.974c-.064.43-.14.876-.24 1.348-.118 1.383-.375 2.67-.767 3.794l-.005.001zm-3.13-14.667c2.184 0 4.207.735 5.825 1.967-.452-.026-.887-.039-1.291-.039-.905 0-1.695.082-2.37.245-1.317.318-2.008 1.85-2.117 4.702-.571 0-1.155.018-1.755.05-.26-.398-.524-.775-.788-1.131a17.45 17.45 0 0 0 1.637-5.626 8.016 8.016 0 0 1 .86-.168v.001zm-6.61 1.966A9.937 9.937 0 0 1 12 4.176c.254 0 .504.01.75.032a20.05 20.05 0 0 1-1.135 4.028c-2.33-.071-4.51-.007-6.518.19zm3.14 7.884c.052-1.178.144-2.347.27-3.492 1.88-.212 4.146-.258 6.52-.141.09.303.168.62.235.95.068.334.114.668.14 1.001.054.682.083 1.356.083 2.019 0 .67-.028 1.348-.083 2.03-.06.743-.18 1.466-.354 2.157-1.321.02-2.7-.016-4.121-.106.16-.606.282-1.254.361-1.947.058-.507.088-1.016.091-1.518.003-.497.006-1.012.01-1.534.007-.658.12-1.324.318-1.937l.011-.052c-.47.031-.946.086-1.427.172-.019.367-.032.736-.044 1.107-.009.363-.01.723 0 1.082v.021zm-.69 5.852c-.92-.484-1.734-1.183-2.376-2.03.244-.626.389-1.285.389-1.995 0-.296-.03-.584-.084-.866.022-.418.05-.834.09-1.252h.974c.064.429.14.876.24 1.347.118 1.382.377 2.67.771 3.795h-.005z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 h-full flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-8">Send Message</h3>

              {/* Status Messages */}
              {formStatus.submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
                    formStatus.success 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {formStatus.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <p>{formStatus.success ? 'Message sent successfully!' : formStatus.error}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="How can I help you?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message" 
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus.submitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} className={formStatus.submitting ? 'animate-pulse' : ''} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;