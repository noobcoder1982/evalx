// evalX Application Engine
// Student Performance Tracker & Cognitive Guidance Platform

// ==========================================
// 1. CONSTANTS & DATABASE INITIALIZATION
// ==========================================

const DEFAULT_SUBJECTS = {
  1: ["Mathematics - I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics"],
  2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics Engineering", "Programming in C"],
  3: ["Data Structures", "Discrete Mathematics", "Digital Logic Design", "OOP using Java"],
  4: ["Database Management Systems", "Computer Org & Architecture", "Design & Analysis of Algorithms", "Formal Languages & Automata"],
  5: ["Operating Systems", "Computer Networks", "Software Engineering", "Microprocessors & Microcontrollers"],
  6: ["Compiler Design", "Artificial Intelligence", "Web Technologies", "Cryptography & Security"],
  7: ["Cloud Computing", "Machine Learning", "Enterprise Systems", "Open Elective - I"],
  8: ["Major Project & Seminar", "Industrial Internship", "Professional Elective - III", "Open Elective - II"]
};

const REMEDIAL_GUIDES = {
  "Mathematics - I": {
    focus: "Differential & Integral Calculus, Matrices, Eigenvalues",
    guide: "Spend 20 mins daily on matrices operations. Review the foundation of limits and differentiation. Focus on the physical applications of double integrals.",
    resources: "Khan Academy (Linear Algebra), Professor Leonard (Calculus I & II), MIT OpenCourseWare (18.01)."
  },
  "Mathematics - II": {
    focus: "Vector Calculus, Ordinary Differential Equations, Laplace Transforms",
    guide: "Learn Laplace transforms by plotting them dynamically. Break down vector integration using line and surface integrals.",
    resources: "3Blue1Brown (Essence of Calculus), NPTEL Lectures by Prof. J. Kumar."
  },
  "Basic Electronics Engineering": {
    focus: "PN Junction Diodes, BJT Configuration, Operational Amplifiers (Op-Amps)",
    guide: "Simulate circuits using LTspice (free). Draw diode characteristics curves and practice operational amplifier calculations (gain, invert/non-invert).",
    resources: "Neso Academy (Electronics Series), All About Circuits textbook guides."
  },
  "Data Structures": {
    focus: "Pointers, LinkedList traversal, Stack/Queue implementations, Tree Traversals",
    guide: "Practice code implementations on paper before writing in IDE. Walk through tree traversals (inorder, preorder, postorder) node-by-node.",
    resources: "GeeksforGeeks (Data Structures), Abdul Bari's Algorithms & Data Structures YouTube playlist."
  },
  "Design & Analysis of Algorithms": {
    focus: "Asymptotic Notation, Divide & Conquer, Dynamic Programming, Greedy Algorithms",
    guide: "Focus on Master's Theorem for recurrence relations. Build recursion trees. Solve classic DP problems (0/1 Knapsack, LCS) step-by-step.",
    resources: "MIT 6.006 Introduction to Algorithms (YouTube), LeetCode (tags: recursion, dynamic-programming)."
  },
  "Digital Logic Design": {
    focus: "K-Map minimization, Multiplexers, Counters, Flip-Flops",
    guide: "Solve K-Maps daily. Draw state diagrams for sequential flip-flops (T, D, JK) and understand synchronous vs asynchronous clock cycles.",
    resources: "Neso Academy (Digital Electronics playlist), CircuitVerse simulator."
  },
  "Discrete Mathematics": {
    focus: "Set Theory, Graph Theory, Propositional Logic, Combinatorics",
    guide: "Understand truth tables and practice boolean logic proofs. Focus on graph properties (Eulerian paths, trees) which are critical for computer science.",
    resources: "TrevTutor (Discrete Math playlist), MIT 6.042J Mathematics for Computer Science."
  },
  "Operating Systems": {
    focus: "CPU Scheduling, Semaphores & Deadlock, Virtual Memory page replacement",
    guide: "Simulate scheduling (Round Robin, SRTF) using timeline diagrams. Study Bankers Algorithm for deadlock avoidance.",
    resources: "Galvin Textbook (Operating System Concepts), NPTEL OS Course by Prof. Santanu Chattopadhyay."
  },
  "Computer Org & Architecture": {
    focus: "Cache Mapping, Pipelining, Instruction Cycles, Memory Hierarchy",
    guide: "Practice cache hit/miss ratio calculation and pipeline speedup formulas. Visualize instruction execution inside ALU.",
    resources: "Computer System Architecture by M. Morris Mano, Neso Academy."
  },
  "Database Management Systems": {
    focus: "Normal Forms (1NF, 2NF, 3NF, BCNF), SQL Joins, Transaction ACID isolation",
    guide: "Practice normalization problems to resolve redundancy. Write nested SQL subqueries on live terminal. Memorize ACID principles.",
    resources: "W3Schools SQL, database-system-concepts (Silberschatz) book resources."
  },
  "Compiler Design": {
    focus: "LL(1) & LR(1) Parsers, Lexical Analysis, Intermediate Code Gen",
    guide: "Calculate FIRST & FOLLOW sets for grammars. Construct parsing tables. Study DFA state transitions in lexers.",
    resources: "Stanford CS143 Compilers, Gate Smashers lectures."
  }
};

const DEFAULT_GUIDE = {
  focus: "Core concepts, problem-solving methodologies, assignments",
  guide: "Analyze past exam papers. Discuss doubts with course instructor weekly. Dedicate 2 hours of self-study specifically to practice problem sets.",
  resources: "NPTEL Courses, GeeksforGeeks, textbooks recommended in your syllabus."
};

// Initial Sample Database Data
const INITIAL_STUDENTS = [
  {
    name: "Rahul Sharma",
    regNo: "230120101",
    college: "C. V. Raman Global University",
    branch: "CSE",
    group: "4",
    timeline: { tenth: true, twelfth: true, diploma: false, btech: true },
    marks: {
      tenth: { board: "CBSE", score: 91.2 },
      twelfth: { board: "CHSE Odisha", score: 84.5 },
      diploma: { stream: "", score: null, weak: "" },
      btech: [
        {
          sem: 1,
          subjects: [
            { name: "Mathematics - I", score: 72 },
            { name: "Engineering Physics", score: 80 },
            { name: "Basic Electrical Engineering", score: 68 },
            { name: "Engineering Graphics", score: 85 }
          ]
        },
        {
          sem: 2,
          subjects: [
            { name: "Mathematics - II", score: 68 },
            { name: "Engineering Chemistry", score: 74 },
            { name: "Basic Electronics Engineering", score: 44 },
            { name: "Programming in C", score: 88 }
          ]
        },
        {
          sem: 3,
          subjects: [
            { name: "Data Structures", score: 62 },
            { name: "Discrete Mathematics", score: 71 },
            { name: "Digital Logic Design", score: 80 },
            { name: "OOP using Java", score: 85 }
          ]
        },
        {
          sem: 4,
          subjects: [
            { name: "Database Management Systems", score: 75 },
            { name: "Computer Org & Architecture", score: 69 },
            { name: "Design & Analysis of Algorithms", score: 48 },
            { name: "Formal Languages & Automata", score: 65 }
          ]
        },
        {
          sem: 5,
          subjects: [
            { name: "Operating Systems", score: 78 },
            { name: "Computer Networks", score: 82 },
            { name: "Software Engineering", score: 80 },
            { name: "Microprocessors & Microcontrollers", score: 71 }
          ]
        }
      ]
    },
    cgpa: 7.23,
    weakSubjects: [
      { name: "Basic Electronics Engineering", score: 44, reason: "B.Tech Sem 2 (Score: 44/100)" },
      { name: "Design & Analysis of Algorithms", score: 48, reason: "B.Tech Sem 4 (Score: 48/100)" }
    ]
  },
  {
    name: "Ananya Misra",
    regNo: "230120105",
    college: "C. V. Raman Global University",
    branch: "CSE",
    group: "4",
    timeline: { tenth: true, twelfth: true, diploma: false, btech: true },
    marks: {
      tenth: { board: "ICSE", score: 94.6 },
      twelfth: { board: "CBSE", score: 92.4 },
      diploma: { stream: "", score: null, weak: "" },
      btech: [
        {
          sem: 1,
          subjects: [
            { name: "Mathematics - I", score: 88 },
            { name: "Engineering Physics", score: 92 },
            { name: "Basic Electrical Engineering", score: 85 },
            { name: "Engineering Graphics", score: 90 }
          ]
        },
        {
          sem: 2,
          subjects: [
            { name: "Mathematics - II", score: 90 },
            { name: "Engineering Chemistry", score: 94 },
            { name: "Basic Electronics Engineering", score: 82 },
            { name: "Programming in C", score: 96 }
          ]
        },
        {
          sem: 3,
          subjects: [
            { name: "Data Structures", score: 91 },
            { name: "Discrete Mathematics", score: 85 },
            { name: "Digital Logic Design", score: 49 },
            { name: "OOP using Java", score: 94 }
          ]
        },
        {
          sem: 4,
          subjects: [
            { name: "Database Management Systems", score: 92 },
            { name: "Computer Org & Architecture", score: 88 },
            { name: "Design & Analysis of Algorithms", score: 87 },
            { name: "Formal Languages & Automata", score: 90 }
          ]
        },
        {
          sem: 5,
          subjects: [
            { name: "Operating Systems", score: 93 },
            { name: "Computer Networks", score: 95 },
            { name: "Software Engineering", score: 92 },
            { name: "Microprocessors & Microcontrollers", score: 88 }
          ]
        }
      ]
    },
    cgpa: 8.95,
    weakSubjects: [
      { name: "Digital Logic Design", score: 49, reason: "B.Tech Sem 3 (Score: 49/100)" }
    ]
  },
  {
    name: "Siddharth Das",
    regNo: "230120110",
    college: "C. V. Raman Global University",
    branch: "CSE",
    group: "4",
    timeline: { tenth: true, twelfth: false, diploma: true, btech: true },
    marks: {
      tenth: { board: "BSE Odisha", score: 82.0 },
      twelfth: { board: "", score: null },
      diploma: { stream: "Information Technology", score: 81.5, weak: "Applied Mathematics" },
      btech: [
        {
          sem: 3, // Lateral entry starts sem 3
          subjects: [
            { name: "Data Structures", score: 55 },
            { name: "Discrete Mathematics", score: 43 },
            { name: "Digital Logic Design", score: 62 },
            { name: "OOP using Java", score: 65 }
          ]
        },
        {
          sem: 4,
          subjects: [
            { name: "Database Management Systems", score: 68 },
            { name: "Computer Org & Architecture", score: 52 },
            { name: "Design & Analysis of Algorithms", score: 46 },
            { name: "Formal Languages & Automata", score: 58 }
          ]
        },
        {
          sem: 5,
          subjects: [
            { name: "Operating Systems", score: 64 },
            { name: "Computer Networks", score: 70 },
            { name: "Software Engineering", score: 68 },
            { name: "Microprocessors & Microcontrollers", score: 55 }
          ]
        }
      ]
    },
    cgpa: 5.92,
    weakSubjects: [
      { name: "Discrete Mathematics", score: 43, reason: "B.Tech Sem 3 (Score: 43/100)" },
      { name: "Design & Analysis of Algorithms", score: 46, reason: "B.Tech Sem 4 (Score: 46/100)" },
      { name: "Applied Mathematics", score: 50, reason: "Flagged in Diploma Records" }
    ]
  }
];

