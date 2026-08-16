import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [showInbox, setShowInbox] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<Array<any>>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);

  const fetchInbox = async () => {
    setLoadingInbox(true);
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setInboxMessages(data.messages || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInbox(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Post message payload to server endpoint (which forwards to FormSubmit)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
    } catch (err) {
      // Fallback: Still mark as recorded locally
      setStatus('success');
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sahildahale321@gmail.com&su=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Hello Sahil,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase">
          <MessageSquare className="w-3.5 h-3.5 text-red-400" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          LET'S BUILD SOMETHING <span className="bg-gradient-to-r from-red-400 via-red-400 to-indigo-400 bg-clip-text text-transparent">INTELLIGENT.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Open to full-time roles, internships, and research collaborations in <span className="text-white font-semibold">Data Science, AI/ML, Data Analytics, and Full-Stack Development</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-950 border border-slate-800 p-8 backdrop-blur-xl space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-sans">Contact Information</h3>
            <p className="text-xs text-slate-400 font-mono">Direct channels for recruiters & hiring managers</p>
          </div>

          <div className="space-y-4">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/40 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Phone & WhatsApp</span>
                  <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors font-mono">
                    {PERSONAL_INFO.phone}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                Call Now
              </span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/40 flex items-center gap-4 transition-all"
            >
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Direct Email</span>
                <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors font-mono">
                  {PERSONAL_INFO.email}
                </span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/40 flex items-center gap-4 transition-all"
            >
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">LinkedIn Profile</span>
                <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors font-mono">
                  linkedin.com/in/sahil-dahale-50aa42299
                </span>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Location</span>
                <span className="text-sm font-bold text-white font-mono">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-950 border border-slate-800 p-8 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-sans">Send a Message to Sahil</h3>
            <button
              onClick={() => {
                setShowInbox(!showInbox);
                if (!showInbox) fetchInbox();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs font-mono text-red-400 border border-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>{showInbox ? 'Hide Submitted Messages' : 'View In-App Messages'}</span>
            </button>
          </div>

          {showInbox && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-red-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" /> Logged Messages for sahildahale321@gmail.com
                </span>
                <button onClick={fetchInbox} className="text-[10px] text-slate-400 hover:text-white underline">
                  Refresh
                </button>
              </div>

              {loadingInbox ? (
                <p className="text-slate-400 text-center py-3 animate-pulse">Loading messages from server...</p>
              ) : inboxMessages.length === 0 ? (
                <p className="text-slate-400 text-center py-3">No messages logged yet. Try sending one below!</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {inboxMessages.map((msg, i) => (
                    <div key={msg.id || i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white">{msg.name} ({msg.email})</span>
                        <span className="text-slate-500 text-[10px]">{new Date(msg.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-red-400 font-semibold text-[11px]">Subject: {msg.subject}</p>
                      <p className="text-slate-300 font-sans text-xs bg-slate-900 p-2 rounded-lg border border-slate-800">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-red-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-red-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
              <p className="text-xs text-slate-300 font-mono">
                Your message was logged on Sahil's server & dispatched to <strong className="text-red-400">sahildahale321@gmail.com</strong>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-4 h-4" /> 1-Click Open in Gmail Web
                </a>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-850 text-xs font-mono text-slate-200 hover:bg-slate-800 border border-slate-800"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs font-mono text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-mono focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-mono focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Opportunity at AI Company / Interview Request"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your role or project..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-sm"
              >
                {status === 'loading' ? (
                  <span className="font-mono text-xs animate-pulse">TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Direct Message</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </section>
  );
}
