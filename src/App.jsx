import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Award, 
  Phone, 
  Mail, 
  User, 
  ChevronDown,
  Star, 
  BarChart, 
  FileSpreadsheet, 
  Menu,
  X,
  LayoutDashboard,
  HelpCircle,
  Send,
  ArrowRight
} from 'lucide-react';

// --- THEME CONFIGURATION ---
const THEME = {
  colors: {
    primary: '#2D5F3F', // Deep Green
    secondary: '#00A896', // Bright Teal
    accent: '#F4A261', // Warm Orange
    bg: '#F8F9FA', // Light Gray
    text: '#1F2937', // Dark Gray
    white: '#FFFFFF'
  }
};

// --- COURSE CONTENT DATA ---
const courseData = [
  {
    level: "Beginner",
    id: "beg",
    description: "Master the fundamentals of the interface and basic formulas.",
    modules: [
      {
        id: "b1",
        title: "Excel Interface & Navigation",
        content: "Welcome to Excel! In this lesson, we explore the Ribbon, the Formula Bar, and the difference between Workbooks and Worksheets. Remember: A Workbook holds multiple Worksheets (tabs at the bottom).",
        exercise: "Open Excel. Create 3 new sheets. Rename them 'Data', 'Analysis', and 'Summary'.",
        quiz: {
          question: "What is the bar at the top containing tabs like Home, Insert, and Data called?",
          options: ["The Menu Bar", "The Ribbon", "The Tool Strip", "The Header"],
          correct: 1
        }
      },
      {
        id: "b2",
        title: "Basic Formulas (SUM, AVERAGE)",
        content: "Formulas always start with an equals sign (=). SUM adds numbers, AVERAGE finds the mean. Example: =SUM(A1:A5).",
        exercise: "Create a list of 5 grocery prices. Use =SUM() to find the total cost.",
        quiz: {
          question: "Which character must every formula start with?",
          options: ["#", "!", "=", "@"],
          correct: 2
        }
      }
    ]
  },
  {
    level: "Intermediate",
    id: "int",
    description: "Dive into data analysis with conditional formatting and lookups.",
    modules: [
      {
        id: "i1",
        title: "Conditional Formatting",
        content: "Conditional formatting changes the color of cells based on their values. It's great for highlighting trends, like sales below target (Red) or above target (Green).",
        exercise: "Create a list of scores (0-100). Highlight any score below 50 in Red.",
        quiz: {
          question: "What is Conditional Formatting primarily used for?",
          options: ["Visualizing data based on criteria", "Calculating totals", "Creating macros", "Printing PDFs"],
          correct: 0
        }
      },
      {
        id: "i2",
        title: "Introduction to VLOOKUP",
        content: "VLOOKUP searches for a value in the first column of a table and returns a value in the same row from a specified column. Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]).",
        exercise: "Create a product list with IDs and Prices. Use VLOOKUP to find the price of ID '102'.",
        quiz: {
          question: "In VLOOKUP, which argument specifies exact or approximate match?",
          options: ["col_index_num", "table_array", "range_lookup", "lookup_value"],
          correct: 2
        }
      }
    ]
  },
  {
    level: "Advanced",
    id: "adv",
    description: "Automate tasks and handle massive datasets.",
    modules: [
      {
        id: "a1",
        title: "Pivot Tables",
        content: "Pivot Tables allow you to summarize thousands of rows of data in seconds without formulas. You can drag and drop fields to group data by categories.",
        exercise: "Download a sample sales dataset. Create a Pivot Table showing total sales by Region.",
        quiz: {
          question: "True or False: Pivot Tables change the original data source directly.",
          options: ["True", "False"],
          correct: 1
        }
      },
      {
        id: "a2",
        title: "Intro to Macros",
        content: "Macros record your steps to automate repetitive tasks. They use a language called VBA (Visual Basic for Applications). be careful running macros from unknown sources!",
        exercise: "Record a simple Macro that formats a selected cell to Bold and Yellow background.",
        quiz: {
          question: "What programming language do Excel Macros use?",
          options: ["Python", "Java", "VBA", "C++"],
          correct: 2
        }
      }
    ]
  }
];

