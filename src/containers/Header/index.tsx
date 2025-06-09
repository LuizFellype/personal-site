import React from 'react';

import Hamburger from './Hamburger';
import ROUTES from '../../data/routes';
import Link from 'next/link';

// Websites Navbar, displays routes defined in 'src/data/routes'
const Navigation = () => (
  <header id="header">
    <h1 className="index-link">
      {ROUTES
        .filter((l) => l.index)
        .map((l) => (
          <Link href={l.path} key={l.label} >
            {l.label}
          </Link>
        ))}
    </h1>
    <nav className="links">
      <ul>
        {ROUTES
          .filter((l) => !l.index)
          .map((l) => (
            <li key={l.label}>
              <Link href={l.path}>{l.label}</Link>
            </li>
          ))}
      </ul>
    </nav>
    <Hamburger />
  </header>
);

export default Navigation;
