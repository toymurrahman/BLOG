import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase">
            Do You Have Questions?
          </h2>
          <p className="text-xl font-semibold text-red-500 mt-1 uppercase">
            Do Not Wait, <span className="text-white">Let’s Talk</span>
          </p>

          <div className="flex items-center gap-3 mt-6">
            <FaPhoneAlt className="text-red-500 text-xl" />
            <span className="text-lg font-bold">
              (+84) 22 4130 0555
            </span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <FaEnvelope className="text-red-500 text-xl" />
            <span className="text-lg font-bold">
              contact@example.com
            </span>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="uppercase font-semibold tracking-widest text-gray-300">
            Head Office
          </h3>
          <p className="text-sm mt-3 text-gray-400">
            Box 565,<br />
            Charlestown, Nevis,<br />
            West Indies,<br />
            Caribbean
          </p>
          <a
            href="#"
            className="text-red-500 uppercase text-sm font-semibold mt-2 inline-block"
          >
            View Map
          </a>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="uppercase font-semibold tracking-widest text-gray-300">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {["About", "Our Mission", "Videos", "Albums", "Contact"].map(
              (link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`hover:underline ${
                      link === "Albums" ? "text-red-500" : "text-white"
                    }`}
                  >
                    • {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;