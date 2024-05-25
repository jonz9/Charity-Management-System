import React from "react";

function Footer() {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <li>
                  <a href="">Benefits</a>
                </li>
                <li>
                  <a href="">Partners</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
