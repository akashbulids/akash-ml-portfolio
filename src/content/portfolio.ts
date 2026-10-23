// All portfolio content lives here, separate from presentation.
export const profile = {
  name: "Akash R",
  site: "Akash R — Neural Odyssey",
  headline: "Aspiring Machine Learning Engineer",
  roles: ["Machine Learning Engineer", "AI/ML Developer", "NLP Enthusiast", "Data Science Practitioner"],
  location: "Bengaluru, India",
  intro:
    "I build practical machine-learning projects that turn real-world data into useful predictions, customer insights, and interactive applications.",
  about: [
    "I'm Akash R, an aspiring Machine Learning Engineer interested in practical machine-learning applications, predictive modeling, NLP, and data-driven solutions.",
    "I have completed Machine Learning and Data Science training at Boston Institute of Analytics, Bengaluru, and have developed projects involving prediction, customer segmentation, sentiment analysis, and machine-learning applications.",
  ],
  interests: ["Machine Learning Engineer", "AI/ML Engineer", "NLP Engineer", "Data Science internships"],
  technical: ["Predictive modeling", "Natural language processing", "Customer segmentation", "Interactive ML apps"],
  github: "https://github.com/akashbulids",
  linkedin: "https://www.linkedin.com/in/akash-r-259945425/",
};

export const portfolioCopy = {
  hero: {
    eyebrow: "Machine learning · data science · NLP",
    viewProjects: "View projects",
    contact: "Contact me",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About · learning through practical work",
    title: "Learning through building",
    careerInterests: "Career interests",
    technicalInterests: "Technical interests",
    education: "Education",
    training: "Training",
  },
  skills: {
    eyebrow: "Capabilities · built through projects",
    title: "Skills & tools",
    introduction:
      "A practical toolkit shaped by coursework and hands-on projects—not a list of tools I have not used.",
  },
  projects: {
    eyebrow: "Applied machine learning · selected work",
    title: "Projects",
    repository: "Repository",
    details: "Project details",
    hideDetails: "Hide details",
    backend: "Live backend",
    demo: "Demo · Used Car Price Estimation",
    illustrativeClusters: "Illustrative K-means customer segments",
    illustrativeData: "Illustrative · not real data",
  },
  education: {
    eyebrow: "Learning journey",
    title: "Education & training",
  },
  contact: {
    eyebrow: "Open to opportunities",
    titlePrefix: "Let’s build something",
    titleAccent: "useful with data.",
    introduction:
      "I’m looking for Machine Learning, AI/ML, NLP, and Data Science internship or entry-level opportunities. I’d be glad to connect.",
    github: "GitHub profile",
    backToTop: "Back to top",
    footer: "Built with curiosity",
  },
};

export type SkillCategory = {
  id: "python" | "ml" | "ds" | "nlp" | "tools";
  label: string;
  items: string[];
  note?: string;
};
export const skills: SkillCategory[] = [
  { id: "python", label: "Programming", items: ["Python", "Object-oriented programming"] },
  { id: "ml", label: "Machine learning", items: ["Supervised learning", "Regression", "Classification", "K-means clustering", "Model evaluation", "Feature preprocessing", "TensorFlow"] },
  { id: "ds", label: "Data science", items: ["Pandas", "NumPy", "Data cleaning", "Exploratory data analysis", "Data visualization"] },
  { id: "nlp", label: "NLP", items: ["Text cleaning", "Natural language processing", "Sentiment analysis", "Bidirectional LSTM"] },
  { id: "tools", label: "Tools & deployment", items: ["Scikit-learn", "Jupyter Notebook", "Git", "GitHub", "FastAPI", "React", "Streamlit"] },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  summary: string;
  details: string[];
  highlights?: string[];
  github: string;
  backend?: string;
  hasVideo?: boolean;
  shape: "car" | "plane" | "clusters" | "speech";
};

export const projects: Project[] = [
  {
    id: "car",
    index: "01",
    title: "Used Car Price Estimation",
    kind: "Regression · Prediction app",
    summary: "Estimates a used car's price from its specifications through a React interface connected to a FastAPI prediction backend.",
    details: ["Regression task: predicting a continuous price", "React frontend integrated with a FastAPI backend", "Backend hosted on Render"],
    github: "https://github.com/akashbulids/Used-Car-Price-Estimation",
    backend: "https://used-car-price-estimation-backed.onrender.com",
    hasVideo: true,
    shape: "car",
  },
  {
    id: "airline",
    index: "02",
    title: "Airline Passenger Satisfaction",
    kind: "Classification",
    summary: "Predicts passenger satisfaction from passenger, flight, and service-rating data using supervised classification.",
    details: ["Data cleaning, exploratory analysis, outlier handling, and preprocessing", "Compared multiple classifiers and tuned a Random Forest model", "Evaluation includes accuracy, class-level F1, and ROC-AUC; deployed with Streamlit"],
    highlights: ["README-reported accuracy: 95%", "README-reported ROC-AUC: 0.961"],
    github: "https://github.com/akashbulids/Airline-passenger-satisfaction-prediction-project",
    shape: "plane",
  },
  {
    id: "segments",
    index: "03",
    title: "Credit Card Customer Segmentation",
    kind: "Unsupervised · K-means",
    summary: "Uses K-means to group credit card customers by spending and usage behaviour, with segment profiling in a Streamlit application.",
    details: ["Unsupervised learning with K-means", "Four customer segments documented in the repository README", "Streamlit application for the segmentation project"],
    highlights: ["4 README-documented segments"],
    github: "https://github.com/akashbulids/credit-card-customer-segmentation-kmeans-ml",
    shape: "clusters",
  },
  {
    id: "sentiment",
    index: "04",
    title: "McDonald's Sentiment Analysis",
    kind: "NLP",
    summary: "Analyzes McDonald's customer reviews with NLP and a Bidirectional LSTM sentiment model.",
    details: ["Bidirectional LSTM model documented in the repository README", "TensorFlow and Streamlit are listed in the project stack", "Text classification of customer reviews"],
    github: "https://github.com/akashbulids/mcdonalds-sentiment-analysis",
    shape: "speech",
  },
];

export const education = [
  { tag: "BE", title: "Computer Science and Engineering", place: "Theni Kammavar Sangam College of Technology", sub: "", when: "2024 – 2026" },
  { tag: "Diploma", title: "Electronics and Communication Engineering", place: "Government Polytechnic College, Kottur", sub: "", when: "2021 – 2023" },
  { tag: "Training", title: "Machine Learning & Data Science", place: "Boston Institute of Analytics", sub: "Electronic City, Bengaluru", when: "Completed October 2026" },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
