import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// import ContactIcons from '../Contact/ContactIcons';

// const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

const SideBar = () => {
    const headerList = headers();
  const pathname = headerList.get("x-current-path");

  console.log('pathname >>>>>', pathname)

    return (
    <section id="sidebar">
        <section id="intro">
            <Link href="/" className="logo">
                {/* <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" /> */}
                <Image
                    src="images/me.jpg"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </Link>
            <header>
                <h2>Luiz Fellype Cassago</h2>
                <p>
                    <a href="mailto:luizfellypecassago@gmail.com">luizfellypecassago@gmail.com</a>
                </p>
            </header>
        </section>

        <section className="blurb">
            <h2>About</h2>
            <p>
                Hi, I&apos;m Luiz. I am a{' '}
                software engineer, passionate about building applications.
            </p>
            <ul className="actions">
                <li>
                    {pathname?.includes('/resume') ? (
                        <Link href="/resume" className="button">
                            Learn More
                        </Link>
                    ) : (<></>
                        // <Link to="/about" className="button">
                        //   About Me
                        // </Link>
                    )}
                </li>
            </ul>
        </section>

        <section id="footer">
            {/* <ContactIcons /> */}
        </section>
    </section>
)};

export default SideBar;
