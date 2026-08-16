import { Project, Experience, SkillCategory, LeadershipRole, Education, Certification } from '../types';

export const PERSONAL_INFO = {
  name: 'SAHIL DAHALE',
  title: 'B.Tech Final Year Student • Aspiring Data Analyst • Data Scientist',
  tagline: 'Transforming complex datasets into actionable business intelligence, predictive ML models, and interactive dashboards.',
  location: 'Nashik, Maharashtra, India',
  email: 'sahildahale321@gmail.com',
  phone: '+91 8885055486',
  linkedin: 'https://www.linkedin.com/in/sahil-dahale-50aa42299/',
  bio: "Hi, I’m Sahil Dahale, an Artificial Intelligence and Machine Learning student with a strong interest in Data Science, Machine Learning, Data Analytics, and intelligent software solutions. I enjoy taking real-world problems, working with data, and turning that data into meaningful insights and practical machine-learning solutions. My experience includes working with Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, and modern development tools, along with hands-on experience across data analysis, machine learning, NLP, and full-stack development. Alongside technology, I’ve developed my leadership and communication skills as Campus President, representing more than 3000 students.",
  metrics: [
    { label: 'B.Tech AIML CGPA', value: '8.0 / 10', desc: 'Sandip University (Final Year)' },
    { label: 'Industry Internships', value: '5 Roles', desc: 'Data Analytics & Data Science' },
    { label: 'Students Represented', value: '3000+', desc: 'Campus President Leadership' },
    { label: 'Data & ML Projects', value: '10+', desc: 'Analytics, Dashboards & Pipelines' },
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'prog',
    title: 'Programming Languages',
    iconName: 'Code',
    skills: [
      { name: 'Python', level: 92, description: 'Core language for AI/ML, Pandas, Scikit-learn, and backend automation.' },
      { name: 'SQL', level: 88, description: 'Relational data querying, complex joins, subqueries, and window functions.' },
      { name: 'Basic C++', level: 75, description: 'Data structures, algorithms, and object-oriented concepts.' }
    ]
  },
  {
    id: 'analysis',
    title: 'Data Analysis & Mining',
    iconName: 'BarChart2',
    skills: [
      { name: 'Pandas', level: 90, description: 'Data manipulation, cleaning, transformations, and aggregation.' },
      { name: 'NumPy', level: 88, description: 'Vectorized mathematical computations, matrix operations, and arrays.' },
      { name: 'Excel', level: 85, description: 'Advanced formulas, pivot tables, lookup functions, and data auditing.' },
      { name: 'Exploratory Data Analysis', level: 92, description: 'Hypothesis testing, outlier detection, and data distribution profiling.' }
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    iconName: 'Brain',
    skills: [
      { name: 'Scikit-learn', level: 90, description: 'Model training, hyperparameter tuning, pipelines, and evaluation metrics.' },
      { name: 'Classification', level: 88, description: 'Logistic Regression, Random Forest, SVM, Naive Bayes.' },
      { name: 'Regression', level: 88, description: 'Linear, Ridge, Lasso, and Polynomial regression analysis.' },
      { name: 'Clustering', level: 85, description: 'K-Means, Hierarchical, and DBSCAN unsupervised learning.' },
      { name: 'Model Evaluation', level: 89, description: 'Confusion Matrix, ROC-AUC, Precision/Recall, Cross-Validation.' }
    ]
  },
  {
    id: 'nlp',
    title: 'AI & NLP',
    iconName: 'Sparkles',
    skills: [
      { name: 'Natural Language Processing', level: 86, description: 'Text preprocessing, NLTK, TF-IDF vectorization, Cosine Similarity.' },
      { name: 'Generative AI Fundamentals', level: 82, description: 'Prompt engineering, LLM integration APIs, RAG concepts.' }
    ]
  },
  {
    id: 'viz',
    title: 'Data Visualization',
    iconName: 'PieChart',
    skills: [
      { name: 'Power BI', level: 88, description: 'DAX expressions, interactive dashboards, data modeling, KPI tracking.' },
      { name: 'Matplotlib & Seaborn', level: 86, description: 'Custom statistical plots, heatmaps, and distribution visualizers.' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Databases',
    iconName: 'Database',
    skills: [
      { name: 'Git & GitHub', level: 88, description: 'Version control, branch management, collaborative workflows.' },
      { name: 'Jupyter & Colab', level: 92, description: 'Interactive prototyping, GPU acceleration, markdown reporting.' },
      { name: 'MySQL', level: 85, description: 'Schema creation, index optimization, relational database management.' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Data Science Intern',
    company: 'Oasis Infobyte',
    period: 'Aug 2026 – Present',
    location: 'Virtual',
    type: 'Virtual',
    highlights: [
      'Developed end-to-end Data Science and Machine Learning models for real-world predictive analytics.',
      'Applied supervised learning algorithms including classification and regression to solve business problem statements.',
      'Conducted extensive Exploratory Data Analysis (EDA) and feature engineering using Pandas and NumPy.'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'EDA', 'Machine Learning']
  },
  {
    id: 'exp-2',
    role: 'Full Stack Web Development Intern',
    company: 'Mindenious',
    period: 'Jul 2025 – Sep 2025',
    location: 'India',
    type: 'Hybrid',
    highlights: [
      'Engineered responsive web applications utilizing modern front-end frameworks and back-end integration.',
      'Authored clear technical documentation and performed rigorous unit/integration testing for system reliability.',
      'Collaborated with cross-functional teams to translate wireframes into interactive product features.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Testing', 'Documentation']
  },
  {
    id: 'exp-3',
    role: 'Data Science Intern',
    company: 'HunarIntern',
    period: 'Jun 2025 – Jul 2025',
    location: 'Remote',
    type: 'Remote',
    highlights: [
      'Engineered machine learning models for classification tasks and data insights extraction.',
      'Optimized data cleaning pipelines, handling missing values, encoding categorical variables, and scaling features.',
      'Visualized model performance metrics including ROC curves and precision-recall trade-offs.'
    ],
    technologies: ['Python', 'Matplotlib', 'Seaborn', 'Classification', 'Model Evaluation']
  },
  {
    id: 'exp-4',
    role: 'Data Science Intern',
    company: 'SaiKet Systems',
    period: '2025',
    location: 'Remote',
    type: 'Remote',
    highlights: [
      'Analyzed structured datasets to derive actionable business Intelligence and trend analysis.',
      'Constructed predictive pipelines to evaluate model accuracy using cross-validation techniques.'
    ],
    technologies: ['Python', 'Data Wrangling', 'Scikit-learn', 'Statistical Analysis']
  },
  {
    id: 'exp-5',
    role: 'Data Analysis Using Python Intern',
    company: 'Auspify Technologies',
    period: '2025',
    location: 'Remote',
    type: 'Remote',
    highlights: [
      'Automated data cleaning and transformation tasks using custom Python scripts.',
      'Built automated visual reporting graphics to summarize statistical distributions.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Automation']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p-1',
    title: 'AI Resume Screening System',
    category: 'NLP',
    shortDesc: 'Automated NLP pipeline that parses resumes and scores match relevance against job descriptions using TF-IDF and Cosine Similarity.',
    technologies: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Text Similarity', 'NLTK'],
    visualType: 'resume',
    problem: 'Recruiters spend hours manually reviewing hundreds of resume PDFs to identify qualified candidates.',
    approach: 'Engineered a text processing pipeline with stop-word removal, lemmatization, TF-IDF vectorization, and Cosine Similarity scoring.',
    modelDetails: 'TF-IDF Vectorizer with N-gram range (1,2) and Cosine Similarity metric for semantic matching.',
    results: [
      'Automated candidate ranking with accurate similarity scores.',
      'Reduced manual resume screening time significantly.',
      'Highlighted key skill matches and keyword gaps instantly.'
    ],
    keyInsights: [
      'Domain-specific keyword extraction outperforms generic frequency counting.',
      'Lemmatization preserves semantic context across varying verb tenses.'
    ],
    githubUrl: 'https://github.com/sahildahale/AI-Resume-Screening-System',
    demoType: 'Interactive Resume Matcher Simulator',
    metrics: [
      { label: 'Screening Time Saved', value: '85%' },
      { label: 'Similarity Precision', value: 'High' }
    ]
  },
  {
    id: 'p-2',
    title: 'Customer Churn Prediction',
    category: 'ML',
    shortDesc: 'Predictive binary classification model analyzing customer behavioral data to identify high-risk attrition signals proactively.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'XGBoost', 'EDA'],
    visualType: 'churn',
    problem: 'Subscription services lose substantial revenue when churned customers are identified too late for retention campaigns.',
    approach: 'Performed EDA on customer demographics, usage frequency, and support ticket history. Evaluated Random Forest and Gradient Boosting models.',
    modelDetails: 'Ensemble Learning classifier with SMOTE oversampling for class imbalance resolution.',
    results: [
      'Achieved strong classification recall on high-churn customer segments.',
      'Identified monthly tenure and support ticket frequency as top churn drivers.'
    ],
    keyInsights: [
      'Early tenure months carry 3x higher churn probability.',
      'Customer support ticket resolution time directly correlates with churn risk.'
    ],
    githubUrl: 'https://github.com/sahildahale/Customer-Churn-Prediction',
    demoType: 'Live Churn Risk Predictor',
    metrics: [
      { label: 'Top Predictor', value: 'Tenure & Tickets' },
      { label: 'Risk Stratification', value: '3 Tiers' }
    ]
  },
  {
    id: 'p-3',
    title: 'Credit Card Fraud Detection',
    category: 'ML',
    shortDesc: 'Anomaly detection classification system identifying fraudulent financial transactions in highly imbalanced datasets.',
    technologies: ['Python', 'NumPy', 'Scikit-learn', 'Classification', 'Anomaly Detection'],
    visualType: 'fraud',
    problem: 'Financial institutions require sub-second transaction classification to block fraudulent transactions without flagging legitimate users.',
    approach: 'Applied robust feature scaling, PCA dimensional reduction analysis, and cost-sensitive classification algorithms.',
    modelDetails: 'Logistic Regression with class weight balancing & Isolation Forest anomaly scoring.',
    results: [
      'Successfully identified fraudulent anomalies with low false-positive rate.',
      'Handled 0.17% fraud prevalence imbalance efficiently.'
    ],
    keyInsights: [
      'Standard accuracy is misleading in imbalanced datasets; ROC-AUC & PR-AUC are mandatory metrics.',
      'PCA components retain critical variance while protecting transaction privacy.'
    ],
    githubUrl: 'https://github.com/sahildahale/Credit-Card-Fraud-Detection',
    demoType: 'Real-time Fraud Stream Detector',
    metrics: [
      { label: 'Imbalance Handled', value: '0.17% Ratio' },
      { label: 'Metric Focus', value: 'ROC-AUC / Precision' }
    ]
  },
  {
    id: 'p-4',
    title: 'Retail Sales Dashboard',
    category: 'Analytics',
    shortDesc: 'Interactive Power BI analytics dashboard featuring DAX measures, regional breakdown, and sales KPI performance tracking.',
    technologies: ['Power BI', 'DAX', 'Excel', 'Data Modeling', 'KPI Dashboards'],
    visualType: 'sales',
    problem: 'Retail managers lacked consolidated cross-region visibility into product profit margins and seasonal demand fluctuations.',
    approach: 'Built a multi-fact star schema in Power BI, created custom DAX measures for Year-over-Year (YoY) growth, and designed intuitive drill-down charts.',
    modelDetails: 'Relational Star Schema with dimension tables for Customers, Products, Regions, and Time.',
    results: [
      'Delivered interactive executive views for quarterly sales trends.',
      'Enabled regional drill-downs down to store location level.'
    ],
    keyInsights: [
      'Top 20% of SKU inventory generated 75% of total quarterly operating margin.',
      'Promotional discounts during off-peak months boosted regional retention.'
    ],
    githubUrl: 'https://github.com/sahildahale/Retail-Sales-Dashboard',
    demoType: 'Interactive BI Sales Dashboard',
    metrics: [
      { label: 'Data Model', value: 'Star Schema' },
      { label: 'Insights Unlocked', value: 'YoY Trends' }
    ]
  },
  {
    id: 'p-5',
    title: 'Customer Segmentation Analysis',
    category: 'ML',
    shortDesc: 'Unsupervised Machine Learning model using K-Means clustering to segment retail customers based on spending score and annual income.',
    technologies: ['Python', 'K-Means', 'Scikit-learn', 'Matplotlib', 'Cluster Analysis'],
    visualType: 'clustering',
    problem: 'Marketing teams waste ad spend sending generic campaigns instead of targeted messaging suited to distinct customer personas.',
    approach: 'Used the Elbow Method and Silhouette Analysis to determine optimal cluster size K=5, then visualized cluster boundaries.',
    modelDetails: 'K-Means Clustering with StandardScaler preprocessing and Silhouette Score optimization.',
    results: [
      'Identified 5 distinct customer groups: High Earners/High Spenders, Conservative Savers, Target Shoppers, Careless Spenders, and Budget Seekers.',
      'Mapped clear actionable persona profiles for tailored marketing strategies.'
    ],
    keyInsights: [
      'High Spenders with moderate income respond best to loyalty reward programs.',
      'Cluster stability verified across multiple random initializations.'
    ],
    githubUrl: 'https://github.com/sahildahale/Customer-Segmentation',
    demoType: 'Interactive K-Means Cluster Canvas',
    metrics: [
      { label: 'Optimal Clusters (K)', value: '5 Clusters' },
      { label: 'Methodology', value: 'Elbow & Silhouette' }
    ]
  },
  {
    id: 'p-6',
    title: 'Employee Attrition Prediction',
    category: 'ML',
    shortDesc: 'Predictive HR analytics model uncovering key organizational drivers behind workforce turnover.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Logistic Regression'],
    visualType: 'attrition',
    problem: 'High turnover increases recruitment costs and disrupts organizational knowledge continuity.',
    approach: 'Analyzed HR analytics metrics including work-life balance ratings, overtime hours, monthly income, and years at company.',
    modelDetails: 'Logistic Regression with odds ratio interpretation.',
    results: [
      'Quantified impact of mandatory overtime on employee retention probability.',
      'Provided HR leaders with actionable early intervention lists.'
    ],
    keyInsights: ['Frequent overtime combined with low salary growth increases attrition probability by 4.2x.'],
    githubUrl: 'https://github.com/sahildahale/Employee-Attrition-Prediction',
    demoType: 'HR Turnover Signal Evaluator'
  },
  {
    id: 'p-7',
    title: 'Car Price Prediction',
    category: 'ML',
    shortDesc: 'Supervised regression pipeline predicting used car market prices based on mileage, fuel type, and vehicle age.',
    technologies: ['Python', 'Scikit-learn', 'Regression', 'Feature Engineering'],
    visualType: 'car',
    problem: 'Used car buyers and sellers experience price opacity due to subjective valuations.',
    approach: 'Trained Multiple Linear Regression, Ridge, and Decision Tree regressors on automotive dataset.',
    modelDetails: 'Ridge Regression with Cross-Validation and Polynomial Feature expansion.',
    results: ['Achieved high R2 score on holdout test set with minimal Mean Absolute Error (MAE).'],
    keyInsights: ['Vehicle age and brand reputation account for 78% of overall price variance.'],
    githubUrl: 'https://github.com/sahildahale/Car-Price-Prediction',
    demoType: 'Valuation Calculator'
  },
  {
    id: 'p-8',
    title: 'Email Spam Detection',
    category: 'NLP',
    shortDesc: 'Text classification model identifying spam vs ham emails using Naive Bayes and CountVectorizer.',
    technologies: ['Python', 'NLP', 'Naive Bayes', 'CountVectorizer'],
    visualType: 'spam',
    problem: 'Phishing and unsolicited spam compromise user security and inbox productivity.',
    approach: 'Preprocessed raw email text, built term frequency matrix, and applied Multinomial Naive Bayes classifier.',
    modelDetails: 'Multinomial Naive Bayes with Laplace Smoothing.',
    results: ['High precision in filtering spam messages while preventing legitimate ham false positives.'],
    keyInsights: ['Urgency triggers and suspicious hyperlink ratios are primary indicators of spam.'],
    githubUrl: 'https://github.com/sahildahale/Email-Spam-Detection',
    demoType: 'Spam Filter Simulator'
  }
];

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    id: 'lead-1',
    role: 'Campus President',
    organization: 'Sandip University, Nashik',
    impactMetric: '3000+ Students Represented',
    description: 'Elected student leader advocating for student academic concerns, organizing technical workshops, and acting as liaison with university administration.',
    highlights: [
      'Represented 3000+ undergraduate students across academic and co-curricular forums.',
      'Organized university-level technical symposiums, hackathons, and industry mentorship sessions.',
      'Fostered collaborative communication between student body and university department heads.'
    ]
  },
  {
    id: 'lead-2',
    role: 'Hackathon Organizing Lead',
    organization: 'DIPEX Official',
    impactMetric: 'State-level Technical Event',
    description: 'Led event planning, logistics, participant coordination, and judging panel alignment for DIPEX state-level project exhibition.',
    highlights: [
      'Managed event logistics, venue coordination, and technical evaluation criteria.',
      'Mentored participating student teams in presenting technical project architectures.',
      'Ensured seamless operations and judge panel score tabulations.'
    ]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    institution: 'Sandip University',
    location: 'Nashik, Maharashtra',
    grade: 'CGPA: 8.0 / 10',
    period: 'Expected Graduation: July 2027',
    details: 'Focus on Machine Learning, Deep Learning, Natural Language Processing, Data Structures, Algorithms, and Software Engineering principles.'
  },
  {
    degree: 'Higher Secondary Certificate (Class XII)',
    institution: 'State Board',
    location: 'Maharashtra',
    grade: '87.5%',
    period: 'Completed 2023',
    details: 'Physics, Chemistry, Mathematics (PCM) focus with strong performance in mathematics and computer applications.'
  },
  {
    degree: 'Secondary School Certificate (Class X)',
    institution: 'State Board',
    location: 'Maharashtra',
    grade: 'CGPA: 10 / 10 (100%)',
    period: 'Completed 2021',
    details: 'Academic excellence with top rank marks in Science and Mathematics.'
  }
];

export const CERTIFICATIONS_LIST: Certification[] = [
  {
    title: 'Applied Machine Learning & Data Analysis Projects',
    issuer: 'Oasis Infobyte',
    status: 'Completed',
    year: '2026',
    credentialId: 'OI-ML-2026'
  },
  {
    title: 'Robotic Process Automation (RPA) Fundamentals',
    issuer: 'UiPath',
    status: 'Completed',
    year: '2025',
    credentialId: 'UIPATH-RPA-001'
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    status: 'In Progress',
    year: '2026'
  },
  {
    title: 'IBM Data Science Professional Certificate',
    issuer: 'IBM',
    status: 'In Progress',
    year: '2026'
  }
];
