// All portfolio content lives here, separate from presentation.
export const profile = {
  name: "Akash R",
  site: "Akash R — The AI Universe",
  roles: ["Machine Learning Engineer", "AI/ML Developer", "NLP Enthusiast", "Data Science Practitioner"],
  intro:
    "Welcome to my portfolio. I build practical machine-learning projects and explore intelligent, data-driven solutions through predictive modeling, NLP, and interactive applications.",
  about: [
    "I'm Akash R, an aspiring Machine Learning Engineer interested in practical machine-learning applications, predictive modeling, NLP, and data-driven solutions.",
    "I have completed Machine Learning and Data Science training at Boston Institute of Analytics, Bengaluru, and have developed projects involving prediction, customer segmentation, sentiment analysis, and machine-learning applications.",
  ],
  interests: ["Machine Learning Engineer", "AI/ML Engineer", "NLP Engineer", "Data Science internships"],
  technical: ["Predictive modeling", "Natural language processing", "Customer segmentation", "Interactive ML apps"],
  github: "https://github.com/akashbulids",
  linkedin: "https://www.linkedin.com/in/akash-r-259945425/",
};

export type SkillCategory = { id: string; label: string; items: string[]; note?: string };
export const skills: SkillCategory[] = [
  { id: "python", label: "Python", items: ["Python", "Object-oriented programming"] },
  { id: "ml", label: "Machine Learning", items: ["Regression", "Classification", "Clustering", "Model evaluation", "Feature preprocessing", "Supervised learning"] },
  { id: "ds", label: "Data Science", items: ["Pandas", "NumPy", "Data cleaning", "Exploratory data analysis", "Data visualization"] },
  { id: "nlp", label: "NLP", items: ["Natural language processing", "Sentiment analysis"] },
  { id: "tools", label: "Tools", items: ["Scikit-learn", "Jupyter Notebook", "Git", "GitHub"] },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  summary: string;
  details: string[];
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
    summary: "Estimates the resale price of a used car from its attributes, served through a deployed prediction backend.",
    details: ["Regression task: predicting a continuous price", "Web front end that sends car details to the prediction backend", "Backend hosted on Render"],
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
    summary: "Predicts whether an airline passenger is satisfied or not, framed as a supervised classification problem.",
    details: ["Binary classification: satisfied vs. neutral / dissatisfied", "Data cleaning, preprocessing and exploratory analysis", "Model training and evaluation"],
    github: "https://github.com/akashbulids/Airline-passenger-satisfaction-prediction-project",
    shape: "plane",
  },
  {
    id: "segments",
    index: "03",
    title: "Credit Card Customer Segmentation",
    kind: "Unsupervised · K-means",
    summary: "Groups credit card customers into segments with K-means clustering to reveal distinct usage behaviour.",
    details: ["Unsupervised learning with K-means", "Feature scaling before clustering", "Segment profiling for interpretation"],
    github: "https://github.com/akashbulids/credit-card-customer-segmentation-kmeans-ml",
    shape: "clusters",
  },
  {
    id: "sentiment",
    index: "04",
    title: "McDonald's Sentiment Analysis",
    kind: "NLP",
    summary: "Classifies the sentiment of McDonald's customer reviews using natural language processing.",
    details: ["Text cleaning and preprocessing", "Sentiment classification of reviews", "See the repository for the exact model used"],
    github: "https://github.com/akashbulids/mcdonalds-sentiment-analysis",
    shape: "speech",
  },
];

export const education = [
  { tag: "Training", title: "Machine Learning & Data Science", place: "Boston Institute of Analytics", sub: "Electronic City, Bengaluru", when: "Completed October 2026" },
  { tag: "BE", title: "Computer Science and Engineering", place: "Theni Kammavar Sangam College of Technology", sub: "", when: "2024 – 2026" },
  { tag: "Diploma", title: "Electronics and Communication Engineering", place: "Government Polytechnic College, Kottur", sub: "", when: "2021 – 2023" },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