const INITIAL_TEACHERS = [
  {
    name: "Dr. Priyadarshi Sen",
    email: "priyadarshi@cvrgi.edu.in",
    password: "password123",
    college: "C. V. Raman Global University",
    branch: "CSE",
    group: "4",
    status: "pending"
  },
  {
    name: "Prof. Mamata Mohanty",
    email: "mamata@cvrgi.edu.in",
    password: "password123",
    college: "C. V. Raman Global University",
    branch: "CSIT",
    group: "2",
    status: "approved"
  }
];

const INITIAL_GROUP_TARGETS = {
  "C. V. Raman Global University_CSE_4": 30,
  "C. V. Raman Global University_CSIT_2": 25
};

function initializeDatabase() {
  if (!localStorage.getItem("evalx_db_initialized")) {
    localStorage.setItem("evalx_students", JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem("evalx_teachers", JSON.stringify(INITIAL_TEACHERS));
    localStorage.setItem("evalx_group_targets", JSON.stringify(INITIAL_GROUP_TARGETS));
    localStorage.setItem("evalx_db_initialized", "true");
    console.log("evalX LocalStorage Database initialized with demo datasets.");
  }
}

// Helper to access DB
const DB = {
  getStudents: () => JSON.parse(localStorage.getItem("evalx_students") || "[]"),
  saveStudents: (data) => localStorage.setItem("evalx_students", JSON.stringify(data)),
  
  getTeachers: () => JSON.parse(localStorage.getItem("evalx_teachers") || "[]"),
  saveTeachers: (data) => localStorage.setItem("evalx_teachers", JSON.stringify(data)),
  
  getGroupTargets: () => JSON.parse(localStorage.getItem("evalx_group_targets") || "{}"),
  saveGroupTargets: (data) => localStorage.setItem("evalx_group_targets", JSON.stringify(data)),

  getApiKey: () => localStorage.getItem("evalx_api_key") || "",
  saveApiKey: (key) => localStorage.setItem("evalx_api_key", key),
  removeApiKey: () => localStorage.removeItem("evalx_api_key"),
  
  resetDatabase: () => {
    localStorage.removeItem("evalx_db_initialized");
    localStorage.removeItem("evalx_students");
    localStorage.removeItem("evalx_teachers");
    localStorage.removeItem("evalx_group_targets");
    localStorage.removeItem("evalx_api_key");
    initializeDatabase();
    window.location.reload();
  }
};

// Initialize DB on script load
initializeDatabase();

// ==========================================
// 2. STATE MANAGEMENT & SESSION CONTROL
// ==========================================

let appState = {
  currentRole: null, // "student", "teacher", "admin"
  studentSession: null, // Student object if logged in
  teacherSession: null, // Teacher object if logged in
  adminSession: false,  // True if admin logged in
  activeTab: "overview", // Student dashboard active tab
  studentFormStep: 1,
  currentStudentData: {
    name: "",
    regNo: "",
    college: "C. V. Raman Global University",
    branch: "CSE",
    group: "4",
    timeline: { tenth: true, twelfth: false, diploma: false, btech: true },
    marks: {
      tenth: { board: "", score: null },
      twelfth: { board: "", score: null },
      diploma: { stream: "", score: null, weak: "" },
      btech: []
    },
    cgpa: 0,
    weakSubjects: []
  }
};

// Load saved sessions from localStorage (simulates cookie sessions)
function restoreSession() {
  const savedStudent = sessionStorage.getItem("evalx_sess_student");
  const savedTeacher = sessionStorage.getItem("evalx_sess_teacher");
  const savedAdmin = sessionStorage.getItem("evalx_sess_admin");

  if (savedStudent) {
    appState.currentRole = "student";
    appState.studentSession = JSON.parse(savedStudent);
    navigateTo("#student-dashboard");
  } else if (savedTeacher) {
    appState.currentRole = "teacher";
    appState.teacherSession = JSON.parse(savedTeacher);
    
    // Check if status has changed in DB since login
    const freshTeacher = DB.getTeachers().find(t => t.email === appState.teacherSession.email);
    if (freshTeacher) {
      appState.teacherSession = freshTeacher;
      sessionStorage.setItem("evalx_sess_teacher", JSON.stringify(freshTeacher));
    }
    
    if (appState.teacherSession.status === "approved") {
      navigateTo("#teacher-dashboard");
    } else {
      navigateTo("#teacher-pending");
    }
  } else if (savedAdmin) {
    appState.currentRole = "admin";
    appState.adminSession = true;
    navigateTo("#admin-dashboard");
  } else {
    // Default to home page
    navigateTo(window.location.hash || "#home");
  }
  updateApiKeyUI();
}

// ==========================================
// 3. ROUTER / NAVIGATION SYSTEM
// ==========================================

function navigateTo(hash) {
  if (!hash) hash = "#home";
  
  // Close active modals
  document.querySelectorAll(".modal, .brutal-modal").forEach(m => m.classList.remove("active"));
  
  // Hide all pages
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  
  // Map hash to active page
  let targetPageId = "page-home";
  
  switch(hash) {
    case "#home":
      targetPageId = "page-home";
      break;
    case "#student-form":
      targetPageId = "page-student-form";
      resetStudentForm();
      break;
    case "#student-dashboard":
      if (!appState.studentSession) {
        window.location.hash = "#home";
        return;
      }
      targetPageId = "page-student-dashboard";
      renderStudentDashboard();
      break;
    case "#teacher-signup":
      targetPageId = "page-teacher-signup";
      break;
    case "#teacher-pending":
      if (!appState.teacherSession) {
        window.location.hash = "#home";
        return;
      }
      targetPageId = "page-teacher-pending";
      renderTeacherPending();
      break;
    case "#teacher-dashboard":
      if (!appState.teacherSession || appState.teacherSession.status !== "approved") {
        window.location.hash = "#home";
        return;
      }
      targetPageId = "page-teacher-dashboard";
      renderTeacherDashboard();
      break;
    case "#admin-login":
      targetPageId = "page-admin-login";
      break;
    case "#admin-dashboard":
      if (!appState.adminSession) {
        window.location.hash = "#admin-login";
        return;
      }
      targetPageId = "page-admin-dashboard";
      renderAdminDashboard();
      break;
    default:
      targetPageId = "page-home";
  }
  
  const targetPage = document.getElementById(targetPageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }
  
  // Synchronize hash in URL (avoid infinite loop)
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  }
  
  // Reset window scroll position
  window.scrollTo(0, 0);

  // Sync navbar highlights
  document.querySelectorAll(".pill-nav .nav-link-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === hash) {
      item.classList.add("active");
    }
  });
}

// Router listener
window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

// ==========================================
// 4. STUDENT MULTI-STEP REGISTRATION FLOW
// ==========================================

function resetStudentForm() {
  appState.studentFormStep = 1;
  appState.currentStudentData = {
    name: "",
    regNo: "",
    college: "C. V. Raman Global University",
    branch: "CSE",
    group: "4",
    timeline: { tenth: true, twelfth: false, diploma: false, btech: true },
    marks: {
      tenth: { board: "", score: null },
      twelfth: { board: "", score: null },
      diploma: { stream: "", score: null, weak: "" },
      btech: []
    },
    cgpa: 0,
    weakSubjects: []
  };

  // Reset UI inputs
  document.getElementById("student-name").value = "";
  document.getElementById("student-reg").value = "";
  document.getElementById("student-college").value = "C. V. Raman Global University";
  document.getElementById("student-branch").value = "CSE";
  document.getElementById("student-group").value = "4";
  
  document.getElementById("chk-10th").checked = true;
  document.getElementById("tc-10th").classList.add("selected");
  document.getElementById("chk-12th").checked = false;
  document.getElementById("tc-12th").classList.remove("selected");
  document.getElementById("chk-iti").checked = false;
  document.getElementById("tc-iti").classList.remove("selected");
  document.getElementById("chk-diploma").checked = false;
  document.getElementById("tc-diploma").classList.remove("selected");
  document.getElementById("chk-btech").checked = false;
  document.getElementById("tc-btech").classList.remove("selected");
  document.getElementById("section-btech-status").style.display = "none";
  
  document.getElementById("student-btech-sem").value = "6";
  document.getElementById("student-btech-completed").checked = false;
  
  document.getElementById("marks-10th-board").value = "";
  document.getElementById("marks-10th-score").value = "";
  document.getElementById("marks-12th-board").value = "";
  document.getElementById("marks-12th-score").value = "";
  document.getElementById("marks-iti-trade").value = "";
  document.getElementById("marks-iti-score").value = "";
  document.getElementById("marks-diploma-stream").value = "";
  document.getElementById("marks-diploma-score").value = "";
  document.getElementById("marks-diploma-weak").value = "";
  
  updateStepUI();
}

function updateStepUI() {
  // Hide all steps
  document.querySelectorAll(".form-step").forEach(step => step.classList.remove("active"));
  // Show active step
  document.getElementById(`student-step-${appState.studentFormStep}`).classList.add("active");

  // Update step progress bars
  document.querySelectorAll(".step-bar").forEach(bar => {
    const stepNum = parseInt(bar.getAttribute("data-step"));
    bar.classList.remove("active", "completed");
    
    if (stepNum === appState.studentFormStep) {
      bar.classList.add("active");
    } else if (stepNum < appState.studentFormStep) {
      bar.classList.add("completed");
    }
  });

  // Update step count text helper
  const stepCountText = document.getElementById("step-count-text");
  if (stepCountText) {
    const stepLabels = {
      1: "STEP 1 OF 4: BASIC DETAILS",
      2: "STEP 2 OF 4: EDUCATION TIMELINE",
      3: "STEP 3 OF 4: MARKS DOCUMENTATION",
      4: "STEP 4 OF 4: SEMESTER GRADES"
    };
    stepCountText.textContent = stepLabels[appState.studentFormStep] || `STEP ${appState.studentFormStep} OF 4`;
  }

  // Handle dynamic descriptions on timeline change
  if (appState.studentFormStep === 2) {
    const hasBtech = document.getElementById("chk-btech").checked;
    document.getElementById("section-btech-status").style.display = hasBtech ? "block" : "none";
    if (hasBtech) {
      calculateBtechSemFillingBoundaries();
    }
  }

  // Handle dynamic form sections rendering in Step 3
  if (appState.studentFormStep === 3) {
    const has10th = document.getElementById("chk-10th").checked;
    const has12th = document.getElementById("chk-12th").checked;
    const hasIti = document.getElementById("chk-iti").checked;
    const hasDiploma = document.getElementById("chk-diploma").checked;
    
    document.getElementById("section-10th-marks").style.display = has10th ? "block" : "none";
    document.getElementById("section-12th-marks").style.display = has12th ? "block" : "none";
    document.getElementById("section-iti-marks").style.display = hasIti ? "block" : "none";
    document.getElementById("section-diploma-marks").style.display = hasDiploma ? "block" : "none";
  }

  // Handle building semester fields in Step 4
  if (appState.studentFormStep === 4) {
    generateBtechSemesterForms();
  }
}

