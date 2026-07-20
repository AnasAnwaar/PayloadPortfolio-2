export const skillCategorySeeds = [
  { title: 'Backend Development', slug: 'backend-development', icon: 'Server', order: 1 },
  { title: 'Frontend Development', slug: 'frontend-development', icon: 'Code2', order: 2 },
  { title: 'Databases', slug: 'databases', icon: 'Database', order: 3 },
  { title: 'AI/ML & Data Science', slug: 'ai-ml-data-science', icon: 'BrainCircuit', order: 4 },
  { title: 'DevOps & Cloud', slug: 'devops-cloud', icon: 'Cloud', order: 5 },
  { title: 'Shopify Development', slug: 'shopify-development', icon: 'ShoppingBag', order: 6 },
  { title: 'Mobile Development', slug: 'mobile-development', icon: 'Smartphone', order: 7 },
  { title: 'Security', slug: 'security', icon: 'Shield', order: 8 },
  { title: 'Tools & Platforms', slug: 'tools-platforms', icon: 'Wrench', order: 9 },
  { title: 'Soft Skills', slug: 'soft-skills', icon: 'Users', order: 10 },
]

export const skillSeeds = [
  { name: 'Node.js', category: 'backend-development', level: 'advanced', years: '1.5+ years', description: 'Backend development, RESTful APIs, GraphQL, Express, Nest.js', featured: true, icon: 'Server', order: 1 },
  { name: 'Python', category: 'backend-development', level: 'intermediate', years: '1.5+ years', description: 'AI/ML, data analysis, automation, FastAPI, RAG and agents', featured: true, icon: 'BrainCircuit', order: 2 },
  { name: 'Express.js', category: 'backend-development', level: 'intermediate', order: 3 },
  { name: 'TypeScript', category: 'backend-development', level: 'advanced', years: '1+ years', description: 'Type-safe full-stack applications and robust development', featured: true, icon: 'Braces', order: 4 },
  { name: 'Nest.js', category: 'backend-development', level: 'intermediate', order: 5 },
  { name: 'FastAPI', category: 'backend-development', level: 'beginner', order: 6 },
  { name: 'React.js', category: 'frontend-development', level: 'advanced', years: '2+ years', description: 'Frontend development, Next.js, React Native and TypeScript', featured: true, icon: 'Code2', order: 7 },
  { name: 'Next.js', category: 'frontend-development', level: 'intermediate', order: 8 },
  { name: 'React Native', category: 'frontend-development', level: 'beginner', order: 9 },
  { name: 'Tailwind CSS', category: 'frontend-development', level: 'intermediate', order: 10 },
  { name: 'Framer Motion', category: 'frontend-development', level: 'intermediate', order: 11 },
  { name: 'Material UI', category: 'frontend-development', level: 'intermediate', order: 12 },
  { name: 'MySQL', category: 'databases', level: 'expert', years: '2+ years', description: 'Database design, optimization, Sequelize and Prisma ORM', featured: true, icon: 'Database', order: 13 },
  { name: 'PostgreSQL', category: 'databases', level: 'advanced', order: 14 },
  { name: 'MongoDB', category: 'databases', level: 'advanced', order: 15 },
  { name: 'Firebase/Firestore', category: 'databases', level: 'intermediate', order: 16 },
  { name: 'Redis', category: 'databases', level: 'intermediate', order: 17 },
  { name: 'OpenAI API', category: 'ai-ml-data-science', level: 'advanced', order: 18 },
  { name: 'LLM Fine-tuning', category: 'ai-ml-data-science', level: 'advanced', order: 19 },
  { name: 'Hugging Face', category: 'ai-ml-data-science', level: 'intermediate', order: 20 },
  { name: 'AWS', category: 'devops-cloud', level: 'intermediate', order: 21 },
  { name: 'Azure', category: 'devops-cloud', level: 'intermediate', order: 22 },
  { name: 'Docker', category: 'devops-cloud', level: 'intermediate', order: 23 },
  { name: 'Shopify', category: 'shopify-development', level: 'advanced', years: '1+ years', description: 'App development, theme extensions and Admin/Storefront APIs', featured: true, icon: 'ShoppingBag', order: 24 },
  { name: 'Shopify REST API', category: 'shopify-development', level: 'intermediate', order: 25 },
  { name: 'Shopify GraphQL', category: 'shopify-development', level: 'intermediate', order: 26 },
  { name: 'Expo', category: 'mobile-development', level: 'intermediate', order: 27 },
  { name: 'NativeWind', category: 'mobile-development', level: 'intermediate', order: 28 },
  { name: 'RBAC', category: 'security', level: 'advanced', order: 29 },
  { name: 'Git/GitHub', category: 'tools-platforms', level: 'expert', order: 30 },
  { name: 'Postman', category: 'tools-platforms', level: 'expert', order: 31 },
  { name: 'Team Leadership', category: 'soft-skills', level: 'advanced', order: 32 },
  { name: 'Technical Training', category: 'soft-skills', level: 'expert', order: 33 },
] as const

