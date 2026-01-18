import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo / About */}
        <div>
          <h2 className="text-lg font-bold text-white">Panchayat Portal</h2>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Official Panchayat citizen service portal for applying certificates,
            tracking applications, and downloading approved documents online.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="/apply" className="hover:text-white transition">
                Apply
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white transition">
                Track Application
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base font-semibold text-white">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>
              <a href="/support" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold text-white">Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-400">
            <p>📍 Panchayat Office, Your Village</p>
            <p>📞 Helpline: +91 98765 43210</p>
            <p>✉️ Email: support@panchayat.gov.in</p>
            <p>
              “This is a student project / demo application.” “Not affiliated
              with any government organization.” “Do not enter real personal
              data.”
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Panchayat Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
