const skills = [
  {
    title: 'Javascript/Typescript',
    competency: 5,
    category: ['Web Development', 'Languages', 'Typescript'],
  },
  {
    title: 'Node.JS',
    competency: 4,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'React',
    competency: 5,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'React Native',
    competency: 4,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Next.JS',
    competency: 4,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Bash',
    competency: 2,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'Amazon Web Services',
    competency: 2,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'PostgreSQL/SQLite3/MySQL',
    competency: 2,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'MongoDB',
    competency: 3,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Prisma',
    competency: 2,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Redis',
    competency: 2,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Express.JS',
    competency: 3,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Nest.JS',
    competency: 3,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Flask',
    competency: 2,
    category: ['Web Development', 'Python'],
  },
  {
    title: 'Git',
    competency: 5,
    category: ['Tools'],
  },
  {
    title: 'Kubernetes',
    competency: 1,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'Docker',
    competency: 2,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 5,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    competency: 3,
    category: ['Languages', 'Python'],
  },
  {
    title: 'GraphQL',
    competency: 3,
    category: ['Web Development', 'Databases'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories = [...new Set(skills.flatMap(({ category }) => category))]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
