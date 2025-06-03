import React from 'react';

const email = 'luizfellypecassago@gmail.com';

const EmailLink = () => (
  <div
    className="inline-container"
  >
    <a href={`mailto:${email}`}>
      <span>{email}</span>
    </a>
  </div>
);

export default EmailLink;
