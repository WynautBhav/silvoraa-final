"use client";
import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, MapPin, Phone, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const subjectOptions = [
  'General Inquiry',
  'Custom Design Request',
  'Wholesale / Partnership',
  'Order Support',
  'Repair & Restoration',
  'Other'
];

export default function ContactClient() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
        setForm(initialForm);
      }
    } catch {
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-silvoraa-gold/40 focus:border-silvoraa-gold transition-all duration-200 text-sm";
  const labelClass = "block text-sm font-sans font-semibold uppercase tracking-[0.08em] text-stone-600 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <div className="relative bg-silvoraa-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-silvoraa-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-gold">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Let&apos;s Create <span className="text-silvoraa-gold">Something</span> Beautiful
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Whether you have a question about our gemstones, need styling advice, or want a custom piece designed just for you — we&apos;re here to help.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-6xl mx-auto">

          <motion.div
            className="lg:col-span-2 space-y-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-8">
                Visit Our Studio
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors duration-300 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-serif text-stone-800 mb-1">Address</h3>
                  <p className="text-stone-500 leading-relaxed text-sm">
                    Silvoraa Jewelry<br />
                    Jaipur, Rajasthan<br />
                    India
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-serif text-stone-800 mb-1">Email</h3>
                  <a href="mailto:hello@silvoraa.com" className="text-stone-500 hover:text-silvoraa-gold transition-colors text-sm">
                    hello@silvoraa.com
                  </a>
                  <br />
                  <a href="mailto:support@silvoraa.com" className="text-stone-500 hover:text-silvoraa-gold transition-colors text-sm">
                    support@silvoraa.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-300 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-serif text-stone-800 mb-1">Phone</h3>
                  <p className="text-stone-500 leading-relaxed text-sm">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="w-full h-px bg-stone-100 my-8" />
              <p className="text-stone-400 text-sm leading-relaxed">
                We typically respond within 24 hours during business days. For urgent inquiries, please mention it in your message.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-3">Thank You</h3>
                  <p className="text-stone-500 mb-8 max-w-sm mx-auto">
                    Your message has been received. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-4 bg-silvoraa-gold text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-deepGold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-stone-500 text-sm mb-8">
                    Fill out the form below and we&apos;ll get back to you shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone (Optional)</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className={labelClass}>Subject</label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B6B6B%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat`}
                        >
                          <option value="" disabled>Select a subject</option>
                          {subjectOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us what you're looking for..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full inline-flex items-center justify-center gap-3 px-10 py-4 bg-silvoraa-gold text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-deepGold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {sending ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>

        </div>

        <motion.div
          className="mt-24 bg-gradient-to-r from-silvoraa-black to-gray-900 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Sparkles className="w-5 h-5 text-silvoraa-gold mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            Prefer a Personal Consultation?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a one-on-one session with our gemology experts. We&apos;ll help you find the perfect piece or design something entirely your own.
          </p>
          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-gold text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold/90 transition-colors"
          >
            Book a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
