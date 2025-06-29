'use client';
import React, { Suspense, useState } from 'react';

import Link from 'next/link';
import ROUTES from '../../data/routes';
import Menu from 'react-burger-menu/lib/menus/slide';

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const handleMenuClick = () => {
    setOpen(!open);
  }
  
  return (
    <div className="hamburger-container md:hidden">
      <nav className="main text-mainbg text-lg p" onClick={handleMenuClick} id="hambuger-nav">
        <ul>
          {open ? (
            <li className="menu close-menu">
              <div className="menu-hover">
                &#10005;
              </div>
            </li>
          ) : (
            <li className="menu open-menu">
              <div className="menu-hover">
                &#9776;
              </div>
            </li>
          )}
        </ul>
      </nav>
   
      <Suspense fallback={<></>}>
        <Menu right isOpen={open}>
          <ul className="hamburger-ul">
            {ROUTES.map((l) => (
              <li key={l.label}>
                <Link href={l.path} onClick={() => setOpen(!open)}>
                  <h3 className={l.index ? 'index-li' : ''}>{l.label}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      </Suspense>
    </div>
  );
};

export default Hamburger;