function calculateBtechSemFillingBoundaries() {
  const currentSem = parseInt(document.getElementById("student-btech-sem").value);
  const isCompleted = document.getElementById("student-btech-completed").checked;
  const noticeEl = document.getElementById("sem-filling-notice");
  
  let targetSemMax = isCompleted ? currentSem : currentSem - 1;
  
  if (targetSemMax < 1) {
    noticeEl.innerHTML = `⚠️ <b>Notice:</b> You are in Semester 1 (incomplete). No prior engineering semesters to log. You will jump directly to submission.`;
  } else {
    noticeEl.innerHTML = `🎓 <b>Requirement:</b> Since you are in Semester ${currentSem} (${isCompleted ? 'completed' : 'incomplete'}), you will fill in subjects and marks up to <b>Semester ${targetSemMax}</b>.`;
  }
  
  return targetSemMax;
}

const BRANCH_SUBJECTS = {
  CSE: DEFAULT_SUBJECTS,
  CSIT: {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Programming in C"],
    3: ["Data Structures", "Object Oriented Programming", "Digital Logic", "Discrete Math"],
    4: ["DBMS", "Computer Architecture", "Design & Algorithms", "Information Theory"],
    5: ["Operating Systems", "Computer Networks", "Software Engineering", "Web Technology"],
    6: ["Compiler Design", "Cloud Computing", "Cryptography", "Distributed Systems"]
  },
  AIML: {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Python for AI"],
    3: ["Data Structures & Alg", "Discrete Mathematics", "Probability & Statistics", "Introduction to AI"],
    4: ["DBMS", "Linear Algebra", "Machine Learning Basics", "AI Search Algorithms"],
    5: ["Operating Systems", "Neural Networks", "Design & Analysis of Algorithms", "Computer Vision"],
    6: ["Natural Language Processing", "Reinforcement Learning", "Deep Learning", "AI Ethics"]
  },
  "AI&DS": {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Programming in Python"],
    3: ["Data Structures & Alg", "Probability & Statistics", "Data Science Foundations", "Digital Logic"],
    4: ["DBMS", "Linear Algebra", "Machine Learning Basics", "Data Warehousing & Mining"],
    5: ["Operating Systems", "Computer Networks", "Big Data Analytics", "Deep Learning Techniques"],
    6: ["Statistical Modelling", "Data Visualization", "AI Applications", "Security in Data Science"]
  },
  SE: {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Programming in C"],
    3: ["Data Structures", "Discrete Math", "Software Requirements", "OOP using Java"],
    4: ["DBMS", "Software Architecture", "Design & Algorithms", "Software Testing"],
    5: ["Operating Systems", "Computer Networks", "Software Project Management", "Agile Methodologies"],
    6: ["Web Application Engineering", "Design Patterns", "System Security", "DevOps Engineering"]
  },
  DS: {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Python Programming"],
    3: ["Data Structures", "Statistics & Probability", "Data Warehousing", "R Programming"],
    4: ["DBMS", "Applied Linear Algebra", "Data Mining", "Machine Learning"],
    5: ["Operating Systems", "Big Data Architecture", "Regression Analysis", "Optimization Techniques"],
    6: ["Business Analytics", "Time Series Analysis", "Deep Learning", "Data Visualization"]
  },
  WD: {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Web Fundamentals (HTML/CSS)"],
    3: ["Data Structures", "JavaScript & DOM Programming", "UI/UX Design Concepts", "Database Systems"],
    4: ["Web Frameworks (React/Vue)", "Backend Dev (Node/Express)", "Design & Algorithms", "NoSQL Databases"],
    5: ["Operating Systems", "Computer Networks", "Web Security & Authentication", "API Design & Microservices"],
    6: ["Mobile Web Development", "Cloud Architecture & Hosting", "Performance Optimization", "Full Stack Project"]
  },
  CE: {
    1: ["Mathematics - I", "Engineering Physics", "Basic Electrical", "Engineering Graphics"],
    2: ["Mathematics - II", "Engineering Chemistry", "Basic Electronics", "Mechanics of Solids"],
    3: ["Fluid Mechanics", "Surveying - I", "Building Materials", "Engineering Geology"],
    4: ["Structural Analysis - I", "Surveying - II", "Concrete Technology", "Water Resource Engineering"],
    5: ["Design of Steel Structures", "Geotechnical Engineering - I", "Environmental Engineering - I", "Transportation Engineering - I"],
    6: ["Design of Concrete Structures", "Geotechnical Engineering - II", "Environmental Engineering - II", "Transportation Engineering - II"]
  }
};

function generateBtechSemesterForms() {
  const container = document.getElementById("btech-semesters-list");
  const tabContainer = document.getElementById("btech-sem-tab-bar");
  
  container.innerHTML = "";
  tabContainer.innerHTML = "";

  const hasBtech = document.getElementById("chk-btech").checked;
  if (!hasBtech) {
    container.innerHTML = `
      <div class="glass-card text-center" style="padding: 2.5rem; text-align:center;">
        <span style="font-size:2rem;">📝</span>
        <p class="mt-2" style="font-weight:700;">B.Tech was not checked in your timeline. No semesters to configure.</p>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">Click "Complete Setup" below to save your profile.</p>
      </div>
    `;
    return;
  }

  const currentSem = parseInt(document.getElementById("student-btech-sem").value);
  const isCompleted = document.getElementById("student-btech-completed").checked;
  const targetSemMax = isCompleted ? currentSem : currentSem - 1;
  const hasDiploma = document.getElementById("chk-diploma").checked;
  const hasIti = document.getElementById("chk-iti").checked;
  const branch = document.getElementById("student-branch").value;
  
  const branchData = BRANCH_SUBJECTS[branch] || BRANCH_SUBJECTS["CSE"];
  let startSem = (hasDiploma || hasIti) ? 3 : 1;

  if (targetSemMax < startSem) {
    container.innerHTML = `
      <div class="glass-card text-center" style="padding: 2.5rem; text-align:center;">
        <span style="font-size:2rem;">⚡</span>
        <p class="mt-2" style="font-weight:700;">No preceding semesters need logging. Click below to submit and open your dashboard.</p>
      </div>
    `;
    return;
  }

  // Create Tabs and Panels
  for (let sem = startSem; sem <= targetSemMax; sem++) {
    // 1. Create Tab Button
    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.className = "sem-tab-btn";
    tabBtn.id = `sem-tab-btn-${sem}`;
    tabBtn.textContent = `Sem ${sem}`;
    tabBtn.addEventListener("click", () => {
      switchFormSemesterTab(sem);
    });
    tabContainer.appendChild(tabBtn);

    // 2. Create Content Panel
    const semPanel = document.createElement("div");
    semPanel.className = "sem-block-panel";
    semPanel.id = `sem-block-${sem}`;
    
    const defaultSems = branchData[sem] || [];
    
    semPanel.innerHTML = `
      <div class="flex-between mb-4" style="margin-bottom:1.5rem;">
        <h3 style="font-size:1.2rem; text-transform:none;">Semester ${sem} Grades</h3>
        <button type="button" class="brutal-btn btn-add-subject" data-sem="${sem}" style="padding:0.4rem 0.9rem; font-size:0.75rem; background:#fff;">+ Add Elective</button>
      </div>
      <div class="subjects-grid" id="subjects-grid-${sem}">
        <!-- Dynamic subject rows go here -->
      </div>
    `;
    
    container.appendChild(semPanel);
    
    // Add default rows
    const grid = semPanel.querySelector(`#subjects-grid-${sem}`);
    defaultSems.forEach(subName => {
      addSubjectRowToGrid(grid, sem, subName, "", true);
    });
    
    // If no default subjects, create at least one empty
    if (defaultSems.length === 0) {
      addSubjectRowToGrid(grid, sem, "", "", false);
    }
  }

  // Switch to first tab
  switchFormSemesterTab(startSem);
}

function switchFormSemesterTab(sem) {
  // Hide all panels
  document.querySelectorAll(".sem-block-panel").forEach(p => p.classList.remove("active"));
  // Deactivate all buttons
  document.querySelectorAll(".sem-tab-btn").forEach(b => b.classList.remove("active"));

  // Show active
  const targetPanel = document.getElementById(`sem-block-${sem}`);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }

  const targetBtn = document.getElementById(`sem-tab-btn-${sem}`);
  if (targetBtn) {
    targetBtn.classList.add("active");
  }
}

function addSubjectRowToGrid(grid, sem, name = "", score = "", isDefault = false) {
  const row = document.createElement("div");
  row.className = "subject-row";
  
  if (isDefault) {
    row.innerHTML = `
      <div>
        <span class="subject-row-label">${name}</span>
        <input type="hidden" class="input-subject-name" value="${name}">
      </div>
      <div>
        <input type="number" class="brutal-input input-subject-score" placeholder="Score" min="0" max="100" value="${score}" required style="text-align:center;">
      </div>
      <div>
        <span style="font-size:1.1rem; color:var(--text-muted); cursor:not-allowed;" title="Core subject cannot be deleted">🔒</span>
      </div>
    `;
  } else {
    row.innerHTML = `
      <div>
        <input type="text" class="brutal-input input-subject-name" placeholder="Elective Course Name" value="${name}" required>
      </div>
      <div>
        <input type="number" class="brutal-input input-subject-score" placeholder="Score" min="0" max="100" value="${score}" required style="text-align:center;">
      </div>
      <div>
        <button type="button" class="btn-remove-subject" title="Delete Elective">&times;</button>
      </div>
    `;
    
    row.querySelector(".btn-remove-subject").addEventListener("click", () => {
      row.remove();
    });
  }
  
  grid.appendChild(row);
}

// Add Custom Subject Button click delegator
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("btn-add-subject")) {
    const sem = e.target.getAttribute("data-sem");
    const grid = document.getElementById(`subjects-grid-${sem}`);
    if (grid) {
      addSubjectRowToGrid(grid, sem, "", "", false);
    }
  }
});

// Autofill Demo Data helper
document.getElementById("btn-quick-fill").addEventListener("click", () => {
  const hasDiploma = document.getElementById("chk-diploma").checked;
  const currentSem = parseInt(document.getElementById("student-btech-sem").value);
  const isCompleted = document.getElementById("student-btech-completed").checked;
  const targetSemMax = isCompleted ? currentSem : currentSem - 1;
  const startSem = hasDiploma ? 3 : 1;
  const branch = document.getElementById("student-branch").value;
  const branchData = BRANCH_SUBJECTS[branch] || BRANCH_SUBJECTS["CSE"];

  for (let sem = startSem; sem <= targetSemMax; sem++) {
    const grid = document.getElementById(`subjects-grid-${sem}`);
    if (!grid) continue;
    
    grid.innerHTML = ""; // Clear existing
    
    const defaults = branchData[sem] || [];
    defaults.forEach((subName) => {
      let score = 72 + Math.floor(Math.random() * 20); // 72 to 92
      
      // Force low marks on particular classes to demonstrate weaknesses
      if (subName === "Basic Electronics Engineering" || subName === "Basic Electronics") {
        score = 42;
      } else if (subName === "Design & Analysis of Algorithms" || subName === "Design & Algorithms") {
        score = 46;
      } else if (subName === "Mathematics - I" && Math.random() > 0.5) {
        score = 44;
      }
      
      addSubjectRowToGrid(grid, sem, subName, score, true);
    });
  }
});

