const defaultData = {
  about: {
    name: 'Jane Smith',
    gender: 'Female',
    address: 'New York, NY',
    profilePhoto: '',
    introTitle: 'Finance Professional & Analyst',
    introDescription: 'Aspiring finance professional with a strong foundation in financial modeling, data analysis, and portfolio management. Passionate about leveraging technology and quantitative methods to drive investment decisions.',
    bio: 'I am a finance professional with deep expertise in quantitative analysis, portfolio management, and financial technology. My work bridges the gap between traditional finance and modern data science, enabling more informed investment decisions through rigorous analytical frameworks.',
    achievements: [
      { id: '1', title: 'Dean\'s List', description: 'Recognized for outstanding academic performance', year: '2022' },
      { id: '2', title: 'Bloomberg Market Concepts', description: 'Completed comprehensive financial markets certification', year: '2023' }
    ],
    metrics: [
      { id: '1', label: 'Projects Completed', value: '10+' },
      { id: '2', label: 'Models Built', value: '15+' },
      { id: '3', label: 'Research Reports', value: '3' },
      { id: '4', label: 'Certifications', value: '2' }
    ],
    contactLinks: [
      { id: '1', platform: 'Email', url: 'mailto:jane.smith@email.com' },
      { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' },
      { id: '3', platform: 'GitHub', url: 'https://github.com/janesmith' }
    ],
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
      slug: 'dcf-valuation-model',
      subtitle: 'Comprehensive DCF analysis for Fortune 500 tech companies',
      description: 'Built a comprehensive discounted cash flow model for a Fortune 500 tech company, incorporating scenario analysis and sensitivity tables.',
      category: 'Financial Models',
      tags: ['Excel', 'Valuation', 'DCF'],
      techStack: ['Excel', 'VBA'],
      links: [{ label: 'View Model', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2024',
      featured: true,
      status: 'published',
      markdownContent: '## Overview\n\nThis project involves building a comprehensive **Discounted Cash Flow (DCF)** model for a Fortune 500 technology company.\n\n### Key Features\n\n- Revenue projections with multiple growth scenarios\n- WACC calculation with sensitivity analysis\n- Terminal value estimation (Gordon Growth & Exit Multiple)\n- Monte Carlo simulation for probabilistic valuation\n\n### Methodology\n\nThe model uses a **10-year projection period** with three scenarios:\n\n| Scenario | Revenue Growth | EBITDA Margin |\n|----------|---------------|---------------|\n| Bull | 15% | 35% |\n| Base | 10% | 30% |\n| Bear | 5% | 25% |\n',
      embeds: [],
      relatedProjects: ['portfolio-optimization-tool']
    },
    {
      id: '2',
      title: 'Portfolio Optimization Tool',
      slug: 'portfolio-optimization-tool',
      subtitle: 'Mean-variance optimization with efficient frontier visualization',
      description: 'Python-based mean-variance optimization tool using historical stock data to construct efficient frontiers and optimal portfolios.',
      category: 'Coding Projects',
      tags: ['Python', 'Finance', 'Optimization'],
      techStack: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
      links: [{ label: 'GitHub', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2024',
      featured: true,
      status: 'published',
      markdownContent: '## About This Project\n\nA Python-based **mean-variance optimization** tool that constructs efficient frontiers and identifies optimal portfolios using historical stock data.\n\n### Features\n\n- Historical data fetching and preprocessing\n- Efficient frontier calculation\n- Sharpe ratio optimization\n- Portfolio weight visualization\n- Risk-return scatter plots\n',
      embeds: [],
      relatedProjects: ['dcf-valuation-model']
    },
    {
      id: '3',
      title: 'ESG Investment Research',
      slug: 'esg-investment-research',
      subtitle: 'Analyzing ESG portfolio performance over a decade',
      description: 'Research paper analyzing the risk-return profile of ESG-screened portfolios versus traditional benchmarks over a 10-year period.',
      category: 'Case Studies',
      tags: ['Research', 'ESG', 'Portfolio Management'],
      techStack: ['Python', 'R', 'LaTeX'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2023',
      featured: false,
      status: 'published',
      markdownContent: '',
      embeds: [],
      relatedProjects: []
    },
    {
      id: '4',
      title: 'Crypto Market Dashboard',
      slug: 'crypto-market-dashboard',
      subtitle: 'Real-time cryptocurrency analytics and correlation analysis',
      description: 'Interactive dashboard tracking cryptocurrency market metrics with real-time data visualization and correlation analysis.',
      category: 'Coding Projects',
      tags: ['Dashboard', 'Crypto', 'Data Viz'],
      techStack: ['Python', 'Plotly', 'Dash'],
      links: [{ label: 'Live Demo', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2023',
      featured: false,
      status: 'published',
      markdownContent: '',
      embeds: [],
      relatedProjects: []
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
    heroTitle: 'Finance meets code.\nI build both.',
    heroSubtitle: 'Analyst. Builder. Model obsessive.',
    introText: 'I build financial models, analyze markets, and develop data-driven investment strategies. Welcome to my portfolio.',
    snapshotLocation: 'New York, NY',
    snapshotRole: 'Finance Professional & Analyst',
    snapshotAvailability: 'Open to opportunities',
    ctaButtons: [
      { id: '1', label: 'View Projects', link: '/projects' },
      { id: '2', label: 'Contact Me', link: '/contact' }
    ],
    stats: [
      { id: '1', label: 'Projects', value: '10+' },
      { id: '2', label: 'Models Built', value: '15+' },
      { id: '3', label: 'Research Papers', value: '3' },
      { id: '4', label: 'Certifications', value: '2' }
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
  },
  quotes: [
    { id: '1', text: 'Build things that compound. Ship work that speaks.', attribution: 'Principle', context: 'Work ethic', featured: true, order: 1 },
    { id: '2', text: 'Markets reward the prepared mind—and the disciplined spreadsheet.', attribution: 'Note to self', context: 'Markets', featured: false, order: 2 },
    { id: '3', text: 'Good analysis is invisible. Bad analysis is expensive.', attribution: 'Me', context: 'Learning', featured: false, order: 3 }
  ]
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
