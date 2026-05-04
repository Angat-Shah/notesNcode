export interface SemesterContent {
  notes?: string[];
  labs?: string[];
  assignments?: string[];
  code?: string[];
  resources?: string[];
  papers?: string[];
}

export interface Semester {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  previewUrl?: string;
  isComingSoon?: boolean;
  noShareableContent?: boolean;
  subjects: string[];
  content?: SemesterContent;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  githubUrl: string;
}

export interface LatestAddition {
  id: string;
  title: string;
  semester: number;
  type: string;
  date: string;
}

const BASE_GITHUB_URL = "https://github.com/Angat-Shah/notesNcode";

export const semesters: Semester[] = [
  {
    id: 1,
    title: "Semester 1",
    description: "Establishing the core mathematical and physical frameworks essential for analytical engineering.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%201`,
    subjects: ["Basics Of Electrical Engineering (BEE)", "C Programming", "Hardware", "Physics"],
    content: {
      notes: ["BEE Derivations", "Physics Derivations"],
      labs: ["Hardware Lab Records", "Physics Record Book", "C Programming Lab Records"],
      assignments: ["Physics Assignments", "C Programming Assignment"],
      code: ["C Programming Programs"],
      papers: ["Semester 1 Examination Papers"],
    },
  },
  {
    id: 2,
    title: "Semester 2",
    description: "Integration of computational logic through Python and the principles of structural design and environmental ethics.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%202`,
    subjects: ["Engineering Drafting", "Environmental Studies", "Python", "Web Designing"],
    content: {
      labs: ["Python Lab Records with Index", "Web Designing Lab Files"],
      assignments: [
        "Engineering Drafting Assignments",
        "Environmental Studies Assignments",
        "Python Assignment",
        "Web Designing Assignments",
      ],
      code: [
        "Extra Coding Questions",
        "Environmental Studies Website Code",
        "Python Codes",
        "Web Designing Project Implementations",
      ],
      resources: ["Engineering Drafting Sheets", "Web Designing Question Bank"],
      papers: ["Semester 2 Examination Papers"],
    },
  },
  {
    id: 3,
    title: "Semester 3",
    description: "Transitioning into systematic software development, focusing on robust data management and object-oriented architectures.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%203`,
    subjects: ["DBMS", "Java", "Mobile App Development", "Software Engineering", "Web Development."],
    content: {
      labs: [
        "DBMS Lab Records",
        "Java Lab Records",
        "Mobile Application Development Lab Records",
        "Web Development Lab Records",
      ],
      assignments: [
        "DBMS Assignments",
        "Java Assignments",
        "Mobile Application Development Assignments",
        "Software Engineering Assignments",
      ],
      code: ["Java Programs", "Web Development Project Implementations"],
      resources: [
        "Mobile Application Development Question Bank",
        "Software Engineering Question Bank",
        "Web Development Question Bank",
      ],
      papers: ["Semester 3 Examination Papers"],
    },
  },
  {
    id: 4,
    title: "Semester 4",
    description: "An exploration of low-level systems, algorithmic complexity, and the mathematical models of probability.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%204`,
    subjects: ["Advanced Web Dev", "DSA", "iOS Development", "Operating Systems", "Probability Models."],
    content: {
      labs: [
        "Advanced Web Development Lab Records with Index",
        "Data Structures & Algorithms Lab Records",
        "iOS Development Lab Records",
      ],
      assignments: [
        "Advanced Web Development Assignment",
        "DSA Assignments",
        "Operating Systems Assignments",
        "Probability Models Assignments",
      ],
      code: ["Extra Coding Questions", "Problem-Solving Questions"],
      resources: [
        "DSA Question Bank",
        "iOS Development Question Bank",
        "Operating Systems Question Bank",
      ],
      papers: ["Semester 4 Examination Papers"],
    },
  },
  {
    id: 5,
    title: "Semester 5",
    description: "Analyzing large-scale data communication and the intersection of Machine Learning with modern web frameworks.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%205`,
    subjects: ["Cross-Platform Mobile Dev", "DCN", "Machine Learning", ".NET Technologies."],
    content: {
      labs: [
        "Cross-Platform Mobile Development Lab Records",
        "Machine Learning Lab Records",
        ".NET Lab Records",
      ],
      assignments: [
        "Cross-Platform Mobile Development Assignments",
        "Data Communication & Networking Assignments",
        "Machine Learning Assignments & Remedial Assignments",
        ".NET Assignments",
      ],
      code: [
        "C Practice Questions & Solutions",
        "Cross-Platform Mobile Development Project",
        "Machine Learning CSV Files",
      ],
      resources: [
        "Aptitude Materials",
        "Cross-Platform Mobile Development Question Bank",
        "DCN Question Bank",
        ".NET Question Bank",
      ],
      papers: ["Semester 5 Examination Papers"],
    },
  },
  {
    id: 6,
    title: "Semester 6",
    description: "Engaging with complex systems including Compiler Design, Deep Learning, and the decentralization of Blockchain.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%206`,
    subjects: ["Blockchain", "Compiler Design", "Deep Learning", "IoT", "SPM"],
    content: {
      notes: [
        "Research Paper Collection",
        "Compiler Design Topic Paper",
        "Deep Learning Review Paper",
      ],
      labs: [
        "IoT Lab Records",
        "Software Project Management Lab Records with Index",
      ],
      assignments: [
        "Blockchain Assignments",
        "Compiler Design Assignments",
        "Software Project Management Assignments",
      ],
      resources: [
        "Blockchain Question Bank",
        "Blockchain Project Details",
        "Compiler Design Question Bank",
        "Compiler Design Project Details",
        "IoT MCQ Question Bank",
        "SPM Question Bank",
        "SPM Project Details",
      ],
      papers: ["Semester 6 Examination Papers"],
    },
  },
  {
    id: 7,
    title: "Semester 7",
    description: "A final deep-dive into emerging technologies, security protocols, and Explainable AI (XAI).",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%207`,
    subjects: ["Indian Health, Wellness & Psychology", "Quantum Computing", "Software Development Security", "XAI"],
    content: {
      notes: [
        "Software Development Security Textbook (6 Units)",
        "XAI Research Papers Collection",
        "XAI Review Paper",
        "Quantum Computing Textbook",
      ],
      labs: ["Software Development Security Lab Records with Index & Certificate"],
      assignments: [
        "Software Development Security Assignments",
        "Indian Health, Wellness & Psychology Assignment",
        "Quantum Computing Assignment",
      ],
      resources: [
        "Software Development Security Question Bank",
        "XAI Question Bank",
        "XAI Presentation Materials",
        "Quantum Computing Question Bank",
      ],
      papers: ["Semester 7 Examination Papers"],
    },
  },
  {
    id: 8,
    title: "Semester 8",
    description: "Focused entirely on industry project work — internship report, presentation, and final external viva.",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/SEMESTER%20-%208`,
    isComingSoon: false,
    noShareableContent: true,
    subjects: ["Project Work"],
  },
];

export const highlightedResources: Resource[] = [
  {
    id: "papers",
    title: "Examination Archives",
    description: "A longitudinal repository of previous year papers, preserved to provide insight into evaluation patterns and academic standards.",
    icon: "FileText",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/Past-Year-Papers`,
  },
  {
    id: "labs",
    title: "Technical Lab Manuals",
    description: "Systematic implementations of laboratory curricula, including annotated source code and technical discourse for practical defense.",
    icon: "Code",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/Lab-Files`,
  },
  {
    id: "assignments",
    title: "Assignments",
    description: "A collection of solved problem sets and theoretical submissions, structured to demonstrate rigorous problem-solving methodologies.",
    icon: "ClipboardList",
    githubUrl: `${BASE_GITHUB_URL}/tree/main/Assignments`,
  },
];

export const stats = {
  semesters: 8,
  resourceTypes: ["Notes", "Labs", "Assignments", "Papers"],
  lastUpdated: "December 2024",
};
