import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/lightlogo.png";

// Brand maroon (same family jo Home hero/section me use ho raha hai)
const ACCENT = "#6b3a3a";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact us", href: "#contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      {/* Blend background - full width, edge-to-edge */}
      <div className="absolute inset-x-0 top-0 h-12 md:h-20 bg-gradient-to-b from-[#3d1f1f]/55 via-[#3d1f1f]/40
       to-transparent backdrop-blur-[2px] pointer-events-none" />

      <nav className="relative flex items-center justify-between px-10 py-4 md:px-24">
        {/* Logo - left side, edge se thoda space, size thoda bada */}
        <a href="#home" className="flex items-center shrink-0">
          <img src={logo} alt="UrbanKriti" className="md:h-36 h-18 w-auto" />
        </a>

        {/* Menu - right side, logo se thoda upar align kiya (-mt) */}
        <ul className="hidden md:flex items-center gap-10 -mt-20">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="relative inline-block text-white/90 text-lg font-medium pb-1 group"
              >
                {item.name}
                {/* Animated underline - hover pe left se right grow hoti hai */}
                <span
                  className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: ACCENT }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger - mobile only */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white p-1 -mt-4"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/50"
        />

        <div
          className={`absolute top-4 right-4 w-1/2 min-w-[220px] rounded-2xl overflow-hidden bg-[#3d2323] shadow-xl origin-top-right transform transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex justify-end p-5">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          <ul className="flex flex-col gap-6 px-6 pb-6 mt-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="relative inline-block text-white/90 text-base font-medium pb-1 group"
                >
                  {item.name}
                  {/* group-active + group-focus add kiya taaki touch/tap pe har item pe underline aaye, sirf pehle wale pe nahi */}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 ease-out"
                    style={{ backgroundColor: ACCENT }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}