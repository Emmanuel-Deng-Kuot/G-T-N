import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">

        {/* Mobile: stack vertically — Desktop: side by side */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Left: Logo card + contact info */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-120 lg:shrink-0">

            {/* Logo card */}
            <div
              className="w-full rounded-3xl flex items-center justify-center"
              style={{
                height: "200px",
                background: "#2D2B6B",
              }}
            >
              <span
                className="text-white font-black tracking-tight leading-none select-none"
                style={{ fontSize: "clamp(48px, 12vw, 80px)", fontFamily: "monospace" }}
              >
                G\T\N
              </span>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4 lg:gap-5 px-1 lg:px-2">

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 lg:text-xl">contact@mangstore.com</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 lg:text-xl">(+62) 857 123 321 1</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 lg:text-xl lg:leading-relaxed">
                  Jalan Melati No. 123 Kelurahan Bunga Indah Kecamatan
                  Kota Bahagia Kota Semuanya Bahagia Provinsi Damai
                  Sejahtera Kode Pos: 12345
                </span>
              </div>

            </div>
          </div>

          {/* Right: Contact form */}
          <div className="flex flex-col gap-4 flex-1 w-full pt-0 lg:pt-2">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl text-sm text-slate-700 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-200"
              style={{ background: "#f5f5f7" }}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl text-sm text-slate-700 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-200"
              style={{ background: "#f5f5f7" }}
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl text-sm text-slate-700 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-200"
              style={{ background: "#f5f5f7" }}
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-5 py-4 rounded-2xl text-sm text-slate-700 placeholder-slate-400 outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-indigo-200"
              style={{ background: "#f5f5f7" }}
            />

            {/* Submit */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="w-full lg:w-auto bg-[#2D2B6B] hover:bg-indigo-900 text-white text-sm font-semibold px-10 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:-translate-y-px"
              >
                Send Message
              </button>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;