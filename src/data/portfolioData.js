const defaultData = {
  about: {
    name: 'Jane Smith',
    gender: 'Female',
    address: 'New York, NY',
    profilePhoto: '',
    introTitle: 'Finance Professional & Analyst',
    introDescription: 'Aspiring finance professional with a strong foundation in financial modeling, data analysis, and portfolio management. Passionate about leveraging technology and quantitative methods to drive investment decisions.',
    additionalSections: [
      { id: '1', title: 'Interests', content: 'Financial markets, Quantitative analysis, Fintech, Data visualization' }
    ],
    education: [
      { id: '1', institution: 'Columbia University', degree: 'M.S. Financial Engineering', year: '2024', details: 'Focus on derivatives pricing and risk management' },
      { id: '2', institution: 'NYU Stern', degree: 'B.S. Finance & Economics', year: '2022', details: 'Summa Cum Laude, Dean\'s List' }
    ],
    experience: [
      { id: '1', company: 'Goldman Sachs', role: 'Summer Analyst', period: 'Jun 2023 – Aug 2023', description: 'Developed valuation models for M&A transactions in the TMT group.' },
      { id: '2', company: 'BlackRock', role: 'Investment Intern', period: 'Jan 2023 – May 2023', description: 'Assisted portfolio managers with risk analytics and ESG screening.' }
    ],
    skills: [
      { id: '1', name: 'Financial Modeling', level: 'Advanced' },
      { id: '2', name: 'Python', level: 'Advanced' },
      { id: '3', name: 'Excel / VBA', level: 'Expert' },
      { id: '4', name: 'SQL', level: 'Intermediate' },
      { id: '5', name: 'Bloomberg Terminal', level: 'Advanced' },
      { id: '6', name: 'Tableau', level: 'Intermediate' }
    ],
    certifications: [
      { id: '1', name: 'CFA Level I Candidate', year: '2024' },
      { id: '2', name: 'Bloomberg Market Concepts', year: '2023' }
    ]
  },
  projects: [
    {
      id: '1',
      title: 'DCF Valuation Model',
      description: 'Built a comprehensive discounted cash flow model for a Fortune 500 tech company, incorporating scenario analysis and sensitivity tables.',
      category: 'Financial Models',
      tags: ['Excel', 'Valuation', 'DCF'],
      techStack: ['Excel', 'VBA'],
      links: [{ label: 'View Model', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      featured: true
    },
    {
      id: '2',
      title: 'Portfolio Optimization Tool',
      description: 'Python-based mean-variance optimization tool using historical stock data to construct efficient frontiers and optimal portfolios.',
      category: 'Coding Projects',
      tags: ['Python', 'Finance', 'Optimization'],
      techStack: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
      links: [{ label: 'GitHub', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      featured: true
    },
    {
      id: '3',
      title: 'ESG Investment Research',
      description: 'Research paper analyzing the risk-return profile of ESG-screened portfolios versus traditional benchmarks over a 10-year period.',
      category: 'Case Studies',
      tags: ['Research', 'ESG', 'Portfolio Management'],
      techStack: ['Python', 'R', 'LaTeX'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      featured: false
    },
    {
      id: '4',
      title: 'Crypto Market Dashboard',
      description: 'Interactive dashboard tracking cryptocurrency market metrics with real-time data visualization and correlation analysis.',
      category: 'Coding Projects',
      tags: ['Dashboard', 'Crypto', 'Data Viz'],
      techStack: ['Python', 'Plotly', 'Dash'],
      links: [{ label: 'Live Demo', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      featured: false
    }
  ],
  contact: {
    email: 'jane.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    linkedin: 'https://linkedin.com/in/janesmith',
    github: 'https://github.com/janesmith',
    socialLinks: [
      { id: '1', platform: 'Twitter', url: 'https://twitter.com/janesmith' }
    ]
  },
  resume: {
    summary: 'Finance professional with expertise in financial modeling, quantitative analysis, and portfolio management. Seeking full-time opportunities in investment banking, asset management, or fintech.',
    fileUrl: '',
    sections: []
  },
  home: {
    heroTitle: 'Hi, I\'m Jane Smith',
    heroSubtitle: 'Finance Professional & Aspiring Analyst',
    introText: 'I build financial models, analyze markets, and develop data-driven investment strategies. Welcome to my portfolio.',
    ctaButtons: [
      { id: '1', label: 'View Projects', link: '/projects' },
      { id: '2', label: 'Contact Me', link: '/contact' }
    ],
    stats: [
      { id: '1', label: 'Projects', value: '10+' },
      { id: '2', label: 'Research Papers', value: '3' },
      { id: '3', label: 'Certifications', value: '2' }
    ],
    customSections: []
  },
  settings: {
    siteTitle: 'FinFolio',
    visiblePages: {
      home: true,
      projects: true,
      about: true,
      resume: true,
      contact: true
    },
    customPages: []
  }
};

const STORAGE_KEY = 'finfolio_data';

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultData, ...parsed };
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return { ...defaultData };
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving data:', e);
    return false;
  }
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultData };
}

export { defaultData };
