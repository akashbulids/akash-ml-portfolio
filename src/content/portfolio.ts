// All portfolio content lives here, separate from presentation.
export const profile = {
  name: "Akash R",
  site: "Akash R — Neural Odyssey",
  headline: "Aspiring Machine Learning Engineer",
  roles: ["Machine Learning Engineer", "NLP Engineer", "AI Application Developer", "Data Science Enthusiast"],
  location: "Bengaluru, India",
  intro: "I build practical machine learning applications, explore natural language processing, and turn data-driven ideas into useful software.",
  about: [
    "I’m an aspiring Machine Learning Engineer focused on developing practical machine learning applications, exploring natural language processing, and building end-to-end data-driven solutions.",
    "I have completed Machine Learning and Data Science training at Boston Institute of Analytics, Bengaluru, and have developed projects involving prediction, customer segmentation, sentiment analysis, and machine-learning applications.",
  ],
  github: "https://github.com/akashbulids",
  linkedin: "https://www.linkedin.com/in/akash-r-259945425/",
};

export const portfolioCopy = {
  loader: {
    initials: "AR",
    name: "AKASH R",
    role: "MACHINE LEARNING ENGINEER",
    message: "INITIALIZING NEURAL INTERFACE",
    enter: "Enter portfolio",
    code: ["feature_map = transform(data)", "model.fit(X_train, y_train)", "prediction = model.predict(X)"],
  },
  hero: {
    eyebrow: "AKASH R / ASPIRING MACHINE LEARNING ENGINEER",
    roleLabel: "Exploring",
    titleLines: ["AKASH", "R.", "BUILDING", "INTELLIGENCE."],
    accessibleTitle: "Akash R. Building intelligence.",
    statement: "Machine Learning / NLP / Data-Driven Applications",
    visualCode: ["# model.py", "from sklearn import ensemble", "model.fit(X_train, y_train)", "→ ready to predict"],
    signalLabel: "Signal",
    viewProjects: "Explore my work",
    contact: "Contact me",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "ABOUT · THE ENGINEER BEHIND THE MODELS",
    title: "Curious mind. Intelligent systems.",
    principles: [
      { number: "01", title: "Understand the data", description: "Explore patterns, clean datasets, and develop meaningful features." },
      { number: "02", title: "Build the model", description: "Experiment with machine-learning algorithms and evaluate performance." },
      { number: "03", title: "Make it useful", description: "Connect models to practical applications through APIs and interfaces." },
    ],
  },
  skills: {
    eyebrow: "MACHINE LEARNING · TECHNICAL SKILLS",
    title: "Tools for practical intelligence.",
    introduction: "A focused overview of the languages, libraries, methods, and deployment tools I have used in training and hands-on projects.",
  },
  projects: {
    eyebrow: "APPLIED MACHINE LEARNING · SELECTED WORK",
    title: "Real projects. Real experiments. Practical intelligence.",
    introduction: "Four projects in prediction, NLP, and customer insight. Open each repository for source code and full project details.",
    repository: "Repository",
    githubProfile: "View GitHub profile",
    technologies: "Technologies",
    details: "Project details",
    hideDetails: "Hide details",
    backend: "Live backend",
    demo: "Demo · Used Car Price Estimation",
    illustrativeClusters: "Illustrative visualization of hypothetical K-means customer segments",
    illustrativeData: "Illustrative artwork · not a project screenshot",
  },
  education: {
    eyebrow: "LEARNING & PROJECT JOURNEY",
    title: "Learning & project journey",
  },
  pipeline: {
    eyebrow: "SIGNATURE EXPERIENCE · AN EDUCATIONAL MODEL WORKFLOW",
    title: "From data collection to deployment.",
    introduction: "Explore a conceptual machine-learning workflow. The illustration explains common stages; it does not run a trained model.",
    stages: [
      { id: "data", title: "Data collection", description: "Identify the source data and understand what each row and feature represents." },
      { id: "preprocessing", title: "Data cleaning", description: "Clean and prepare the collected data so it is suitable for analysis and model input." },
      { id: "features", title: "Feature engineering", description: "Select and transform relevant inputs to represent the problem more clearly." },
      { id: "training", title: "Model training", description: "Fit an appropriate machine-learning model using training data." },
      { id: "evaluation", title: "Evaluation", description: "Check model performance with suitable metrics before relying on its output." },
      { id: "deployment", title: "Deployment", description: "Make a trained model available for use through an application, API, or other suitable interface." },
    ],
    visualizationLabel: "Conceptual illustration of data moving through a machine-learning workflow. No live model is running.",
    visuals: {
      raw: [[104, 102], [196, 176], [286, 84], [358, 196], [452, 119], [536, 206], [642, 91], [734, 159], [836, 102], [884, 208]],
      cleaned: [[125, 112], [210, 112], [295, 112], [380, 112], [465, 112], [550, 112], [635, 112], [720, 112], [805, 112], [890, 112]],
      features: [[218, 112], [242, 132], [266, 104], [320, 164], [344, 146], [368, 175], [610, 105], [634, 125], [658, 97], [702, 177]],
      deployment: [[335, 104], [363, 126], [391, 104], [419, 126], [447, 104], [475, 126], [503, 104], [531, 126], [559, 104], [587, 126]],
    },
  },
  contact: {
    eyebrow: "Open to opportunities",
    titlePrefix: "Let’s build something",
    titleAccent: "intelligent.",
    introduction:
      "I’m interested in entry-level Machine Learning Engineer opportunities, meaningful technical collaborations, and projects that turn ideas into practical solutions.",
    github: "GitHub profile",
    backToTop: "Back to top",
    footer: "Built with curiosity",
  },
};