function validateStudentStep(step) {
  if (step === 1) {
    const name = document.getElementById("student-name").value.trim();
    const reg = document.getElementById("student-reg").value.trim();
    if (!name || !reg) {
      showBrutalAlert("Please fill in your Name and Registration Number.");
      return false;
    }
    appState.currentStudentData.name = name;
    appState.currentStudentData.regNo = reg;
    appState.currentStudentData.college = document.getElementById("student-college").value;
    appState.currentStudentData.branch = document.getElementById("student-branch").value;
    appState.currentStudentData.group = document.getElementById("student-group").value;
    return true;
  }
  
  if (step === 2) {
    appState.currentStudentData.timeline.tenth = document.getElementById("chk-10th").checked;
    appState.currentStudentData.timeline.twelfth = document.getElementById("chk-12th").checked;
    appState.currentStudentData.timeline.iti = document.getElementById("chk-iti").checked;
    appState.currentStudentData.timeline.diploma = document.getElementById("chk-diploma").checked;
    appState.currentStudentData.timeline.btech = document.getElementById("chk-btech").checked;
    return true;
  }
  
  if (step === 3) {
    if (appState.currentStudentData.timeline.tenth) {
      const score10 = parseFloat(document.getElementById("marks-10th-score").value);
      if (isNaN(score10) || score10 < 0 || score10 > 100) {
        showBrutalAlert("Please enter a valid 10th Score between 0 and 100.");
        return false;
      }
      appState.currentStudentData.marks.tenth = {
        board: document.getElementById("marks-10th-board").value.trim(),
        score: score10
      };
    } else {
      appState.currentStudentData.marks.tenth = null;
    }

    if (appState.currentStudentData.timeline.twelfth) {
      const score12 = parseFloat(document.getElementById("marks-12th-score").value);
      if (isNaN(score12) || score12 < 0 || score12 > 100) {
        showBrutalAlert("Please enter a valid 12th Score between 0 and 100.");
        return false;
      }
      appState.currentStudentData.marks.twelfth = {
        board: document.getElementById("marks-12th-board").value.trim(),
        score: score12
      };
    } else {
      appState.currentStudentData.marks.twelfth = null;
    }

    if (appState.currentStudentData.timeline.iti) {
      const scoreIti = parseFloat(document.getElementById("marks-iti-score").value);
      if (isNaN(scoreIti) || scoreIti < 0 || scoreIti > 100) {
        showBrutalAlert("Please enter a valid ITI Score between 0 and 100.");
        return false;
      }
      appState.currentStudentData.marks.iti = {
        trade: document.getElementById("marks-iti-trade").value.trim(),
        score: scoreIti
      };
    } else {
      appState.currentStudentData.marks.iti = null;
    }

    if (appState.currentStudentData.timeline.diploma) {
      const scoreDip = parseFloat(document.getElementById("marks-diploma-score").value);
      if (isNaN(scoreDip) || scoreDip < 0 || scoreDip > 100) {
        showBrutalAlert("Please enter a valid Diploma Score between 0 and 100.");
        return false;
      }
      appState.currentStudentData.marks.diploma = {
        stream: document.getElementById("marks-diploma-stream").value.trim(),
        score: scoreDip,
        weak: document.getElementById("marks-diploma-weak").value.trim()
      };
    } else {
      appState.currentStudentData.marks.diploma = null;
    }
    return true;
  }
  return true;
}

// Step navigation click triggers
document.querySelectorAll(".btn-student-next").forEach(btn => {
  btn.addEventListener("click", () => {
    const nextStep = parseInt(btn.getAttribute("data-next"));
    if (validateStudentStep(appState.studentFormStep)) {
      appState.studentFormStep = nextStep;
      updateStepUI();
    }
  });
});

document.querySelectorAll(".btn-student-prev").forEach(btn => {
  btn.addEventListener("click", () => {
    appState.studentFormStep = parseInt(btn.getAttribute("data-prev"));
    updateStepUI();
  });
});

document.querySelectorAll(".btn-student-cancel").forEach(btn => {
  btn.addEventListener("click", () => {
    showBrutalConfirm("Cancel registration? Inputted data will be lost.", () => {
      navigateTo("#home");
    });
  });
});

// Clickable horizontal step progress bars
document.querySelectorAll(".step-bar").forEach(bar => {
  bar.style.cursor = "pointer";
  bar.addEventListener("click", () => {
    const targetStep = parseInt(bar.getAttribute("data-step"));
    if (targetStep < appState.studentFormStep) {
      appState.studentFormStep = targetStep;
      updateStepUI();
    } else if (targetStep > appState.studentFormStep) {
      let valid = true;
      for (let s = appState.studentFormStep; s < targetStep; s++) {
        if (!validateStudentStep(s)) {
          valid = false;
          break;
        }
      }
      if (valid) {
        appState.studentFormStep = targetStep;
        updateStepUI();
      }
    }
  });
});

// Handle Student submission and analysis compilation
document.getElementById("btn-student-submit").addEventListener("click", () => {
  const btechMarks = [];
  const hasBtech = appState.currentStudentData.timeline.btech;
  const hasDiploma = appState.currentStudentData.timeline.diploma;
  const hasIti = appState.currentStudentData.timeline.iti;
  const currentSem = parseInt(document.getElementById("student-btech-sem").value);
  const isCompleted = document.getElementById("student-btech-completed").checked;
  const targetSemMax = isCompleted ? currentSem : currentSem - 1;
  const startSem = (hasDiploma || hasIti) ? 3 : 1;

  let errorFound = false;

  if (hasBtech) {
    let firstErrSem = null;
    let firstErrInp = null;

    for (let sem = startSem; sem <= targetSemMax; sem++) {
      const grid = document.getElementById(`subjects-grid-${sem}`);
      if (!grid) continue;

      const rows = grid.querySelectorAll(".subject-row");
      if (rows.length === 0) {
        showBrutalAlert(`Please add at least one course for Semester ${sem}.`);
        switchFormSemesterTab(sem);
        errorFound = true;
        break;
      }

      const subjects = [];
      rows.forEach(row => {
        const nameInp = row.querySelector(".input-subject-name");
        const scoreInp = row.querySelector(".input-subject-score");
        
        const subName = nameInp.value.trim();
        const subScore = parseFloat(scoreInp.value);

        if (!subName || isNaN(subScore) || subScore < 0 || subScore > 100) {
          nameInp.style.borderColor = "var(--color-danger)";
          scoreInp.style.borderColor = "var(--color-danger)";
          if (!errorFound) {
            errorFound = true;
            firstErrSem = sem;
            firstErrInp = scoreInp;
          }
        } else {
          nameInp.style.borderColor = "var(--border-brutal)";
          scoreInp.style.borderColor = "var(--border-brutal)";
          subjects.push({ name: subName, score: subScore });
        }
      });

      if (errorFound) {
        break;
      }

      btechMarks.push({ sem: sem, subjects: subjects });
    }

    if (errorFound) {
      if (firstErrSem) {
        switchFormSemesterTab(firstErrSem);
      }
      if (firstErrInp) {
        firstErrInp.focus();
      }
      showBrutalAlert("Please fill all scores with a valid mark between 0 and 100.");
      return;
    }
  }

  appState.currentStudentData.marks.btech = btechMarks;

  // Run Local Scholastic analysis (Identify weak subjects, calculate GPA)
  compileStudentAnalytics(appState.currentStudentData);

  // Save to Database
  const students = DB.getStudents();
  // Check if student regNo already exists, if so overwrite, else push
  const existIndex = students.findIndex(s => s.regNo === appState.currentStudentData.regNo);
  if (existIndex > -1) {
    students[existIndex] = appState.currentStudentData;
  } else {
    students.push(appState.currentStudentData);
  }
  DB.saveStudents(students);

  // Establish session
  appState.studentSession = appState.currentStudentData;
  sessionStorage.setItem("evalx_sess_student", JSON.stringify(appState.currentStudentData));
  appState.currentRole = "student";

  // Transition to dashboard
  navigateTo("#student-dashboard");
});

// Compile analytics local processor
function compileStudentAnalytics(student) {
  let totalScoreSum = 0;
  let totalSubjectsCount = 0;
  const weakSubjects = [];

  // 1. Scan Diploma/ITI records for indicated weak subject
  if (student.timeline.diploma && student.marks.diploma.weak) {
    const rawWeaks = student.marks.diploma.weak.split(",");
    rawWeaks.forEach(w => {
      const trimmed = w.trim();
      if (trimmed) {
        weakSubjects.push({
          name: trimmed,
          score: 50, // default placeholder
          reason: "Flagged in Diploma Records"
        });
      }
    });
  }

  // 2. Scan B.Tech semester marks
  student.marks.btech.forEach(semBlock => {
    let semSum = 0;
    semBlock.subjects.forEach(sub => {
      totalScoreSum += sub.score;
      totalSubjectsCount++;
      semSum += sub.score;

      // Flag if score is below threshold of 50%
      if (sub.score < 50) {
        weakSubjects.push({
          name: sub.name,
          score: sub.score,
          reason: `B.Tech Sem ${semBlock.sem} (Score: ${sub.score}/100)`
        });
      }
    });
  });

  // Calculate CGPA (10-point scale conversion)
  // Mapping percentage average straight: average percentage / 10 = CGPA
  let cgpaValue = 0;
  if (totalSubjectsCount > 0) {
    const avgPercentage = totalScoreSum / totalSubjectsCount;
    cgpaValue = avgPercentage / 10;
    // Format to 2 decimals
    cgpaValue = Math.round(cgpaValue * 100) / 100;
  } else {
    // If no BTech semesters recorded yet, inherit from diploma or 10th/12th average
    let sum = student.marks.tenth.score;
    let counts = 1;
    if (student.timeline.twelfth) { sum += student.marks.twelfth.score; counts++; }
    if (student.timeline.diploma) { sum += student.marks.diploma.score; counts++; }
    cgpaValue = (sum / counts) / 10;
    cgpaValue = Math.round(cgpaValue * 100) / 100;
  }

  student.cgpa = cgpaValue;
  student.weakSubjects = weakSubjects;
}

// Interactive Timeline selection cards logic
document.getElementById("tc-12th").addEventListener("click", (e) => {
  const checkbox = document.getElementById("chk-12th");
  checkbox.checked = !checkbox.checked;
  document.getElementById("tc-12th").classList.toggle("selected", checkbox.checked);
});
document.getElementById("tc-diploma").addEventListener("click", (e) => {
  const checkbox = document.getElementById("chk-diploma");
  checkbox.checked = !checkbox.checked;
  document.getElementById("tc-diploma").classList.toggle("selected", checkbox.checked);
});

// Update label notices dynamically in Step 2 when fields change
document.getElementById("student-btech-sem").addEventListener("change", calculateBtechSemFillingBoundaries);
document.getElementById("student-btech-completed").addEventListener("change", calculateBtechSemFillingBoundaries);

