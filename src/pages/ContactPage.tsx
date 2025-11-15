import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Send } from 'lucide-react';
import Header from '@/components/ui/Header';
import { useContactForm } from '@/hooks/useContactForm';

const ContactPage = () => {
  const { submitContactForm, isSubmitting, isSuccess } = useContactForm();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [hasTyped, setHasTyped] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Show send button when user starts typing
    if (!hasTyped && value.trim()) {
      setHasTyped(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submitContactForm(formData);

    if (success) {
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setHasTyped(false);
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:saj.query@gmail.com';
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-off-white to-light-gray">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-white hover:text-cream transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Home</span>
                </Link>
              </div>

              {/* Page Title */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <Mail className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold animate-fade-in">
                  Get in Touch
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                We'd love to hear from you
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                Have a question or need assistance? Contact our team
              </p>
            </div>
          </div>
        </section>

        {/* Contact Buttons Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Email Us Button */}
                <button
                  onClick={handleEmailClick}
                  className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-rose-gold/30 transition-colors">
                    <Mail className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-2xl font-semibold text-charcoal mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <p className="text-rose-gold-dark font-medium">
                    saj.query@gmail.com
                  </p>
                </button>

                {/* Call Us Button */}
                <a
                  href="tel:+919876543210"
                  className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-rose-gold/30 transition-colors">
                    <Phone className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-2xl font-semibold text-charcoal mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Speak directly with our customer service team
                  </p>
                  <p className="text-rose-gold-dark font-medium">
                    +91 98765 43210
                  </p>
                </a>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-6 text-center">
                  Send Us a Message
                </h2>

                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-center font-medium">
                      Thank you for contacting us! We'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-rose-gold-dark">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-rose-gold-dark">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-rose-gold-dark">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-all"
                      placeholder="What is this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-rose-gold-dark">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button with Animation */}
                  {hasTyped && (
                    <div className="animate-slide-in-bottom">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-rose-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                  We'll respond to your inquiry within 24 business hours
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes slide-in-bottom {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default ContactPage;