export const experienceCategorySeeds = [
  { title: 'Work', slug: 'work', color: 'cyan', order: 1 },
  { title: 'Teaching', slug: 'teaching', color: 'green', order: 2 },
  { title: 'Leadership', slug: 'leadership', color: 'purple', order: 3 },
]

export const experienceSeeds = [
  { title: 'Senior Web Developer', company: 'Appearls Technologies', category: 'work', employmentType: 'Full-Time', current: true, period: 'Jan 2025 - Present', location: 'Karachi, Pakistan (On-site)', summary: 'Building scalable MERN stack solutions and managing cloud infrastructure on Azure and AWS.', achievements: ['Custom MERN stack development with React, Next.js and Node.js', 'Managing deployments and cloud infrastructure using Azure and AWS', 'Collaborating with sales teams to finalize technical requirements'], technologies: ['React.js', 'Next.js', 'Node.js', 'Azure', 'AWS'], order: 1 },
  { title: 'IT Instructor', company: 'Bano Qabil (Alkhidmat)', category: 'teaching', employmentType: 'Part-Time (Teaching)', current: true, period: 'Jun 2025 - Present', location: 'Karachi, Pakistan (On-site)', summary: 'Teaching Web Development & Python to aspiring developers, empowering the next generation of tech talent.', achievements: ['Teaching and mentoring 100+ students across four batches', 'Delivering hands-on HTML, CSS, JavaScript, Python and AI training', 'Providing career guidance, portfolio support and project-based learning'], technologies: ['Python', 'React.js'], order: 2 },
  { title: 'Associate Software Engineer', company: 'SolCoders Pvt Ltd', category: 'work', employmentType: 'Full-Time', period: 'Dec 2024 - Jan 2026', location: 'Karachi, Pakistan (On-site)', summary: 'Full-stack development focusing on Shopify apps, enterprise HRM systems, and mobile applications.', achievements: ['Built custom Shopify apps with REST and GraphQL APIs', 'Led backend development for Teamify HRM used by 98% of staff', 'Built React Native HRM apps and led three junior engineers'], technologies: ['Node.js', 'Express.js', 'React.js', 'React Native', 'MySQL', 'Shopify'], order: 3 },
  { title: 'Frontend Developer', company: 'NED University of Engineering & Technology', category: 'work', employmentType: 'Contract', period: 'Feb 2024 - Jul 2025', location: 'Karachi, Pakistan (Hybrid)', summary: 'Developed QEC LMS and training systems for educational institutions.', achievements: ['Built training calendar, questionnaire and feedback modules', 'Implemented lazy loading and virtualization', 'Designed responsive interfaces with Material UI and Tailwind CSS'], technologies: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS', 'Material UI'], order: 4 },
  { title: 'Organizer & Technical Head', company: 'Teknofest Pakistan', category: 'leadership', employmentType: 'Part-Time', period: 'Jan 2026', location: 'Karachi, Pakistan (On-site)', summary: 'Organized and led Machine Learning and Data Analysis competitions at national level.', achievements: ['Designed competition structure, datasets, rules and evaluation criteria', 'Coordinated judges and participant queries under tight timelines'], technologies: ['Python'], order: 5 },
]

export const projectCategorySeeds = [
  { title: 'Web App', slug: 'web-app', color: 'cyan', order: 1 },
  { title: 'AI/ML', slug: 'ai-ml', color: 'purple', order: 2 },
  { title: 'Shopify', slug: 'shopify', color: 'green', order: 3 },
  { title: 'Mobile', slug: 'mobile', color: 'blue', order: 4 },
  { title: 'Blockchain', slug: 'blockchain', color: 'amber', order: 5 },
]

export const projectSeeds = [
  {
    title: 'FloXript: AI-Powered Codebase Tutorial Generator', slug: 'floxript', category: 'ai-ml', featured: true,
    shortDescription: 'Full-stack platform that transforms GitHub repositories into beginner-friendly tutorials using AI, featuring a RAG chatbot and visual diagrams.',
    tagline: 'Transform Complex Codebases into Interactive Tutorials with AI', dateRange: 'Dec 2025 - Jan 2026',
    technologies: ['FastAPI', 'React.js', 'TypeScript', 'React Native', 'Python', 'PostgreSQL', 'Docker'],
    externalLinks: [{ label: 'Source Code', url: 'https://github.com/syedibad/floxript', note: 'syedibad/floxript' }],
    overview: 'FloXript is a full-stack platform that transforms complex GitHub repositories into beginner-friendly, interactive tutorials using advanced AI techniques. It automatically analyzes repository structures, identifies core abstractions, and generates comprehensive learning materials with visual diagrams.',
    technicalImplementation: 'Built with a microservices architecture featuring a FastAPI backend, React TypeScript frontend, and React Native mobile app. PocketFlow supports intelligent code analysis while Celery handles asynchronous generation. ChromaDB stores vector embeddings for semantic search and PostgreSQL manages relational data.',
    impact: 'Democratizes codebase comprehension for developers at all skill levels, transforming passive documentation into an intelligent learning companion with contextual AI assistance.',
    features: ['Automatic GitHub repository analysis with OAuth integration', 'AI-powered tutorial generation with structured chapters and code snippets', 'Mermaid diagram generation for architectural visualization', 'RAG chatbot with semantic code search', 'Asynchronous processing with real-time progress tracking', 'Cross-platform web and mobile support', 'Personalized dashboards, tutorial starring and sharing'],
    contributors: [{ name: 'Syed Ibad Ali', role: 'Full-Stack Developer & AI Engineer', type: 'Personal Project', linkedIn: 'https://linkedin.com/in/syed-ibad-developer' }], order: 1,
  },
  { title: 'HRM System - Teamify', slug: 'hrm-system-teamify', category: 'web-app', featured: true, shortDescription: 'Enterprise-grade Human Resource Management system with real-time features and advanced security.', tagline: 'Human resources, reimagined for modern teams', dateRange: 'Oct 2024 - Dec 2025', technologies: ['Node.js', 'Express.js', 'MySQL', 'React.js', 'RBAC'], overview: 'Teamify centralizes attendance, leave, profiles and permissions in a secure enterprise HRM platform.', technicalImplementation: 'Node and Express services with Sequelize-backed MySQL, real-time attendance workflows, fine-grained RBAC and React dashboards.', impact: 'Adopted by 98% of company staff for daily operations.', features: ['Real-time check-in and check-out', 'Leave and attendance management', 'Designation, role and permission management'], order: 2 },
  { title: 'HRM Mobile Application', slug: 'hrm-mobile-application', category: 'mobile', featured: true, shortDescription: 'Modern HRM mobile application for attendance tracking, leave management, and real-time notifications.', dateRange: '2025', technologies: ['React Native', 'Expo', 'NativeWind', 'Tailwind CSS'], overview: 'A companion experience for Teamify that puts core HR workflows on iOS and Android.', technicalImplementation: 'React Native and Expo with NativeWind styling and secure API integration.', impact: 'Made attendance and leave workflows accessible to employees wherever they work.', features: ['Attendance tracking', 'Leave requests', 'Push notifications'], order: 3 },
  { title: 'Shopify VenceMetrics App', slug: 'shopify-vencemetrics-app', category: 'shopify', featured: true, shortDescription: 'Full-stack Shopify analytics application providing advanced e-commerce insights and KPI tracking.', dateRange: 'Apr 2025 - Jul 2025', technologies: ['Node.js', 'Express.js', 'MySQL', 'Shopify'], overview: 'An analytics suite for merchants who need actionable storefront intelligence.', technicalImplementation: 'Shopify Admin APIs feed a Node and MySQL analytics pipeline.', impact: 'Helped merchants understand performance and prioritize growth opportunities.', features: ['KPI dashboards', 'Store data synchronization', 'Actionable reporting'], order: 4 },
  { title: 'OncoCura - AI Cancer Care Platform', slug: 'oncocura', category: 'ai-ml', featured: true, shortDescription: 'AI-powered platform combining technology with empathy for cancer care management.', dateRange: 'Dec 2024 - Feb 2025', technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'OpenAI API'], overview: 'OncoCura brings guidance, tracking and supportive AI tools into one patient-centered platform.', technicalImplementation: 'MERN architecture with AI-assisted experiences and privacy-conscious health workflows.', impact: 'Explored how thoughtful software can reduce friction in a difficult care journey.', features: ['AI assistance', 'Care journey tracking', 'Patient-centered interface'], order: 5 },
  { title: 'ExoPlanetarium', slug: 'exoplanetarium', category: 'web-app', featured: false, shortDescription: 'Immersive web app for exploring exoplanet-related content with 3D visualizations.', dateRange: 'Oct 2024 - Nov 2024', technologies: ['React.js', 'Firebase/Firestore', 'OpenAI API'], overview: 'An immersive learning environment for discovering exoplanets.', technicalImplementation: 'React, Three Fiber, Firebase and an AI question-answering experience.', impact: 'Created for the NASA Space Apps Challenge.', features: ['Interactive 3D exploration', 'AI chatbot', 'Curated exoplanet content'], order: 6 },
]

