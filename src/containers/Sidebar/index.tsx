import Link from 'next/link';
import Image from 'next/image';

import ContactIcons from '@/containers/ContactIcons';

import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

const SideBar = async () => {
    const headerList = (await headers() as unknown as UnsafeUnwrappedHeaders);
    const pathname = await headerList.get("x-current-path");

    return (
        <section id="sidebar">
            <section id="intro">
                <Link href="/" className="logo">
                    <Image
                        src="/images/me.jpg"
                        width={160}
                        height={160}
                        alt="Picture of the author"
                        className='rounded-[50%] mb-5'
                    />
                </Link>
                <header>
                    <h2 className='text-primary text-[1.5em] font-black tracking-[0.25em] leading-[1.65] uppercase mt-0 mb-2 mx-0'>Luiz Fellype Cassago</h2>

                    <ContactIcons />

                    <div className='mt-8 pt-8 border-t-[#a0a0a04d] border-t border-solid'></div>
                </header>
            </section>

            {/* <section className="blurb">
                <h2>About</h2>
                <p className='text-secondary text-[0.9em] leading-[1.5]'>
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
            </section> */}


        </section>
    )
};

export default SideBar;
