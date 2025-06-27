
import Education from '@/containers/Resume/Education';
import Experience from '@/containers/Resume/Experience';
import Skills from '@/containers/Resume/Skills';

import degrees from '@/data/resume/degrees';
import work from '@/data/resume/work';
import { skills, categories } from '@/data/resume/skills';

export function generateStaticParams() {
  return []
}

const sections = {
  Experience: () => <Experience data={work} />,
  Education: () => <Education data={degrees} />,
  Skills: () => <Skills skills={skills} categories={categories} />,
  // Courses: () => <Courses data={courses} />,
  // References: () => <References />,
};


export default function Home() {
  
  return (
    <article className="post page-wrapper md:px-[2.5rem] px-3" id="resume">
      <header>
        <div className="title">
          <h2>
            Resume
          </h2>
          <div className="link-container">
            {Object.keys(sections).map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sec}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>
      {Object.entries(sections).map(([name, Section]) => (
        <Section key={name} />
      ))}
    </article>
  );
}
