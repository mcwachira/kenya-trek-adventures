import { MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "Mount Kenya Expeditions", href: "#mount-kenya" },
    { name: "Safari Tours", href: "#safaris" },
    { name: "Day Trips", href: "#day-trips" },
    { name: "Custom Adventures", href: "#custom" },
  ];

  const destinations = [
    "Mount Kenya National Park",
    "Maasai Mara Reserve",
    "Amboseli National Park",
    "Tsavo National Parks",
    "Hell's Gate National Park",
    "Lake Nakuru National Park",
  ];

  return (
    <footer className="bg-green-800 text-white dark:from-gray-900 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400">
              Kenya Trek Adventures
            </h3>
            <p className="text-green-100 leading-relaxed">
              Your trusted partner for authentic Kenyan adventures. From Mount
              Kenya&apos;s peaks to the savannas of Maasai Mara, we create
              unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">FB</span>
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">IG</span>
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">TW</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Popular Destinations
            </h4>
            <ul className="space-y-2">
              {destinations.map((destination, index) => (
                <li key={index} className="text-green-100 text-sm">
                  {destination}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-orange-400" />
                <span className="text-green-100 text-sm">
                  Nairobi, Kenya
                  <br />
                  P.O. Box 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-400" />
                <span className="text-green-100 text-sm">+254 xxx xxx xxx</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-orange-400" />
                <span className="text-green-100 text-sm">
                  info@kenyatrekadventures.com
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-700 dark:bg-gray-600 rounded-lg">
              <h5 className="font-semibold text-orange-400 mb-2">
                WhatsApp Booking
              </h5>
              <p className="text-sm text-green-100 mb-2">
                Quick inquiries and instant support
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-100 text-sm">
              © 2024 Kenya Trek Adventures. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-green-100 hover:text-orange-400 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-green-100 hover:text-orange-400 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-green-100 hover:text-orange-400 text-sm"
              >
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