export const achievementSeeds = [
  { title: 'CodeSphere Project Competition - 1st Prize', kind: 'highlight', badge: 'competition', issuer: 'Software Department, NED University', description: 'Won 1st prize in Desktop Application Development with an AI Virtual Assistant Chatbot.', date: 'Jan 2024', order: 1 },
  { title: 'Teknofest Pakistan Hackathon - Runner-Up', kind: 'highlight', badge: 'competition', issuer: 'Teknofest Pakistan', description: 'Secured runner-up position in the Full-Stack Frenzy competition.', date: 'Oct 2024', order: 2 },
  { title: 'Blockchain Workshop Conductor', kind: 'highlight', badge: 'workshop', issuer: 'NIC Karachi', description: 'Conducted hands-on blockchain and smart contract training.', date: 'Jun 2025', order: 3 },
  { title: 'NASA Space App Challenge', kind: 'highlight', badge: 'participation', issuer: 'NASA', description: 'Built ExoPlanetarium with 3D graphics and an AI chatbot.', date: 'Oct 2024', order: 4 },
  { title: 'Summer of Code & AI - 2025', kind: 'certification', issuer: 'Tech Community', order: 5 },
  { title: 'Fullstack Frenzy Hackathon', kind: 'certification', issuer: 'Teknofest Pakistan', order: 6 },
  { title: 'Databases and SQL for Data Science with Python', kind: 'certification', issuer: 'IBM, Coursera', order: 7 },
  { title: 'Introduction to Data Engineering', kind: 'certification', issuer: 'IBM, Coursera', order: 8 },
  { title: 'Python (Basic & Intermediate)', kind: 'certification', issuer: 'HackerRank', order: 9 },
  { title: 'SQL (Basic & Intermediate)', kind: 'certification', issuer: 'HackerRank', order: 10 },
  { title: 'Introduction to Cybersecurity', kind: 'certification', issuer: 'Cisco', order: 11 },
  { title: 'Frontend Capstone Certification', kind: 'certification', issuer: 'Meta', order: 12 },
]

