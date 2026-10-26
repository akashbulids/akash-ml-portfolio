// All portfolio content lives here, separate from presentation.
export const profile = {
  name: "Akash R",
  site: "Akash R — Neural Odyssey",
  headline: "Aspiring Machine Learning Engineer",
  roles: ["Machine Learning Engineer", "NLP Engineer", "AI Application Developer", "Data Science Enthusiast"],
  location: "Bengaluru, India",
  intro: "I build practical machine learning solutions from data to deployment, with hands-on project experience in predictive modeling, NLP, and model-backed applications.",
  about: [
    "I’m an aspiring Machine Learning Engineer with hands-on project experience in predictive modeling, classification, regression, and customer segmentation.",
    "My work also explores NLP and deep learning, model evaluation, and deploying practical ML applications with FastAPI and Streamlit. I completed Machine Learning and Data Science training at Boston Institute of Analytics, Bengaluru.",
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
    statement: "Building Machine Learning Solutions from Data to Deployment",
    visualCode: ["# model.py", "from sklearn import ensemble", "model.fit(X_train, y_train)", "→ ready to predict"],
    signalLabel: "Signal",
    viewProjects: "Explore Projects",
    contact: "Contact Me",
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
    liveDemo: "Live demo",
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
  id: "programming" | "libraries" | "ml" | "nlp" | "deployment" | "tools";
  label: string;
  items: string[];
};
export const skills: SkillCategory[] = [
  { id: "programming", label: "Programming Languages", items: ["Python", "SQL"] },
  { id: "libraries", label: "Data Processing", items: ["NumPy", "Pandas"] },
  {
    id: "ml",
    label: "Machine Learning",
    items: [
      "Scikit-learn",
      "Regression",
      "Classification",
      "Clustering",
      "Feature Engineering",
      "Model Evaluation",
      "Hyperparameter Tuning",
    ],
  },
  {
    id: "nlp",
    label: "Deep Learning & NLP",
    items: ["TensorFlow", "Keras", "RNN", "LSTM", "Natural Language Processing"],
  },
  {
    id: "deployment",
    label: "Deployment",
    items: ["FastAPI", "Streamlit", "REST APIs", "Render"],
  },
  { id: "tools", label: "Tools", items: ["Git", "GitHub", "Jupyter Notebook"] },
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
  liveDemo?: string;
  backend?: string;
  hasVideo?: boolean;
  visual?: "airline" | "segments" | "sentiment";
  visualAlt?: string;
  shape: "car" | "plane" | "clusters" | "speech";
};

export const projects: Project[] = [
  {
    id: "car",
    index: "01",
    title: "Used Car Price Estimation",
    kind: "Regression · Prediction app",
    summary: "Predicts used-car prices from vehicle specifications and condition through a React application connected to a FastAPI backend.",
    details: [
      "Objective: estimate used-car prices from vehicle specifications and condition.",
      "Dataset: approximately 10,000 records and 12 columns, with price_usd as the target (project README).",
      "Method: exploratory analysis and preprocessing for numerical and categorical features; multiple regression models were compared.",
      "Models evaluated: Random Forest, Decision Tree, Linear Regression, AdaBoost, and Gradient Boosting regressors (training notebook).",
      "Best model: Linear Regression; the training notebook reports test R² ≈0.8766 and mean cross-validation R² ≈0.8698.",
      "Application: React frontend integrated with a FastAPI prediction backend. Optional LLM explanations require configured credentials.",
      "Deployment: frontend and backend are hosted on Render.",
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "Linear Regression", "FastAPI", "React"],
    github: "https://github.com/akashbulids/Used-Car-Price-Estimation",
    liveDemo: "https://used-car-price-estimation.onrender.com",
    backend: "https://used-car-price-estimation-backed.onrender.com",
    hasVideo: true,
    shape: "car",
  },
  {
    id: "airline",
    index: "02",
    title: "Airline Passenger Satisfaction",
    kind: "Classification",
    summary: "Predicts whether airline passengers are satisfied or neutral/dissatisfied using passenger, flight, and service-rating data.",
    details: [
      "Objective: classify passenger satisfaction from demographic, flight, and service-rating features.",
      "Dataset: 129,880 rows in the repository's raw CSV; Kaggle is listed as the source in the project README.",
      "Method: exploratory analysis, duplicate and missing-value handling, outlier detection, categorical encoding, numerical scaling, and a preprocessing pipeline.",
      "Models evaluated in the training notebook: Logistic Regression, Decision Tree, Random Forest, Gradient Boosting, AdaBoost, and KNN.",
      "Best model: Random Forest Classifier.",
      "Evaluation: the training notebook records test accuracy ≈96.38% and mean 5-fold cross-validation accuracy ≈96.29%.",
      "Deployment: Streamlit deployment is documented in the repository, but no public demo URL is listed.",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest", "Streamlit"],
    highlights: ["Notebook test accuracy: 96.38%", "5-fold CV accuracy: 96.29%"],
    github: "https://github.com/akashbulids/Airline-passenger-satisfaction-prediction-project",
    visual: "airline",
    visualAlt: "Airline passenger satisfaction machine-learning project poster",
    shape: "plane",
  },
  {
    id: "segments",
    index: "03",
    title: "Credit Card Customer Segmentation",
    kind: "Unsupervised · K-means",
    summary: "Segments credit-card customers by spending and usage behaviour to make distinct customer patterns easier to understand.",
    details: [
      "Objective: group customers by credit-card usage and spending behaviour.",
      "Method: clean and scale data, select features, use the elbow method and silhouette score, then apply K-Means.",
      "Analysis: profile four clusters, with PCA used to visualize the segments.",
      "Evaluation: the project README reports a silhouette score of approximately 0.50 for K=4.",
      "Application: Streamlit interface for exploring customer segments.",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "K-Means", "Streamlit"],
    highlights: ["4 README-documented segments", "README-reported silhouette score: ≈0.50"],
    github: "https://github.com/akashbulids/credit-card-customer-segmentation-kmeans-ml",
    visual: "segments",
    visualAlt: "Credit card customer segmentation project poster",
    shape: "clusters",
  },
  {
    id: "sentiment",
    index: "04",
    title: "McDonald's Sentiment Analysis",
    kind: "NLP",
    summary: "Classifies McDonald’s customer reviews by sentiment using NLP preprocessing and a Bidirectional LSTM model.",
    details: [
      "Objective: analyze customer reviews and predict sentiment from text.",
      "Method: text preprocessing and NLP feature preparation followed by text classification with a Bidirectional LSTM.",
      "Technologies: TensorFlow and Streamlit are listed in the repository project files.",
      "Evaluation: the repository README has placeholder values for accuracy, precision, recall, and F1; no performance results are reported.",
      "Demo: the repository documents how to run the Streamlit app locally, but no public demo URL is listed.",
    ],
    technologies: ["Python", "NLP", "TensorFlow", "Bidirectional LSTM", "Streamlit"],
    github: "https://github.com/akashbulids/mcdonalds-sentiment-analysis",
    visual: "sentiment",
    visualAlt: "McDonald's sentiment analysis project poster",
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
