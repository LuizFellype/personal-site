/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Instituto Oportunidade Brasil',
    position: 'Instructor',
    url: '',
    startDate: '2025-04-25',
    endDate: '2025-06-01',
    summary: 'IOB is an ONG that provides free education to afro-brazilians to increase the inclusion of young Afro-Brazilians in situations of social vulnerability in educational and professional settings.',
    highlights: [
      'I mentored students with courses as a introduction to Technology and Software Development',
      'Courses: Low-Code with OutSystem, VR/AR, AI, IoT, BioTech and Blockchain',
    ],
  },
  {
    name: 'Thoughtworks',
    position: 'Senior Software Engineer',
    url: '',
    startDate: '2021-05-17',
    endDate: '2025-04-23',
    summary: 'TW is a consulting company specialized in software development and IT services. I was a senior engineer for a well known American clothing and accessories retailer.',
    highlights: [
      'One of key developers, solved challenging issues enhancing the user experience for a multi billion retailers customer facing site.',
      'I led full features, major bugs hunting, accessibility improvements, multiple brands redesigns, improved code quality with design/architectural patterns and automated tests.',
      'I led cross-functional teams in delivering high-quality software on time. Developed the long-term technical vision and roadmap within, and often beyond, the scope of my teams. Evolved the roadmap to meet anticipated future requirements and infrastructure needs.',
      'Advised the team on best practices, and mentored other developers.',
      'Stack: React, NextJS, Node',
    ],
  },
  {
    name: 'UseMobile',
    position: 'Senior Software Engineer',
    url: 'https://usemobile.com.br/sobre/',
    startDate: '2021-02-01',
    endDate: '2021-05-01',
    summary: 'UseMobile is a company specialized in Mobile, Web and Desktop software development.',
    highlights: [
      'Contributed to an online bank web/desktop application creating and improving debit/credit functionalities.',
      'Stack: Angular 4, Electron, Node',
    ],
  },
  {
    name: 'Jonnpo Tecnologia',
    position: 'Senior Software Engineer',
    url: 'https://www.jonnpo.com.br/',
    startDate: '2020-08-01',
    endDate: '2021-06-01',
    summary: 'Jonnpo is a Software agency that builds software by demand.',
    highlights: [
      'For a while I was the only developer on the team. Built different projects for different clients.',
      'I was part of all software development life cycle, from requirements gathering to deployment and maintenance.',
      'Stack: React, React-Native, Vue, NextJS, Node, Nest, GraphQL',
    ],
  },
  {
    name: 'Beaze',
    position: 'FullStack Developer',
    url: '',
    startDate: '2020-01-01',
    endDate: '2020-10-01',
    summary: 'Beaze is a B2B platform, scrapping, treating and providing thousands of government contracts to customers.',
    highlights: [
      'First time working witin fully remote and english speaking team.',
      'Main reference Front end reference on a team of 3 senior backend + 2 frontends engineers',
      'First time fully responsible for backend features delivery.',
      "Set and communicated team priorities that supported the broader organization's goals. Aligned strategy, processes, and decision-making acrros whole applicaton.",
      'Stack: ReactJS, Node, Mongo, Azure',
    ],
  },
  {
    name: 'xDevel Scalable Systems',
    position: 'Developer',
    url: '',
    startDate: '2018-01-01',
    endDate: '2020-01-01',
    summary: `xDevel is a software development company that specializes in building scalable systems.
    I was one of 2 frontends in the team, working on a variety of projects for different clients.`,
    highlights: [
      'Place where I learned the foundation of my software engineering skills. Specially HOW to learn and embrace new technologies.',
      'First time hands on client projects.',
      'Developed a variety of projects, including an inventory app, school-student performance tracking, custom text editor with report generator, and mapping parking lot ship.',
      'Stack: React, React-Native, Angular 4, Node, GraphQL, AWS, Postgree, Prisma',
    ],
  },
];

export default work;
