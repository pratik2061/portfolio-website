import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      toast.success("Email copied to clipboard!");
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast.success("Phone number copied to clipboard!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = formData;

    if (!firstName || !lastName || !email || !subject || !message) {
      toast.error("Please complete all required form fields.");
      return;
    }

    const mailtoLink = `mailto:pratiksharma2061@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    toast.success("Opening default email client...");
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider block mb-1">
              05. Communication Channels
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-sans tracking-tight">
              Get In Touch & Hiring Inquiries
            </h2>
          </div>
          <MessageSquare className="w-5 h-5 text-stone-600 hidden sm:block" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="doc-card p-6 sm:p-8 bg-white space-y-6">
              <h3 className="text-lg font-bold text-stone-900 font-sans">
                Direct Contact Channels
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                Available for full-time software engineering roles, DevOps consulting, and contract assignments.
              </p>

              <div className="space-y-3 pt-2">
                {/* Email Item */}
                <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-stone-200/90 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-4 h-4 text-stone-600 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono text-stone-600 uppercase font-semibold">Email</div>
                      <div className="text-xs sm:text-sm font-medium text-stone-900 truncate">pratiksharma2061@gmail.com</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("pratiksharma2061@gmail.com", "email")}
                    className="p-1.5 rounded bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-stone-200/90 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-stone-600 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-stone-600 uppercase font-semibold">Phone</div>
                      <div className="text-xs sm:text-sm font-medium text-stone-900">+977-9840697481</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("+977-9840697481", "phone")}
                    className="p-1.5 rounded bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-stone-200/90 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-stone-600 shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-stone-600 uppercase font-semibold">Location</div>
                    <div className="text-xs sm:text-sm font-medium text-stone-900">Butwal-8, Kalikanagar, Nepal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="doc-card p-6 sm:p-8 bg-white">
              <h3 className="text-lg font-bold text-stone-900 font-sans mb-6">
                Send Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-700 font-semibold uppercase mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Jane"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-700 font-semibold uppercase mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Smith"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-700 font-semibold uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-700 font-semibold uppercase mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Software Engineer Role / Project Opportunity"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-700 font-semibold uppercase mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Briefly describe the project scope or role requirements..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-stone-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message via Mail Client</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