export const portfolioSeed = {
  identity: { name: 'Syed Ibad Ali', initials: 'SI', professionalTitle: 'Backend Engineer', shortBio: 'Backend Engineer building scalable solutions with Node.js, Python, and AI/ML. Passionate about teaching and creating impact through technology.' },
  navigation: ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Achievements', 'Contact'].map((label) => ({ label, href: label === 'Home' ? '#home' : `#${label.toLowerCase()}` })),
  hero: { availability: 'Available for opportunities', eyebrow: "Hi, I'm", headline: 'Syed Ibad Ali', taglines: ['2x Competition Winner', 'Teaching 100+ Students', 'Building Scalable Backends', 'AI/ML Explorer'].map((text) => ({ text })), roles: ['Backend Engineer', 'IT Instructor', 'Web Developer', 'Shopify Developer'].map((role) => ({ role })), primaryButtonLabel: 'View My Work', secondaryButtonLabel: "Let's Connect", techLabel: 'Tech I love working with' },
  about: {
    heading: 'About Me', description: 'Get to know me better — my journey, passion, and what drives me to create impactful software.', experienceBadge: '2+ Years Experience', location: 'Karachi, Sindh, Pakistan', email: 'ibad1657@gmail.com', phone: '+92 336 8251372',
    paragraphs: [
      "I'm a software engineer who thrives on transforming complex challenges into elegant, scalable solutions. My journey began at NED University, where I quickly discovered that building software wasn't just about writing code—it was about creating impact.",
      'Today, I specialize in backend development with Node.js and Python, building everything from enterprise HRM systems used by entire companies to AI-powered Shopify apps serving merchants globally.',
      "Beyond the technical work, I'm passionate about lifting others up. As an IT Instructor at Bano Qabil, I've taught over 100 students the art of web development, helping them launch their careers in tech.",
      "When I'm not coding or teaching, you'll find me exploring AI/ML, contributing to open-source projects, or competing in hackathons. I'm always learning and always building.",
    ].map((text) => ({ text })),
    stats: [['2+', 'Years Experience'], ['100+', 'Students Taught'], ['25+', 'Projects Delivered'], ['2x', 'Competition Wins'], ['5+', 'Hackathons participated'], ['15+', 'Conferences and Ted Talks Attended'], ['4+', 'Industry Visits'], ['5+', 'Events Organized']].map(([value, label]) => ({ value, label })),
  },
  experienceSection: { heading: 'Experience', description: 'My professional journey — from internships to leading teams and teaching the next generation of developers.' },
  skillsSection: { heading: 'Skills & Expertise', description: 'A comprehensive toolkit spanning backend, frontend, AI/ML, DevOps, and beyond — built through hands-on experience.' },
  projectsSection: { heading: 'Featured Projects', description: 'A showcase of my best work — from AI-powered healthcare platforms to enterprise HRM systems and blockchain applications.' },
  achievementsSection: { heading: 'Achievements', description: 'Competition wins, certifications, and milestones that mark my journey as a developer.' },
  achievementStats: [{ value: '2x', label: 'Competition Winner', color: 'amber' }, { value: '8+', label: 'Certifications', color: 'green' }, { value: '100+', label: 'Students Taught', color: 'cyan' }, { value: '1', label: 'Workshop Conducted', color: 'purple' }],
  contact: { heading: 'Get In Touch', description: "Have a project in mind or want to collaborate? I'd love to hear from you. Let's build something amazing together!", formHeading: 'Send a Message', responseNote: "I'll respond within 24 hours", email: 'ibad1657@gmail.com', phone: '+92 336 8251372', location: 'Karachi, Sindh, Pakistan', availabilityHeading: 'Currently Available', availabilityText: "I'm open to new opportunities, freelance projects, and interesting collaborations. Feel free to reach out!", availabilityTags: ['Full-time positions', 'Freelance projects', 'Consulting'].map((label) => ({ label })), socialLinks: [{ label: 'LinkedIn', url: 'https://linkedin.com/in/syed-ibad-developer' }, { label: 'GitHub', url: 'https://github.com/syedibad' }] },
  footer: { description: 'Backend Engineer building scalable solutions with Node.js, Python, and AI/ML.', copyright: '© 2026 Syed Ibad Ali. All rights reserved.' },
  seo: { title: 'Syed Ibad Ali | Backend Engineer & Full-Stack Developer', description: 'Software Engineer specializing in Node.js, Python, AI/ML, and Shopify development.' },
}
