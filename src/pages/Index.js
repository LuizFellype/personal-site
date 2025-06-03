import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description="Luiz Fellype's personal website. Vitória, ES Brazil based."
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">About this site</Link>
          </h2>
          <p>
            A beautiful, responsive, statically-generated, react application
            written with modern Javascript.
          </p>
        </div>
      </header>
      <p>
        {' '}
        Welcome to my website. Please feel free to read more{' '}
        <b><Link to="/about">about me</Link></b>, or you can check out my{' '}
        <b><Link to="/resume">resume</Link></b>, <b><Link to="/projects">projects</Link></b>, or{' '}
        <b><Link to="/contact">contact</Link></b> me.
      </p>
      <p>
        {' '}
        Source available{' '}
        <a href="https://github.com/LuizFellype/personal-site">here</a>
      </p>
    </article>
  </Main>
);

export default Index;
