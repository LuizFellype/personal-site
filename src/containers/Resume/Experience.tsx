import React from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';

type JobType = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  summary: string;
}
const Job = ({
  data: {
    name, position, url, startDate, endDate, summary, highlights,
  },
}: { data: JobType }) => (
  <article className="jobs-container">
    <header>
      <h4>
        <a href={url}>{name}</a> - {position}
      </h4>
      <p className="daterange">
        {' '}
        {dayjs(startDate).format('MMMM YYYY')} -{' '}
        {endDate ? dayjs(endDate).format('MMMM YYYY') : 'PRESENT'}
      </p>
    </header>
    {summary ? (
      <Markdown
        options={{
          overrides: {
            p: {
              props: {
                className: 'summary',
              },
            },
          },
        }}
      >
        {summary}
      </Markdown>
    ) : null}
    {highlights ? (
      <ul className="points">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

const Experience = ({ data }: { data: JobType[] }) => (
  <div className="experience">
    <div className="link-to" id="experience" />
    <div className="title">
      <h3>Experience</h3>
    </div>
    
    {data.map((job) => (
      <Job data={job} key={`${job.name}-${job.position}`} />
    ))}
  </div>
);


export default Experience;
