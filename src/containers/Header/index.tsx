import React from 'react';

// import Hamburger from './Hamburger';
import ROUTES from '@/data/routes';
import Link from 'next/link';

const Navigation = () => (
  <div id="header" className='bg-white text-[0.7rem] flex h-[5em] justify-between leading-[5em] fixed w-full z-[10000] border-b-[#a0a0a04d] border-b border-solid left-0 top-0'>
    <h1 className="index-link">
      {ROUTES
        .filter((l) => l.index)
        .map((l) => (
          <Link href={l.path} key={l.label} className='uppercase pl-6 text-primary tracking-[4px] font-extrabold' >
            {l.label}
          </Link>
        ))}
    </h1>
    <div className="links flex-1 h-[inherit] leading-[inherit] overflow-scroll ml-[1.5em] pl-[1.5em] border-l-[#a0a0a04d] border-l border-solid">
      <ul className=''>
        {ROUTES
          .filter((l) => !l.index)
          .map((l, idx) => (
            <li key={l.label} className={`inline-block leading-none uppercase text-secondary tracking-[2.8px] ${idx > 0 ? 'border-l-[#a0a0a04d] border-l border-solid pl-4 ml-4' : ''}`}>
              <Link href={l.path}>{l.label}</Link>
            </li>
          ))}
      </ul>
    </div>
    {/* <Hamburger /> */}
  </div>
);

export default Navigation;