// ==========================================
// 5. STUDENT DASHBOARD RENDERING
// ==========================================

function renderStudentDashboard() {
  const student = appState.studentSession;
  if (!student) return;

  // Header & Info
  document.getElementById("dash-student-name").textContent = student.name;
  document.getElementById("dash-student-reg").textContent = `REG: ${student.regNo}`;
  document.getElementById("dash-student-badge").textContent = `${student.branch} - Group ${student.group}`;
  document.getElementById("dash-cgpa").textContent = student.cgpa.toFixed(2);
  document.getElementById("dash-college-name").textContent = student.college;
  
  // Count evaluated subjects
  let totalSub = 0;
  student.marks.btech.forEach(s => totalSub += s.subjects.length);
  document.getElementById("dash-total-subjects").textContent = totalSub;

  // Draw weak subjects quick overview cards
  const weakContainer = document.getElementById("dash-weak-subjects-container");
  weakContainer.innerHTML = "";
  
  const focusBanner = document.getElementById("dashboard-weakness-banner");

  if (student.weakSubjects.length === 0) {
    focusBanner.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)";
    focusBanner.style.borderColor = "rgba(16, 185, 129, 0.25)";
    focusBanner.querySelector(".weakness-title").textContent = "Excellent Academic Standing!";
    focusBanner.querySelector(".weakness-title").style.color = "var(--color-success)";
    document.getElementById("weakness-summary-text").textContent = "All core subjects average above safety threshold. No immediate structural deficiencies found.";
    
    weakContainer.innerHTML = `
      <div class="glass-card text-center" style="grid-column: 1 / -1; padding: 1.5rem;">
        <span style="font-size: 2rem;">🏆</span>
        <p class="mt-2" style="font-size: 0.95rem; font-weight:600;">Keep up the exceptional work!</p>
      </div>
    `;
  } else {
    focusBanner.style.background = "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.05) 100%)";
    focusBanner.style.borderColor = "rgba(245, 158, 11, 0.2)";
    focusBanner.querySelector(".weakness-title").textContent = "Focus Target Fields (Weak Subjects Identified)";
    focusBanner.querySelector(".weakness-title").style.color = "var(--color-warning)";
    document.getElementById("weakness-summary-text").textContent = "Specific subject fields have been identified below the safety index threshold of 50%. Focus on these domains.";

    student.weakSubjects.forEach(weak => {
      const card = document.createElement("div");
      card.className = "weak-subject-card";
      
      const guideObj = REMEDIAL_GUIDES[weak.name] || DEFAULT_GUIDE;

      card.innerHTML = `
        <div class="weak-subject-name">${weak.name}</div>
        <div class="weak-subject-score">${weak.reason}</div>
        <div class="weak-subject-guide"><b>Remedial Target:</b> ${guideObj.focus}</div>
      `;
      weakContainer.appendChild(card);
    });
  }

  // Draw full focus list in Focus Areas Tab
  const fullWeakList = document.getElementById("full-weak-list");
  fullWeakList.innerHTML = "";

  if (student.weakSubjects.length === 0) {
    fullWeakList.innerHTML = `
      <div class="glass-card text-center" style="padding: 3rem 1rem;">
        <h3>Zero Course Deficiencies Found</h3>
        <p class="text-secondary mt-2">All registered subjects meet or exceed the performance targets.</p>
      </div>
    `;
  } else {
    student.weakSubjects.forEach(weak => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.borderLeft = "4px solid var(--color-warning)";
      
      const guideObj = REMEDIAL_GUIDES[weak.name] || DEFAULT_GUIDE;

      card.innerHTML = `
        <div class="flex-between mb-2">
          <h4>${weak.name}</h4>
          <span class="badge badge-warning">${weak.reason}</span>
        </div>
        <div class="mb-3">
          <p style="font-size:0.9rem; font-weight:600; color:var(--text-secondary);">Structural Focus Area:</p>
          <p style="font-size:0.95rem; color:#fff;" class="mt-1">${guideObj.focus}</p>
        </div>
        <div class="mb-3">
          <p style="font-size:0.9rem; font-weight:600; color:var(--text-secondary);">Remedial Study Methodology:</p>
          <p style="font-size:0.95rem; color:var(--text-primary);" class="mt-1">${guideObj.guide}</p>
        </div>
        <div>
          <p style="font-size:0.9rem; font-weight:600; color:var(--text-secondary);">Suggested Study Resources:</p>
          <p style="font-size:0.9rem; color:var(--color-secondary);" class="mt-1">📚 ${guideObj.resources}</p>
        </div>
      `;
      fullWeakList.appendChild(card);
    });
  }

  // Draw Charts
  drawSgpaTrendChart(student);

  // Setup AI Prompt Guidance default state
  document.getElementById("ai-prompt-box").style.display = "block";
  document.getElementById("ai-result-content").style.display = "none";
  document.getElementById("ai-loading").style.display = "none";

  // Tab switching inside Student Dashboard
  document.querySelectorAll("#page-student-dashboard .nav-item").forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.id === "btn-student-logout") return;
      
      // Update Navigation active state
      document.querySelectorAll("#page-student-dashboard .nav-item").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // Toggle tabs content
      const tabTarget = tab.getAttribute("data-tab");
      document.querySelectorAll("#page-student-dashboard .tab-content").forEach(tc => tc.classList.remove("active"));
      document.getElementById(`student-tab-${tabTarget}`).classList.add("active");
    });
  });
}