const FAQs = [
  { q: "Do I need to install Excel?", a: "Yes, you will need Microsoft Excel installed on your computer to practice the exercises." },
  { q: "Is this course free?", a: "Yes, the online modules are completely free. Specialized consultation is a paid service." },
  { q: "Can I get a certificate?", a: "Yes! Once you complete all modules and pass all quizzes, you can generate a certificate." }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Load progress
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('excelCourseProgress'));
    if (savedProgress) {
      setCompletedModules(savedProgress.completed || []);
      setQuizScores(savedProgress.scores || {});
      setUserName(savedProgress.name || "");
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('excelCourseProgress', JSON.stringify({
      completed: completedModules,
      scores: quizScores,
      name: userName
    }));
  }, [completedModules, quizScores, userName]);

  const totalModules = courseData.reduce((acc, level) => acc + level.modules.length, 0);
  const progressPercentage = Math.round((completedModules.length / totalModules) * 100);
  const isCourseComplete = progressPercentage === 100;

  const handleQuizSubmit = (moduleId, selectedOption, correctOption) => {
    if (selectedOption === correctOption) {
      const newScores = { ...quizScores, [moduleId]: true };
      setQuizScores(newScores);
      if (!completedModules.includes(moduleId)) {
        setCompletedModules([...completedModules, moduleId]);
      }
      // Optional: Add a toast notification here instead of alert for cleaner UI
      alert("Correct! Module Completed."); 
    } else {
      alert("Incorrect. Try again!");
    }
  };

  // --- COMPONENTS ---

  const Navbar = () => (
    <nav className="sticky top-0 z-50 shadow-md transition-all duration-300" style={{ backgroundColor: THEME.colors.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer text-white" 
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <FileSpreadsheet size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">Excel with Hussain</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {[
                { id: 'home', label: 'Home' },
                { id: 'learn', label: 'Course' },
                { id: 'consult', label: 'Consultation' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'text-green-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {isCourseComplete && (
                <button 
                  onClick={() => setActiveTab('certificate')} 
                  className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all"
                  style={{ backgroundColor: THEME.colors.accent, color: '#fff' }}
                >
                  <Award size={16} />
                  <span>Certificate</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-green-100 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-800 shadow-inner">
          {['home', 'learn', 'consult', 'certificate'].map((tab) => (
             <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700 capitalize"
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  const HomeView = () => (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white pb-20 pt-16" style={{ backgroundColor: THEME.colors.primary }}>
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute top-32 -left-20 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Master Excel.<br/>
                <span style={{ color: THEME.colors.accent }}>Accelerate Your Career.</span>
              </h1>
              <p className="mt-4 text-xl text-green-100 max-w-lg">
                A structured, interactive learning platform tailored to take you from beginner to pro. No fluff, just skills.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setActiveTab('learn')}
                  className="px-8 py-4 rounded-lg text-lg font-bold shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: THEME.colors.accent, color: 'white' }}
                >
                  Start Learning Free <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setActiveTab('consult')}
                  className="px-8 py-4 rounded-lg text-lg font-bold border-2 border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center text-white"
                >
                  Book Consultation
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative">
               {/* Abstract Visual Representation of a Spreadsheet */}
               <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition duration-500">
                  <div className="grid grid-cols-4 gap-4 mb-4 opacity-50">
                    {[...Array(4)].map((_,i) => <div key={i} className="h-4 bg-white/50 rounded"></div>)}
                  </div>
                  <div className="space-y-3">
                     {[...Array(6)].map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4">
                           <div className="col-span-1 h-8 bg-white/20 rounded"></div>
                           <div className="col-span-2 h-8 bg-white/10 rounded"></div>
                           <div className="col-span-1 h-8 bg-teal-400/20 rounded border border-teal-400/30"></div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <LayoutDashboard size={32} />, title: "Structured Path", desc: "Curated modules from basic interface to advanced VBA macros." },
            { icon: <CheckCircle size={32} />, title: "Interactive Quizzes", desc: "Test your knowledge instantly after every lesson to reinforce learning." },
            { icon: <Award size={32} />, title: "Certification", desc: "Earn a verified certificate of completion to showcase your skills." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4" style={{ borderColor: idx === 1 ? THEME.colors.secondary : THEME.colors.primary }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: THEME.colors.bg, color: THEME.colors.primary }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-24"></div> {/* Spacer */}
    </div>
  );

  const DashboardWidget = ({ title, value, subtext, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className="p-3 rounded-full bg-opacity-10" style={{ backgroundColor: `${color}20`, color: color }}>
        {icon}
      </div>
    </div>
  );

  const LearnView = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <div className="lg:w-80 bg-white border-r border-gray-200 h-auto lg:h-[calc(100vh-64px)] overflow-y-auto lg:sticky lg:top-16">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <BookOpen size={20} style={{ color: THEME.colors.secondary }} />
            Course Curriculum
          </h2>
        </div>
        <div className="p-4 space-y-6">
          {courseData.map((level) => (
            <div key={level.id}>
              <h3 className="px-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${level.level === 'Beginner' ? 'bg-green-400' : level.level === 'Intermediate' ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
                {level.level} Level
              </h3>
              <div className="space-y-1">
                {level.modules.map((mod) => {
                  const isCompleted = completedModules.includes(mod.id);
                  const isActive = activeModule?.id === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveModule(mod)}
                      className={`w-full group flex items-center justify-between p-3 rounded-lg text-sm transition-all duration-200 ${
                        isActive 
                          ? 'shadow-md' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      style={isActive ? { backgroundColor: THEME.colors.secondary, color: 'white' } : {}}
                    >
                      <span className="font-medium truncate pr-2">{mod.title}</span>
                      {isCompleted ? (
                        <CheckCircle size={16} className={isActive ? 'text-white' : 'text-green-500'} />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-white/50' : 'border-gray-300'}`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        {/* Top Dashboard Summary */}
        {!activeModule && (
          <div className="mb-10 animate-fade-in">
             <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Dashboard</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <DashboardWidget 
                  title="Progress" 
                  value={`${progressPercentage}%`} 
                  subtext={`${completedModules.length} of ${totalModules} modules`}
                  icon={<BarChart size={24} />}
                  color={THEME.colors.secondary}
               />
               <DashboardWidget 
                  title="Skill Level" 
                  value={completedModules.length < 3 ? "Novice" : completedModules.length < 5 ? "Apprentice" : "Master"} 
                  icon={<Star size={24} />}
                  color={THEME.colors.accent}
               />
               <DashboardWidget 
                  title="Certificate" 
                  value={isCourseComplete ? "Available" : "Locked"} 
                  subtext={isCourseComplete ? "Ready to download" : "Complete all quizzes"}
                  icon={<Award size={24} />}
                  color={THEME.colors.primary}
               />
             </div>
             
             {/* Main progress Bar */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                   <span>Overall Completion</span>
                   <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                   <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                         width: `${progressPercentage}%`,
                         background: `linear-gradient(90deg, ${THEME.colors.primary}, ${THEME.colors.secondary})`
                      }}
                   ></div>
                </div>
                <p className="text-gray-500 mt-4 text-sm">
                   {isCourseComplete 
                      ? "Congratulations! You've completed the course." 
                      : "Keep going! Select a module from the sidebar to continue learning."}
                </p>
             </div>
          </div>
        )}

        {activeModule ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
            <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${THEME.colors.primary}, ${THEME.colors.secondary})` }}></div>
            <div className="p-8 lg:p-10">
              <div className="flex items-center space-x-2 text-sm font-bold uppercase tracking-wider mb-4" style={{ color: THEME.colors.secondary }}>
                <FileSpreadsheet size={16} />
                <span>Current Lesson</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{activeModule.title}</h1>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10">
                <p>{activeModule.content}</p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-10">
                <h4 className="text-lg font-bold text-indigo-900 mb-2">Practice Exercise</h4>
                <p className="text-indigo-800">{activeModule.exercise}</p>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Knowledge Check</h3>
                  {quizScores[activeModule.id] && (
                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle size={14} /> Passed
                     </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="font-medium text-lg text-gray-800 mb-4">{activeModule.quiz.question}</p>
                  <div className="space-y-3">
                    {activeModule.quiz.options.map((opt, idx) => {
                       const isCorrect = idx === activeModule.quiz.correct;
                       const isAnswered = quizScores[activeModule.id];
                       
                       return (
                        <button
                          key={idx}
                          onClick={() => handleQuizSubmit(activeModule.id, idx, activeModule.quiz.correct)}
                          disabled={isAnswered}
                          className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center ${
                             isAnswered && isCorrect 
                                ? 'bg-green-100 border-green-300 text-green-800' 
                                : isAnswered && !isCorrect
                                   ? 'opacity-50 border-gray-200'
                                   : 'bg-white border-gray-200 hover:border-teal-500 hover:shadow-md'
                          }`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle size={18} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
           <div className="hidden md:flex flex-col items-center justify-center h-64 text-gray-400 mt-12">
              <BookOpen size={48} className="mb-4 opacity-20" />
              <p>Select a module from the curriculum to start learning</p>
           </div>
        )}
      </div>
    </div>
  );

  const ConsultView = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Expert Consultation
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Need personalized training or a custom Excel solution?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4" style={{ borderColor: THEME.colors.primary }}>
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-md" style={{ backgroundColor: THEME.colors.primary }}>
                <User size={40} />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900">Mohammed Hussain</h3>
              <p className="text-center text-gray-500 text-sm mb-6">Instructor & Consultant</p>
              
              <div className="space-y-4">
                <a href="tel:+918792409839" className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <Phone size={20} className="mr-3" style={{ color: THEME.colors.secondary }} />
                  <span className="font-medium text-gray-700">+91 87924 09839</span>
                </a>
                <a href="mailto:hussainkhancoc47@gmail.com" className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <Mail size={20} className="mr-3" style={{ color: THEME.colors.secondary }} />
                  <span className="font-medium text-gray-700 text-sm">hussainkhancoc47@gmail.com</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle size={20} style={{ color: THEME.colors.accent }} /> FAQ
              </h3>
              <div className="space-y-2">
                {FAQs.map((faq, idx) => (
                  <div key={idx} className="border rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                      className="w-full text-left p-3 text-sm font-medium flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                    >
                      {faq.q}
                      <ChevronDown size={16} className={`transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFAQ === idx && (
                      <div className="p-3 text-sm text-gray-600 bg-white border-t">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Session</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Interest Area</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border">
                      <option>Personal Training</option>
                      <option>Corporate Workshop</option>
                      <option>Dashboard Development</option>
                      <option>VBA/Macros Automation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3 border" placeholder="Tell me about your specific needs..."></textarea>
                  </div>
                  <button 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    style={{ backgroundColor: THEME.colors.secondary }}
                  >
                    Send Request <Send size={16} className="ml-2" />
                  </button>
                </form>
              </div>
              <div className="bg-gray-50 px-6 py-4 text-center">
                <p className="text-xs text-gray-500">This is a demo form. In a real app, this would email the instructor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CertificateView = () => (
    <div className="min-h-screen bg-gray-100 py-16 px-4 flex items-center justify-center">
      {!userName ? (
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center transform transition-all hover:scale-105">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Award size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Completed!</h2>
          <p className="text-gray-500 mb-8">You've mastered the curriculum. Enter your name to claim your official certificate.</p>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter your full name" 
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button 
              disabled={!userName}
              onClick={() => setUserName(userName)}
              className="w-full text-white py-4 rounded-lg font-bold shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: THEME.colors.primary }}
            >
              Generate Certificate
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl w-full bg-white p-2 shadow-2xl">
          <div className="border-8 border-double border-gray-800 p-12 text-center relative h-full flex flex-col justify-between" style={{ minHeight: '600px' }}>
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <FileSpreadsheet size={400} />
            </div>

            {/* Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 text-green-800 mb-4">
                 <FileSpreadsheet size={32} />
                 <span className="font-bold text-xl uppercase tracking-widest">Excel with Hussain</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Certificate of Completion</h1>
              <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {/* Body */}
            <div className="relative z-10 my-12">
              <p className="text-xl text-gray-500 italic mb-6">This is to certify that</p>
              <h2 className="text-5xl md:text-6xl font-bold text-green-900 font-serif mb-8 p-4 border-b border-gray-200 inline-block min-w-[50%]">
                {userName}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Has successfully completed the <span className="font-bold text-gray-900">Excel Mastery Course</span>, 
                demonstrating proficiency in data management, formulas, pivot tables, and macros.
              </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mt-12 px-12">
              <div className="text-center mb-8 md:mb-0">
                <div className="w-64 border-b-2 border-gray-800 mb-2"></div>
                <p className="text-xl font-bold text-gray-900">Mohammed Hussain</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Lead Instructor</p>
              </div>

              <div className="mb-8 md:mb-0">
                 <Award size={120} className="text-yellow-500 drop-shadow-lg" />
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
                <div className="w-64 border-b-2 border-gray-800 mt-2 mb-2"></div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Date Issued</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center no-print pb-8">
             <p className="text-gray-500 text-sm mb-4">Use your browser's print function to save as PDF</p>
            <button 
              onClick={() => window.print()} 
              className="px-8 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{ backgroundColor: THEME.colors.secondary }}
            >
              Download / Print Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'learn' && <LearnView />}
      {activeTab === 'consult' && <ConsultView />}
      {activeTab === 'certificate' && <CertificateView />}
    </div>
  );
};

export default App;
