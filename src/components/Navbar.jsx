import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/lightlogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 sm:px-10 md:px-20 lg:px-28 xl:px-32 pt-6 md:pt-8">

        {/* Logo */}
        <a href="#home" className="shrink-0">
        <img
  src={logo}
  alt="Urban Kriti"
  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto"
/>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="
                  relative
                  uppercase
                  text-white
                  text-[17px]
                  tracking-[0.18em]
                  font-light
                  transition-all
                  duration-300
                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:h-[1px]
                  after:w-0
                  after:bg-white
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white"
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/60 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-black transition-transform duration-300 ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-6">
            <button onClick={() => setIsOpen(false)}>
              <X className="text-white" size={28} />
            </button>
          </div>

          <ul className="flex flex-col gap-8 px-8 pt-10">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="uppercase tracking-[0.18em] text-white text-sm"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}