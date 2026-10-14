import React from 'react';

type CertificationType = { title: string; issuer: string; link: string; year: number }

const Certification = ({ data }: { data: CertificationType }) => (
  <article className="degree-container">
    <header>
      <span className="degree">{data.title}</span>
      <p className="school">
        {data.link ? <a href={data.link}>{data.issuer}</a> : data.issuer}, {data.year}
      </p>
    </header>
  </article>
);

const Certifications = ({ data }: { data: CertificationType[] }) => (
  <div className="certifications">
    <div className="link-to" id="certifications" />
    <div className="title">
      <h3>Certifications</h3>
    </div>

    {data.map((certification) => (
      <Certification data={certification} key={`${certification.issuer}-${certification.title}`} />
    ))}
  </div>
);

export default Certifications;
