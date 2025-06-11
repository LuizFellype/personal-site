import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import data from '@/data/contact';

const ContactIcons = () => (
  <ul className="icons flex justify-center gap-2 m-auto">
    {data.map((s) => (
      <li key={s.label}>
        <a target="_blank" href={s.link} aria-label={s.label} rel="noreferrer">
          <FontAwesomeIcon icon={s.icon} />
        </a>
      </li>
    ))}
  </ul>
);

export default ContactIcons;
