const skills = [
  {
    title: 'Javascript/Typescript',
    color: '#f7df1e', // JavaScript yellow
    competency: 10,
    category: ['Web Development', 'Languages', 'Typescript'],
  },
  {
    title: 'Node.JS',
    color: '#339933', // Node.js green
    competency: 10,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'React',
    color: '#61dafb', // React cyan
    competency: 10,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'React Native',
    color: '#61dafb', // React cyan
    competency: 8,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Next.JS',
    color: '#000000', // Next.js black
    competency: 8,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Bash',
    color: '#4eaa25', // GNU Bash green
    competency: 7,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'Amazon Web Services',
    color: '#ff9900', // AWS orange
    competency: 9,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'PostgreSQL/SQLite3/MySQL',
    color: '#336791', // PostgreSQL blue
    competency: 9,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'MongoDB',
    color: '#47a248', // MongoDB green
    competency: 5,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Prisma',
    color: '#2d3748', // Prisma dark slate
    competency: 4,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Redis',
    color: '#dc382d', // Redis red
    competency: 5,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Express.JS',
    color: '#000000', // Express black
    competency: 6,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Nest.JS',
    color: '#e0234e', // NestJS red
    competency: 6,
    category: ['Web Development', 'Typescript'],
  },
  {
    title: 'Flask',
    color: '#000000', // Flask black
    competency: 4,
    category: ['Web Development', 'Python'],
  },
  {
    title: 'Git',
    color: '#f05032', // Git orange-red
    competency: 10,
    category: ['Tools'],
  },
  {
    title: 'Kubernetes',
    color: '#326ce5', // Kubernetes blue
    competency: 3,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'Docker',
    color: '#2496ed', // Docker blue
    competency: 8,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    color: '#cc6699', // Sass pink (HTML5 orange would clash with Git right above it)
    competency: 10,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    color: '#3776ab', // Python blue
    competency: 10,
    category: ['Languages', 'Python'],
  },
  {
    title: 'GraphQL',
    color: '#e10098', // GraphQL magenta
    competency: 10,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Shopify',
    color: '#2c9925', // Shopify green
    competency: 10,
    category: ['Web Development', 'E-commerce'],
  },
  {
    title: 'Ruby/Ruby on Rails',
    color: '#cc342d', // Ruby red
    competency: 9,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'API Development',
    // no brand color: falls back to the Web Development category color
    competency: 9,
    category: ['Web Development'],
  },
  {
    title: 'Search Engine Optimization',
    // no brand color: falls back to the E-commerce category color
    competency: 8,
    category: ['Web Development', 'E-commerce'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
// Colors are assigned to categories in alphabetical order. A skill bar uses its
// own `color` (brand color) when set, and falls back to the color of its first
// (alphabetical) category otherwise.
const colors = [
  '#64cb7b', // Data Engineering (light green)
  '#6968b3', // Databases (lavender)
  '#2c9925', // E-commerce (green)
  '#e47272', // Languages (salmon)
  '#37b1f5', // Python (sky blue)
  '#40494e', // Tools (gray)
  '#3896e2', // Typescript (blue)
  '#c3423f', // Web Development (fallback for skills without a brand color, e.g. API Development)
  '#515dd4',
  '#cc7b94',
  '#d75858',
  '#747fff',
];

const categories = [...new Set(skills.flatMap(({ category }) => category))]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
