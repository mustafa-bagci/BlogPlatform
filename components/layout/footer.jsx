import Link from 'next/link';

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/licensing", label: "Licensing" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  
  const linkClass = "hover:underline me-4 md:me-6 text-gray-300 sm:text-gray-600";
  
  return (
    <footer className="bg-black sm:bg-transparent w-full">
      <hr className="border-gray-800" />
      <div className="mx-auto max-w-screen-xl py-9 lg:py-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-center sm:justify-start space-x-2">
          <span className="text-sm sm:text-gray-600 text-gray-400">
            © {year} Mustafa BAGCI. All Rights Reserved.
          </span>
        </div>

        <nav>
          <ul className="flex flex-wrap items-center mt-3 justify-center text-sm font-medium sm:mt-0 text-gray-600">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={`Navigate to ${link.label}`}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
