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
    name: 'DataAnnotation',
    position: 'AI Model Trainer',
    url: 'https://www.dataannotation.tech/',
    startDate: '2026-06-01',
    endDate: '2026-09-01',
    summary: 'Evaluated and ranked AI model responses and developed detailed scoring rubrics to assess accuracy, relevance, and safety, improving training data quality and model performance.',
    highlights: [
      'Designed and implemented scoring rubrics to standardize evaluation of model outputs across multiple dimensions.',
      'Performed comparative model evaluations and data quality reviews to inform retraining and annotation guidelines.',
      'Collaborated with annotation and engineering teams to refine instructions, reducing ambiguity and improving label consistency.',
    ],
  },
  {
    name: 'Custom Brand Service',
    position: 'Lead Web Developer',
    url: '',
    startDate: '2025-12-01',
    endDate: '2026-06-01',
    summary: 'Led web development projects focused on Shopify theme customization and third-party service integration. Resolved technical issues while managing and synchronizing inventories and products. Drove Klaviyo email marketing efforts and implemented search engine optimization strategies.',
    highlights: [
      'Customized Shopify themes to enhance user experience and functionality.',
      'Integrated third-party services to streamline operations.',
      'Resolved technical issues, ensuring smooth website performance.',
      'Managed inventory synchronization, improving accuracy and efficiency.',
      'Stack: Shopify, Klaviyo, SEO',
    ],
  },
  {
    name: 'FleetAI',
    position: 'Machine Learning Engineer',
    url: '',
    startDate: '2025-06-01',
    endDate: '2025-12-01',
    summary: 'Built and trained deep learning models for defect detection in industrial images using PyTorch, comparing baseline CNN architectures against pretrained models.',
    highlights: [
      'Implemented dataset loaders, preprocessing pipelines, model modifications, training loops, and evaluation code.',
      'Resolved GPU out-of-memory constraints through gradient accumulation and reduced per-device batch sizes; evaluated mixed precision for training throughput.',
      'Diagnosed training instability under changed precision settings by inspecting inputs, loss values, and gradient behavior.',
      'Moved experiments from notebooks into configurable scripts with fixed data splits, recorded seeds, and saved checkpoints for reproducibility.'
    ],
  },
  {
    name: 'Thoughtworks',
    position: 'Software Engineer',
    url: '',
    startDate: '2021-04-01',
    endDate: '2025-05-01',
    summary: 'TW is a consulting company specialized in software development and IT services. I was a senior engineer for a well known American clothing and accessories retailer.',
    highlights: [
      'One of key developers, solved challenging issues enhancing the user experience for a multi billion retailers customer facing site.',
      'I led full features, major bugs hunting, accessibility improvements, modularization projects, multiple brands redesigns, improved code quality with design/architectural patterns and automated tests.',
      'I led cross-functional teams in delivering high-quality software on time. Developed the long-term technical vision and roadmap within, and often beyond, the scope of my teams. Evolved the roadmap to meet anticipated future requirements and infrastructure needs.',
      'Advised the team on best practices, and mentored other developers.',
      'Stack: React, NextJS, Node',
    ],
  },
  {
    name: 'Ecrubox',
    position: 'Senior Front-end Developer',
    url: 'https://ecrubox.com/',
    startDate: '2017-12-01',
    endDate: '2021-04-01',
    summary: 'Ecrubox is a web agency. Led agency projects by preparing cost estimations, schedules, and project specifications for proposals. Engaged in formal design reviews, offering insights for technical enhancements. Mentored developers to ensure adherence to best practices and coding consistency.',
    highlights: [
      'Prepared detailed project proposals and timelines.',
      'Contributed to design reviews, enhancing page and component functionality.',
      'Ensured coding consistency by guiding developers in best practices.',
      'Resolved technical issues efficiently, improving project outcomes.',
    ],
  },
];

export default work;