function drawSgpaTrendChart(student) {
  const container = document.getElementById("sgpa-chart-placeholder");
  const svg = document.getElementById("sgpa-trend-svg");
  const gridGroup = document.getElementById("chart-grid");
  const linePath = document.getElementById("chart-line-path");
  const areaPath = document.getElementById("chart-area-path");
  const dotsGroup = document.getElementById("chart-dots");
  const labelsGroup = document.getElementById("chart-labels");

  // Reset SVG elements
  gridGroup.innerHTML = "";
  dotsGroup.innerHTML = "";
  labelsGroup.innerHTML = "";
  linePath.setAttribute("d", "");
  areaPath.setAttribute("d", "");

  const btechBlocks = student.marks.btech;
  
  if (btechBlocks.length < 2) {
    // Hide SVG, show placeholder
    svg.style.display = "none";
    container.style.display = "flex";
    return;
  }

  svg.style.display = "block";
  container.style.display = "none";

  // Sort semesters in ascending order
  const semsSorted = [...btechBlocks].sort((a, b) => a.sem - b.sem);

  // Calculate SGPA for each semester
  const dataset = semsSorted.map(block => {
    let sum = 0;
    block.subjects.forEach(s => sum += s.score);
    const sgpa = (sum / block.subjects.length) / 10;
    return {
      label: `Sem ${block.sem}`,
      val: Math.round(sgpa * 100) / 100
    };
  });

  const width = svg.clientWidth || 700;
  const height = 220;
  const paddingX = 50;
  const paddingY = 30;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  // Draw Grid Lines (Y axis from GPA 0 to 10)
  // We draw lines at 2, 4, 6, 8, 10
  const yLines = [2, 4, 6, 8, 10];
  yLines.forEach(yVal => {
    const yRatio = yVal / 10;
    const yCoord = height - paddingY - (yRatio * chartH);

    // Draw line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", paddingX);
    line.setAttribute("y1", yCoord);
    line.setAttribute("x2", width - paddingX);
    line.setAttribute("y2", yCoord);
    line.setAttribute("class", "chart-grid-line");
    gridGroup.appendChild(line);

    // Draw Text values
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", paddingX - 12);
    text.setAttribute("y", yCoord + 4);
    text.setAttribute("text-anchor", "end");
    text.setAttribute("class", "chart-axis-text");
    text.textContent = yVal.toFixed(1);
    gridGroup.appendChild(text);
  });

  // Calculate point coordinates
  const points = dataset.map((d, index) => {
    const xRatio = index / (dataset.length - 1);
    const xCoord = paddingX + (xRatio * chartW);
    
    const yRatio = d.val / 10;
    const yCoord = height - paddingY - (yRatio * chartH);

    return { x: xCoord, y: yCoord, raw: d };
  });

  // Construct Line Path string (Bezier curves if possible, otherwise straight segments)
  let pathD = `M ${points[0].x} ${points[0].y}`;
  let areaD = `M ${points[0].x} ${height - paddingY} L ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    // Using simple cubic bezier approximation for smooth curve
    const prev = points[i - 1];
    const curr = points[i];
    const cp1x = prev.x + (curr.x - prev.x) / 3;
    const cp2x = prev.x + 2 * (curr.x - prev.x) / 3;
    
    pathD += ` C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
    areaD += ` C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  areaD += ` L ${points[points.length - 1].x} ${height - paddingY} Z`;

  linePath.setAttribute("d", pathD);
  areaPath.setAttribute("d", areaD);

  // Draw Dots & Labels
  points.forEach(pt => {
    // Circle node
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", pt.x);
    circle.setAttribute("cy", pt.y);
    circle.setAttribute("class", "chart-dot");
    
    // Add simple tooltip alert
    circle.addEventListener("click", () => {
      showBrutalAlert(`${pt.raw.label} SGPA: ${pt.raw.val}`);
    });
    dotsGroup.appendChild(circle);

    // Label under axis
    const textLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textLabel.setAttribute("x", pt.x);
    textLabel.setAttribute("y", height - 10);
    textLabel.setAttribute("text-anchor", "middle");
    textLabel.setAttribute("class", "chart-axis-text");
    textLabel.textContent = pt.raw.label;
    labelsGroup.appendChild(textLabel);

    // SGPA value above dot
    const textVal = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textVal.setAttribute("x", pt.x);
    textVal.setAttribute("y", pt.y - 12);
    textVal.setAttribute("text-anchor", "middle");
    textVal.setAttribute("fill", "#fff");
    textVal.setAttribute("font-size", "0.75rem");
    textVal.setAttribute("font-weight", "600");
    textVal.textContent = pt.raw.val.toFixed(2);
    labelsGroup.appendChild(textVal);
  });
}

// Log out Student
document.getElementById("btn-student-logout").addEventListener("click", () => {
  showBrutalConfirm("Sign out of student dashboard?", () => {
    sessionStorage.removeItem("evalx_sess_student");
    appState.studentSession = null;
    appState.currentRole = null;
    navigateTo("#home");
  });
});

// ==========================================
// 6. TEACHER SIGNUP & DASHBOARD FLOW
// ==========================================

document.getElementById("form-teacher-signup").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("teacher-name").value.trim();
  const email = document.getElementById("teacher-email").value.trim();
  const password = document.getElementById("teacher-password").value;
  const college = document.getElementById("teacher-college").value;
  const branch = document.getElementById("teacher-branch").value;
  const group = document.getElementById("teacher-group").value;

  const teachers = DB.getTeachers();
  
  // Verify if request is already registered
  const exists = teachers.some(t => t.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    showBrutalAlert("This email is already registered in the faculty system.");
    return;
  }

  const newTeacher = {
    name: name,
    email: email,
    password: password,
    college: college,
    branch: branch,
    group: group,
    status: "pending" // Admin must authorize
  };

  teachers.push(newTeacher);
  DB.saveTeachers(teachers);

  // Set session and display pending page
  appState.teacherSession = newTeacher;
  sessionStorage.setItem("evalx_sess_teacher", JSON.stringify(newTeacher));
  appState.currentRole = "teacher";

  navigateTo("#teacher-pending");
});

document.querySelector(".btn-teacher-cancel").addEventListener("click", () => {
  navigateTo("#home");
});

function renderTeacherPending() {
  const teacher = appState.teacherSession;
  if (!teacher) return;

  document.getElementById("pending-group-tag").textContent = `${teacher.branch} - Group ${teacher.group}`;
  document.getElementById("pending-email-tag").textContent = teacher.email;
}

// Check approval refresh trigger
document.getElementById("btn-pending-refresh").addEventListener("click", () => {
  const teachers = DB.getTeachers();
  const fresh = teachers.find(t => t.email.toLowerCase() === appState.teacherSession.email.toLowerCase());
  
  if (fresh) {
    appState.teacherSession = fresh;
    sessionStorage.setItem("evalx_sess_teacher", JSON.stringify(fresh));
    
    if (fresh.status === "approved") {
      showBrutalAlert("✅ Congratulations! Your registration has been approved by the Administrator.", () => {
        navigateTo("#teacher-dashboard");
      });
    } else {
      showBrutalAlert("⏳ Request remains pending verification. Please contact the administrator.");
    }
  }
});

// Logout pending teacher
document.getElementById("btn-pending-logout").addEventListener("click", () => {
  sessionStorage.removeItem("evalx_sess_teacher");
  appState.teacherSession = null;
  appState.currentRole = null;
  navigateTo("#home");
});

// Load Teacher Dashboard
function renderTeacherDashboard() {
  const teacher = appState.teacherSession;
  if (!teacher) return;

  document.getElementById("teacher-dash-title").textContent = `Professor ${teacher.name.split(' ').pop()} Portal`;
  document.getElementById("teacher-dash-subtitle").textContent = `${teacher.college} | Branch ${teacher.branch} | Group ${teacher.group}`;

  // Get Expected student limits
  const groupKey = `${teacher.college}_${teacher.branch}_${teacher.group}`;
  const targets = DB.getGroupTargets();
  const limitTarget = targets[groupKey] || 30; // default 30
  
  document.getElementById("input-group-target").value = limitTarget;

  // Filter students matching the teacher's Group & Branch & College
  const students = DB.getStudents();
  const groupStudents = students.filter(s => 
    s.college === teacher.college && 
    s.branch === teacher.branch && 
    s.group === teacher.group
  );

  // Update counters
  const signedUpCount = groupStudents.length;
  const remainingCount = Math.max(0, limitTarget - signedUpCount);

  document.getElementById("teacher-val-signedup").textContent = `${signedUpCount} / ${limitTarget}`;
  document.getElementById("teacher-val-remaining").textContent = remainingCount;

  // Populate student list table
  const tableBody = document.querySelector("#teacher-students-table tbody");
  const emptyState = document.getElementById("teacher-empty-state");
  
  tableBody.innerHTML = "";

  if (groupStudents.length === 0) {
    emptyState.style.display = "block";
    document.getElementById("teacher-students-table").style.display = "none";
  } else {
    emptyState.style.display = "none";
    document.getElementById("teacher-students-table").style.display = "table";

    groupStudents.forEach(stud => {
      const row = document.createElement("tr");

      // Compile weak badges
      let weakBadges = "";
      if (stud.weakSubjects.length === 0) {
        weakBadges = `<span class="badge badge-success">No deficiencies</span>`;
      } else {
        stud.weakSubjects.forEach(w => {
          weakBadges += `<span class="badge badge-warning mb-1 mr-1" style="display:inline-block; margin-right:4px;">${w.name}</span> `;
        });
      }

      row.innerHTML = `
        <td><b style="color:var(--color-secondary);">${stud.regNo}</b></td>
        <td>${stud.name}</td>
        <td>${stud.marks.btech.length} Semesters logged</td>
        <td><b style="font-size:1rem; color:#fff;">${stud.cgpa.toFixed(2)}</b></td>
        <td><div style="max-width:320px; flex-wrap:wrap; display:flex;">${weakBadges}</div></td>
        <td>
          <button class="btn btn-accent btn-sm btn-view-dossier" data-reg="${stud.regNo}" style="padding:0.4rem 0.8rem; font-size:0.8rem;">
            🔍 View Profile
          </button>
        </td>
      `;

      // Dossier modal event binding
      row.querySelector(".btn-view-dossier").addEventListener("click", () => {
        openStudentDossierModal(stud);
      });

      tableBody.appendChild(row);
    });
  }
}

// Teacher capacity save button
document.getElementById("btn-save-target").addEventListener("click", () => {
  const val = parseInt(document.getElementById("input-group-target").value);
  if (isNaN(val) || val < 1) {
    showBrutalAlert("Please enter a valid capacity count.");
    return;
  }

  const teacher = appState.teacherSession;
  const groupKey = `${teacher.college}_${teacher.branch}_${teacher.group}`;
  
  const targets = DB.getGroupTargets();
  targets[groupKey] = val;
  DB.saveGroupTargets(targets);

  showBrutalAlert("Capacity threshold updated in database.");
  renderTeacherDashboard();
});

// Logout teacher
document.getElementById("btn-teacher-logout").addEventListener("click", () => {
  sessionStorage.removeItem("evalx_sess_teacher");
  appState.teacherSession = null;
  appState.currentRole = null;
  navigateTo("#home");
});

// Open detailed modal profile for student in teacher view
function openStudentDossierModal(student) {
  const modal = document.getElementById("modal-student-detail");
  
  document.getElementById("modal-student-title").innerHTML = `Academic Dossier: <span class="primary-gradient-text">${student.name}</span>`;
  document.getElementById("modal-student-college").textContent = student.college;
  document.getElementById("modal-student-meta").textContent = `Branch: ${student.branch} | Group: ${student.group} | Reg No: ${student.regNo}`;
  document.getElementById("modal-student-gpa").textContent = student.cgpa.toFixed(2);

  // Render prior history details
  const priorBox = document.getElementById("modal-student-prior-records");
  priorBox.innerHTML = "";
  
  let priorHtml = `<ul style="padding-left:1.25rem; display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">`;
  priorHtml += `<li><b>10th Grade Score:</b> ${student.marks.tenth.score}% (${student.marks.tenth.board || 'State Board'})</li>`;
  if (student.timeline.twelfth) {
    priorHtml += `<li><b>12th Grade Score:</b> ${student.marks.twelfth.score}% (${student.marks.twelfth.board || 'State Board'})</li>`;
  }
  if (student.timeline.diploma) {
    priorHtml += `<li><b>Diploma Stream:</b> ${student.marks.diploma.stream} (${student.marks.diploma.score}%)</li>`;
    if (student.marks.diploma.weak) {
      priorHtml += `<li style="grid-column:1/-1;"><b>Prior Weakness Declared:</b> <span class="badge badge-danger">${student.marks.diploma.weak}</span></li>`;
    }
  }
  priorHtml += `</ul>`;
  priorBox.innerHTML = priorHtml;

  // Render weak subjects listing
  const weaksContainer = document.getElementById("modal-student-weak-subjects");
  weaksContainer.innerHTML = "";

  if (student.weakSubjects.length === 0) {
    weaksContainer.innerHTML = `<div class="glass-card text-center text-success" style="grid-column: 1/-1; padding: 0.75rem;">No academic deficiencies flagged for this student.</div>`;
  } else {
    student.weakSubjects.forEach(w => {
      const card = document.createElement("div");
      card.className = "weak-subject-card";
      card.style.padding = "0.75rem";
      card.innerHTML = `
        <div style="font-weight:600; font-size:0.9rem;">${w.name}</div>
        <div style="font-size:0.75rem; color:#f87171;">${w.reason}</div>
      `;
      weaksContainer.appendChild(card);
    });
  }

  // Load study advisor reports
  const resultDiv = document.getElementById("modal-student-ai-result");
  const loaderDiv = document.getElementById("modal-student-ai-loading");

  resultDiv.innerHTML = "";
  resultDiv.style.display = "none";
  loaderDiv.style.display = "block";

  modal.classList.add("active");

  // Load response
  setTimeout(async () => {
    const guideHtml = await getRemedialAdviseReport(student);
    loaderDiv.style.display = "none";
    resultDiv.innerHTML = guideHtml;
    resultDiv.style.display = "block";
  }, 600);
}

document.getElementById("btn-close-student-detail").addEventListener("click", () => {
  document.getElementById("modal-student-detail").classList.remove("active");
});
document.getElementById("btn-close-student-detail-footer").addEventListener("click", () => {
  document.getElementById("modal-student-detail").classList.remove("active");
});

// ==========================================
// 7. SYSTEM ADMIN DASHBOARD FLOW
// ==========================================

document.getElementById("form-admin-login").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = document.getElementById("admin-email").value.trim();
  const password = document.getElementById("admin-password").value;
  const errorEl = document.getElementById("admin-login-error");

  // Premade Admin Credentials Check
  if (email === "admin@evalx.com" && password === "admin123") {
    errorEl.style.display = "none";
    appState.adminSession = true;
    sessionStorage.setItem("evalx_sess_admin", "true");
    appState.currentRole = "admin";
    navigateTo("#admin-dashboard");
  } else {
    errorEl.style.display = "block";
  }
});

function renderAdminDashboard() {
  const teachers = DB.getTeachers();
  const students = DB.getStudents();

  // Metrics counts
  const approvedTeachers = teachers.filter(t => t.status === "approved").length;
  const pendingRequests = teachers.filter(t => t.status === "pending").length;

  document.getElementById("admin-val-teachers").textContent = approvedTeachers;
  document.getElementById("admin-val-students").textContent = students.length;
  document.getElementById("admin-val-pending").textContent = pendingRequests;

  // Render pending requests list table
  const reqTable = document.querySelector("#admin-requests-table tbody");
  const reqEmpty = document.getElementById("admin-requests-empty");
  
  reqTable.innerHTML = "";

  const pendings = teachers.filter(t => t.status === "pending");

  if (pendings.length === 0) {
    reqEmpty.style.display = "block";
    document.getElementById("admin-requests-table").style.display = "none";
  } else {
    reqEmpty.style.display = "none";
    document.getElementById("admin-requests-table").style.display = "table";

    pendings.forEach(teach => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><b>${teach.name}</b></td>
        <td>${teach.email}</td>
        <td>CV Raman</td>
        <td><span class="badge badge-primary">${teach.branch}</span></td>
        <td>Group ${teach.group}</td>
        <td>
          <button class="btn btn-accent btn-sm btn-admin-approve" data-email="${teach.email}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; background:var(--color-success); box-shadow:none;">Approve</button>
          <button class="btn btn-danger btn-sm btn-admin-reject" data-email="${teach.email}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; margin-left: 5px;">Reject</button>
        </td>
      `;

      // Binding admin triggers
      row.querySelector(".btn-admin-approve").addEventListener("click", () => {
        adminApproveTeacher(teach.email);
      });
      row.querySelector(".btn-admin-reject").addEventListener("click", () => {
        adminRejectTeacher(teach.email);
      });

      reqTable.appendChild(row);
    });
  }

  // Render approved teachers database list
  const techTable = document.querySelector("#admin-teachers-table tbody");
  const techEmpty = document.getElementById("admin-teachers-empty");
  
  techTable.innerHTML = "";

  const approveds = teachers.filter(t => t.status === "approved");

  if (approveds.length === 0) {
    techEmpty.style.display = "block";
    document.getElementById("admin-teachers-table").style.display = "none";
  } else {
    techEmpty.style.display = "none";
    document.getElementById("admin-teachers-table").style.display = "table";

    approveds.forEach(teach => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${teach.name}</td>
        <td>${teach.email}</td>
        <td>${teach.college}</td>
        <td><span class="badge badge-secondary">${teach.branch} - Group ${teach.group}</span></td>
        <td><span class="badge badge-success">Authorized</span></td>
      `;
      techTable.appendChild(row);
    });
  }
}

function adminApproveTeacher(email) {
  const teachers = DB.getTeachers();
  const index = teachers.findIndex(t => t.email.toLowerCase() === email.toLowerCase());
  
  if (index > -1) {
    teachers[index].status = "approved";
    DB.saveTeachers(teachers);
    showBrutalAlert(`Success: Approved registration for ${teachers[index].name}.`);
    renderAdminDashboard();
  }
}

function adminRejectTeacher(email) {
  showBrutalConfirm("Are you sure you want to decline this registration request?", () => {
    const teachers = DB.getTeachers();
    const filtered = teachers.filter(t => t.email.toLowerCase() !== email.toLowerCase());
    DB.saveTeachers(filtered);
    showBrutalAlert("Verification request rejected.");
    renderAdminDashboard();
  });
}

// Log out Admin
document.getElementById("btn-admin-logout").addEventListener("click", () => {
  sessionStorage.removeItem("evalx_sess_admin");
  appState.adminSession = false;
  appState.currentRole = null;
  navigateTo("#home");
});

// ==========================================
// 8. NVIDIA AI INTEGRATION (LLM INSIGHTS)
// ==========================================

// Settings popup open/close
document.querySelectorAll(".btn-open-api-config").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = DB.getApiKey();
    document.getElementById("input-api-key").value = key;
    document.getElementById("modal-settings").classList.add("active");
  });
});

document.getElementById("btn-close-settings").addEventListener("click", () => {
  document.getElementById("modal-settings").classList.remove("active");
});
document.getElementById("modal-settings-backdrop").addEventListener("click", () => {
  document.getElementById("modal-settings").classList.remove("active");
});

document.getElementById("btn-save-api-key").addEventListener("click", () => {
  const key = document.getElementById("input-api-key").value.trim();
  if (key) {
    DB.saveApiKey(key);
    showBrutalAlert("Nvidia API key saved successfully.");
  } else {
    DB.removeApiKey();
    showBrutalAlert("Nvidia API key removed.");
  }
  document.getElementById("modal-settings").classList.remove("active");
  updateApiKeyUI();
});

document.getElementById("btn-clear-api-key").addEventListener("click", () => {
  DB.removeApiKey();
  document.getElementById("input-api-key").value = "";
  showBrutalAlert("Nvidia API configuration cleared.");
  document.getElementById("modal-settings").classList.remove("active");
  updateApiKeyUI();
});

function updateApiKeyUI() {
  const key = DB.getApiKey();
  const badge = document.getElementById("api-key-header-status");
  const text = document.getElementById("api-status-text");

  if (badge && text) {
    if (key) {
      badge.className = "api-key-indicator configured";
      text.textContent = "Nvidia NIM Active";
    } else {
      badge.className = "api-key-indicator not-configured";
      text.textContent = "Local Engine";
    }
  }
}

// Student Dashboard Trigger Nvidia Guidance
document.getElementById("btn-trigger-ai").addEventListener("click", async () => {
  const student = appState.studentSession;
  if (!student) return;

  const resultDiv = document.getElementById("ai-result-content");
  const loaderDiv = document.getElementById("ai-loading");
  const promptBox = document.getElementById("ai-prompt-box");

  promptBox.style.display = "none";
  resultDiv.style.display = "none";
  loaderDiv.style.display = "block";

  // Simulate or execute NIM request
  const advisorHtml = await getRemedialAdviseReport(student);
  
  loaderDiv.style.display = "none";
  resultDiv.innerHTML = advisorHtml;
  resultDiv.style.display = "block";
});

// Common Core AI engine caller
async function getRemedialAdviseReport(student) {
  const apiKey = DB.getApiKey();
  
  if (!apiKey) {
    // Return high quality simulated report locally
    return generateLocalRemedialReport(student);
  }

  // If Nvidia key is provided, we fetch Llama model details!
  try {
    const studentDossierText = compileTextDossier(student);
    
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          {
            role: "system",
            content: "You are evalX academic cognitive guidance assistant. You analyze student marks in engineering and compile a highly structured, encouraging, and detailed academic remediation report. Identify weak subjects specifically. Highlight key topics they should review, advise actionable study actions, and recommend high quality online resources. Output the response in clean HTML formatting (with tags like h4, p, ul, li, strong) suitable for direct div rendering. Keep font layout style sleek."
          },
          {
            role: "user",
            content: `Student Academic Profile:\nName: ${student.name}\nBranch: ${student.branch}\nCGPA: ${student.cgpa}\nWeak subjects detected: ${JSON.stringify(student.weakSubjects)}\nMarks Profile:\n${studentDossierText}`
          }
        ],
        temperature: 0.2,
        max_tokens: 1200
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let htmlContent = data.choices[0].message.content;
    
    // Safety sanitization: remove ```html wrapping if the model outputs it
    htmlContent = htmlContent.replace(/```html/g, "").replace(/```/g, "").trim();

    return `
      <div style="border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.75rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
        <span class="badge badge-success">✨ Verified Nvidia AI Inference</span>
        <span style="font-size:0.75rem; color:var(--text-muted);">Model: Llama 3.1 70B</span>
      </div>
      <div class="ai-report-body">${htmlContent}</div>
    `;
  } catch (err) {
    console.error("Nvidia Cloud API call failed: ", err);
    return `
      <div class="glass-card" style="border-color:rgba(239,68,68,0.3); background:rgba(239,68,68,0.05); margin-bottom:1rem;">
        <h4 style="color:var(--color-danger)">⚠️ Nvidia API connection failed</h4>
        <p class="text-secondary mt-1" style="font-size:0.85rem;">
          We encountered an issue querying the Nvidia NIM servers: "${err.message}".
          Falling back to local heuristic mapping engine:
        </p>
      </div>
      ${generateLocalRemedialReport(student)}
    `;
  }
}

