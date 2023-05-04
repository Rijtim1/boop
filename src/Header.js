import React from "react";
import logo from "./static-files/logo.png";

export default function Header() {
  return (
    <header className="bg-gray border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/boop">
              <span className="sr-only">Workflow</span>
              <img className="h-8 w-auto sm:h-10" src={logo} alt="Official logo of the company" width={100} height={100}/>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