export type SkillCategory = {
  id: "programming" | "libraries" | "ml" | "nlp" | "deployment" | "databases" | "tools";
  label: string;
  items: string[];
};
export const skills: SkillCategory[] = [
  { id: "programming", label: "Programming Languages", items: ["Python", "SQL"] },
  { id: "libraries", label: "Python Libraries", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn"] },
  {
    id: "ml",
    label: "Machine Learning",
    items: [
      "Scikit-learn",
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forest",
      "Gradient Boosting",
      "K-Means Clustering",
      "Feature Engineering",
      "Model Evaluation",
      "Hyperparameter Tuning",
      "SMOTE",
    ],
  },
  {
    id: "nlp",
    label: "Deep Learning & NLP",
    items: ["TensorFlow", "Keras", "RNN", "LSTM", "Natural Language Processing (NLP)", "Sentiment Analysis", "Text Preprocessing"],
  },
  {
    id: "deployment",
    label: "Backend Development & Deployment",
    items: ["FastAPI", "Streamlit", "REST APIs", "Model Deployment", "Render Deployment"],
  },
  { id: "databases", label: "Databases", items: ["SQL", "Data Querying", "Data Cleaning"] },
  { id: "tools", label: "Developer Tools", items: ["Git", "GitHub", "Jupyter Notebook", "VS Code"] },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  summary: string;
  details: string[];
  highlights?: string[];
  technologies: string[];
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
    technologies: ["Python", "Pandas", "Scikit-learn", "FastAPI", "React"],
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
    technologies: ["Python", "Scikit-learn", "Random Forest", "Streamlit"],
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
    technologies: ["Python", "K-means", "Streamlit"],
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
    technologies: ["Python", "NLP", "TensorFlow", "Bidirectional LSTM", "Streamlit"],
    github: "https://github.com/akashbulids/mcdonalds-sentiment-analysis",
    shape: "speech",
  },
];

export const education = [
  { tag: "Diploma", title: "Electronics and Communication Engineering", place: "Government Polytechnic College, Kottur", sub: "", when: "2021 – 2023" },
  { tag: "BE", title: "Computer Science and Engineering", place: "Theni Kammavar Sangam College of Technology", sub: "", when: "2024 – 2026" },
  { tag: "Training", title: "Machine Learning & Data Science", place: "Boston Institute of Analytics", sub: "Electronic City, Bengaluru", when: "Completed October 2026" },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;
