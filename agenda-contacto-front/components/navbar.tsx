import React, { useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    const name = localStorage.getItem("email");
    setEmail(name as string);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <header className="background__navbar">
      <nav className="max-w-[1440px] mx-auto flex justify-between px-6 py-4">
        <div className="container mx-auto">
          <div className="navbar__font">
            <div>
              <Link href="/inicio" className="hover:text-blue-950">
                Agenda
              </Link>
            </div>
            <div className="flex items-center px-8 ">
              <h2 className="hover:text-blue-950">{email}</h2>
              <div className="ml-2 flex items-center hover:text-blue-950">
                <button className="p-2.5" onClick={handleLogout}>
                  Cerrar Sesion
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
