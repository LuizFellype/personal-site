import React from 'react';

type DegreeType = { school: string; degree: string; link: string, year: number }

const Degree = ({ data }: { data: DegreeType }) => (
  <article className="degree-container">
    <header>
      <span className="degree">{data.degree}</span >
      <p className="school">
        <a href={data.link}>{data.school}</a>, {data.year}
      </p>
    </header>
  </article>
);

const Education = ({ data }: {
  data: DegreeType[]
}) => (
  <div className="education">
    <div className="link-to" id="education" />
    <div className="title">
      <h3>Education</h3>
    </div>
    
    {data.map((degree) => (
      <Degree data={degree} key={degree.school} />
    ))}
  </div>
);

export default Education;