function compileTextDossier(student) {
  let doc = `Tenth Grade: ${student.marks.tenth.score}% (${student.marks.tenth.board})\n`;
  if (student.timeline.twelfth) {
    doc += `Twelfth Grade: ${student.marks.twelfth.score}% (${student.marks.twelfth.board})\n`;
  }
  if (student.timeline.diploma) {
    doc += `Diploma: ${student.marks.diploma.score}% in ${student.marks.diploma.stream}. Declared weakness: ${student.marks.diploma.weak}\n`;
  }
  doc += `B.Tech Semester Records:\n`;
  student.marks.btech.forEach(s => {
    doc += `- Sem ${s.sem}:\n`;
    s.subjects.forEach(sub => {
      doc += `  * ${sub.name}: ${sub.score}/100\n`;
    });
  });
  return doc;
}

// Generate highly detailed local guidance html
function generateLocalRemedialReport(student) {
  if (student.weakSubjects.length === 0) {
    return `
      <div style="border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.75rem; margin-bottom:1rem;">
        <span class="badge badge-secondary">🧠 evalX Local Cognitive Module</span>
      </div>
      <h4>Academic Standing Briefing</h4>
      <p class="mt-2">Excellent performance dossier! You have logged <strong>${student.cgpa.toFixed(2)} CGPA</strong> across <strong>${student.marks.btech.length} semesters</strong>. No curricular targets scored below 50%.</p>
      <h4 class="mt-4">Next Step Recommendations:</h4>
      <ul>
        <li>Maintain consistent study pacing. Keep solving reference books.</li>
        <li>Participate in technical hackathons or coding cohorts aligned with engineering electives.</li>
        <li>Begin drafting project outlines for final year seminars early.</li>
      </ul>
    `;
  }

  let guidesHtml = "";
  student.weakSubjects.forEach(weak => {
    const guideObj = REMEDIAL_GUIDES[weak.name] || DEFAULT_GUIDE;
    guidesHtml += `
      <div class="glass-card mb-4" style="border-color: rgba(245, 158, 11, 0.15); background:rgba(0,0,0,0.15);">
        <h4 style="color:var(--color-warning);">${weak.name}</h4>
        <p style="font-size:0.85rem; color:#f87171;">Flag: ${weak.reason}</p>
        
        <div class="mt-3">
          <strong style="font-size:0.85rem; color:var(--text-secondary);">Core Target Subtopics:</strong>
          <p style="font-size:0.9rem;" class="mt-1">${guideObj.focus}</p>
        </div>
        
        <div class="mt-2">
          <strong style="font-size:0.85rem; color:var(--text-secondary);">Weekly Action Steps:</strong>
          <p style="font-size:0.9rem;" class="mt-1">${guideObj.guide}</p>
        </div>
        
        <div class="mt-2">
          <strong style="font-size:0.85rem; color:var(--text-secondary);">Suggested Resource Repositories:</strong>
          <p style="font-size:0.85rem; color:var(--color-secondary);" class="mt-1">${guideObj.resources}</p>
        </div>
      </div>
    `;
  });

  return `
    <div style="border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.75rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center;">
      <span class="badge badge-secondary">🧠 evalX Local Cognitive Module</span>
      <span style="font-size:0.75rem; color:var(--text-muted);">Simulated Nvidia Advisor</span>
    </div>
    <h4>Remedial Study Roadmap for ${student.name}</h4>
    <p class="mb-4">The academic analysis engine identified <strong>${student.weakSubjects.length} focus targets</strong> requiring curriculum alignment and study review:</p>
    
    <div class="remedial-guides-container">
      ${guidesHtml}
    </div>

    <div class="glass-card mt-4" style="border-color:rgba(99,102,241,0.25); background:rgba(99,102,241,0.02)">
      <p style="font-size:0.85rem; font-weight:600;">⚡ Tip for complete Cognitive mapping:</p>
      <p class="text-muted mt-1" style="font-size:0.8rem;">
        Add your Nvidia NIM API key in the header menu config settings. Connecting an API key allows evalX to feed your entire student profile through a 70B parameter Llama model to compile customized study questions and resource playlists dynamically.
      </p>
    </div>
  `;
}

// ==========================================
// 9. EVENT BINDING & GENERAL TRIGGERS
// ==========================================

// Global Reset Tool (Footer click)
document.getElementById("btn-footer-reset").addEventListener("click", (e) => {
  e.preventDefault();
  showBrutalConfirm("This will clear all registered students, teachers, configurations and reset the demo dataset. Proceed?", () => {
    DB.resetDatabase();
  });
});

// Portal Button Triggers
document.getElementById("btn-portal-student").addEventListener("click", () => {
  navigateTo("#student-form");
});

document.getElementById("btn-portal-teacher").addEventListener("click", () => {
  navigateTo("#teacher-signup");
});

document.getElementById("header-logo").addEventListener("click", (e) => {
  e.preventDefault();
  navigateTo("#home");
});

// GSAP & ScrollTrigger Animations for Swiss Brutalist Landing Page
function initGsapAnimations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded. Skipping animations.");
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero entrance — blur-in title only (no card animations)
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

  heroTl.fromTo("#hero-title",
    { opacity: 0, filter: "blur(18px)", y: 30 },
    { opacity: 1, filter: "blur(0px)", y: 0, delay: 0.3 }
  );

  heroTl.fromTo(".hero-sub",
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, stagger: 0.12 },
    "-=0.6"
  );

  heroTl.fromTo(".hero-panel-left .brutal-btn",
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, stagger: 0.1 },
    "-=0.5"
  );

  heroTl.fromTo("#hero-mockup",
    { opacity: 0, y: 40, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "back.out(1.1)" },
    "-=0.8"
  );

  // 2. Feature Cells — NO animation, always visible (user request)
  document.querySelectorAll(".feature-cell").forEach(el => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });


  // 3. ScrollTrigger character un-blur text reveal
  const textEl = document.getElementById("gsap-reveal-text");
  if (textEl) {
    const originalText = textEl.textContent.trim();
    // Split into characters
    textEl.innerHTML = originalText.split("").map(char => {
      if (char === " ") return " ";
      return `<span class="reveal-char" style="opacity: 0.15; filter: blur(10px); display: inline-block; transition: none;">${char}</span>`;
    }).join("");

    const chars = textEl.querySelectorAll(".reveal-char");
    if (chars.length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-reveal-section",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5
        }
      }).to(chars, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.02,
        ease: "none"
      });
    }
  }

  // 4. Hero mockup mouse hover dynamic graphics movement
  const mockup = document.getElementById("hero-mockup");
  if (mockup) {
    mockup.addEventListener("mousemove", (e) => {
      const rect = mockup.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(mockup, {
        x: x * 0.08,
        y: y * 0.08,
        rotationY: x * 0.03,
        rotationX: -y * 0.03,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    mockup.addEventListener("mouseleave", () => {
      gsap.to(mockup, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    });
  }

  // 5. Scroll blur-reveal for section headings (excluding hero which has its own)
  const blurTargets = document.querySelectorAll(
    ".bento-card-verify h2, .bento-card-together h2, .bento-card-join .join-title, " +
    ".portal-split-box h2, .scroll-reveal-section, .feature-cell h3"
  );

  blurTargets.forEach(el => {
    el.style.opacity = "0";
    el.style.filter = "blur(14px)";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease";
  });

  const blurObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.filter = "blur(0px)";
        entry.target.style.transform = "translateY(0)";
        blurObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  blurTargets.forEach(el => blurObserver.observe(el));
}


// Initialize / restore session on load
window.addEventListener("DOMContentLoaded", () => {
  restoreSession();
  initGsapAnimations();
  
  // Hero section initiate CTA
  const btnHeroStart = document.getElementById("btn-hero-start");
  if (btnHeroStart) {
    btnHeroStart.addEventListener("click", () => {
      navigateTo("#student-form");
    });
  }

  // Hero starburst badge click handler
  const btnHeroBadge = document.getElementById("btn-hero-badge");
  if (btnHeroBadge) {
    btnHeroBadge.addEventListener("click", () => {
      navigateTo("#student-form");
    });
  }

  const btnJoinStart = document.getElementById("btn-join-start");
  if (btnJoinStart) {
    btnJoinStart.addEventListener("click", () => {
      navigateTo("#student-form");
    });
  }

  // Feature explore actions
  const exploreTracker = document.getElementById("btn-explore-tracker");
  if (exploreTracker) {
    exploreTracker.addEventListener("click", () => {
      navigateTo("#student-form");
    });
  }

  const exploreAi = document.getElementById("btn-explore-ai");
  if (exploreAi) {
    exploreAi.addEventListener("click", () => {
      navigateTo("#student-form");
    });
  }

  const exploreFaculty = document.getElementById("btn-explore-faculty");
  if (exploreFaculty) {
    exploreFaculty.addEventListener("click", () => {
      navigateTo("#teacher-signup");
    });
  }

  // Timeline school check togglers
  // Note: 10th Grade is locked as selected (cannot be toggled)
  const chk10th = document.getElementById("chk-10th");
  if (chk10th) {
    chk10th.checked = true; // Always checked
  }

  const tc12th = document.getElementById("tc-12th");
  const chk12th = document.getElementById("chk-12th");
  if (tc12th && chk12th) {
    tc12th.addEventListener("click", () => {
      chk12th.checked = !chk12th.checked;
      tc12th.classList.toggle("selected", chk12th.checked);
      
      const sec12th = document.getElementById("section-12th-marks");
      if (sec12th) {
        sec12th.style.display = chk12th.checked ? "block" : "none";
      }
    });
  }

  const tcIti = document.getElementById("tc-iti");
  const chkIti = document.getElementById("chk-iti");
  if (tcIti && chkIti) {
    tcIti.addEventListener("click", () => {
      chkIti.checked = !chkIti.checked;
      tcIti.classList.toggle("selected", chkIti.checked);
      
      const secIti = document.getElementById("section-iti-marks");
      if (secIti) {
        secIti.style.display = chkIti.checked ? "block" : "none";
      }
      
      calculateBtechSemFillingBoundaries();
    });
  }

  const tcDiploma = document.getElementById("tc-diploma");
  const chkDiploma = document.getElementById("chk-diploma");
  if (tcDiploma && chkDiploma) {
    tcDiploma.addEventListener("click", () => {
      chkDiploma.checked = !chkDiploma.checked;
      tcDiploma.classList.toggle("selected", chkDiploma.checked);
      
      const secDiploma = document.getElementById("section-diploma-marks");
      if (secDiploma) {
        secDiploma.style.display = chkDiploma.checked ? "block" : "none";
      }
      
      calculateBtechSemFillingBoundaries();
    });
  }

  const tcBtech = document.getElementById("tc-btech");
  const chkBtech = document.getElementById("chk-btech");
  if (tcBtech && chkBtech) {
    tcBtech.addEventListener("click", () => {
      chkBtech.checked = !chkBtech.checked;
      tcBtech.classList.toggle("selected", chkBtech.checked);
      
      const secBtechStatus = document.getElementById("section-btech-status");
      if (secBtechStatus) {
        secBtechStatus.style.display = chkBtech.checked ? "block" : "none";
      }
      
      calculateBtechSemFillingBoundaries();
    });
  }

  // Setup Autocomplete Search
  setupAutocomplete();
});

function setupAutocomplete() {
  const nameInp = document.getElementById("student-name");
  const nameList = document.getElementById("autocomplete-name-list");
  const regInp = document.getElementById("student-reg");
  const regList = document.getElementById("autocomplete-reg-list");

  if (!nameInp || !nameList || !regInp || !regList) return;

  const showSuggestions = (inp, list, isReg = false) => {
    const val = inp.value.trim().toLowerCase();
    list.innerHTML = "";
    
    if (val.length < 2) {
      list.style.display = "none";
      return;
    }

    // Filter student records
    const matches = EXCEL_STUDENTS.filter(s => {
      const matchField = isReg ? s.regNo : s.name;
      return matchField.toLowerCase().includes(val);
    }).slice(0, 10);

    if (matches.length === 0) {
      list.style.display = "none";
      return;
    }

    matches.forEach(student => {
      const item = document.createElement("div");
      item.className = "autocomplete-item";
      item.innerHTML = `
        <strong style="color:var(--text-primary); font-size:0.85rem;">${student.name}</strong>
        <span style="color:var(--text-muted); font-size:0.7rem;">REG: ${student.regNo} (${student.branch} G${student.group})</span>
      `;
      
      item.addEventListener("click", () => {
        nameInp.value = student.name;
        regInp.value = student.regNo;
        
        const branchSelect = document.getElementById("student-branch");
        const groupSelect = document.getElementById("student-group");
        
        if (branchSelect) branchSelect.value = student.branch;
        if (groupSelect) groupSelect.value = student.group;
        
        nameList.style.display = "none";
        regList.style.display = "none";
      });
      
      list.appendChild(item);
    });

    list.style.display = "block";
  };

  nameInp.addEventListener("input", () => {
    showSuggestions(nameInp, nameList, false);
  });

  regInp.addEventListener("input", () => {
    showSuggestions(regInp, regList, true);
  });

  document.addEventListener("click", (e) => {
    if (e.target !== nameInp && e.target !== nameList) {
      nameList.style.display = "none";
    }
    if (e.target !== regInp && e.target !== regList) {
      regList.style.display = "none";
    }
  });
}

function showBrutalAlert(message, onOk = null) {
  const dialog = document.getElementById("modal-brutal-dialog");
  const msgEl = document.getElementById("brutal-dialog-message");
  const okBtn = document.getElementById("btn-brutal-dialog-ok");
  const cancelBtn = document.getElementById("btn-brutal-dialog-cancel");
  const titleEl = document.getElementById("brutal-dialog-title");

  if (!dialog || !msgEl || !okBtn || !cancelBtn) {
    alert(message);
    if (onOk) onOk();
    return;
  }

  titleEl.textContent = "⚡ SYSTEM NOTICE";
  msgEl.textContent = message;
  cancelBtn.style.display = "none";
  dialog.classList.add("active");

  const handleOk = () => {
    dialog.classList.remove("active");
    okBtn.removeEventListener("click", handleOk);
    if (onOk) onOk();
  };
  okBtn.addEventListener("click", handleOk);
}

function showBrutalConfirm(message, onConfirm, onCancel = null) {
  const dialog = document.getElementById("modal-brutal-dialog");
  const msgEl = document.getElementById("brutal-dialog-message");
  const okBtn = document.getElementById("btn-brutal-dialog-ok");
  const cancelBtn = document.getElementById("btn-brutal-dialog-cancel");
  const titleEl = document.getElementById("brutal-dialog-title");

  if (!dialog || !msgEl || !okBtn || !cancelBtn) {
    const res = confirm(message);
    if (res && onConfirm) onConfirm();
    if (!res && onCancel) onCancel();
    return;
  }

  titleEl.textContent = "❓ SYSTEM PROMPT";
  msgEl.textContent = message;
  cancelBtn.style.display = "inline-flex";
  dialog.classList.add("active");

  const cleanup = () => {
    dialog.classList.remove("active");
    okBtn.removeEventListener("click", handleConfirm);
    cancelBtn.removeEventListener("click", handleCancel);
  };

  const handleConfirm = () => {
    cleanup();
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    cleanup();
    if (onCancel) onCancel();
  };

  okBtn.addEventListener("click", handleConfirm);
  cancelBtn.addEventListener("click", handleCancel);
}
