import React, { useState } from 'react';
import { Download, Eye, Save, FileText, User, Briefcase, GraduationCap, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

const ResumeBuilderPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Passionate software developer with 3+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud technologies.',
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Software Engineer',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: '• Developed and maintained React applications serving 10k+ users\n• Collaborated with cross-functional teams to deliver features on time\n• Improved application performance by 30% through optimization'
      }
    ],
    education: [
      {
        id: '1',
        school: 'University of California',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2018-09',
        endDate: '2022-05',
        gpa: '3.8'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git'],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce application with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'github.com/johndoe/ecommerce'
      }
    ]
  });

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🎨' },
    { id: 'classic', name: 'Classic', preview: '📄' },
    { id: 'creative', name: 'Creative', preview: '✨' },
    { id: 'minimal', name: 'Minimal', preview: '⚪' },
    { id: 'professional', name: 'Professional', preview: '💼' }
  ];

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: <User className="h-5 w-5" /> },
    { id: 'experience', name: 'Experience', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'education', name: 'Education', icon: <GraduationCap className="h-5 w-5" /> },
    { id: 'skills', name: 'Skills', icon: <Award className="h-5 w-5" /> },
    { id: 'projects', name: 'Projects', icon: <FileText className="h-5 w-5" /> }
  ];

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const renderPersonalInfoForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={resumeData.personalInfo.name}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, name: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={resumeData.personalInfo.email}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, email: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={resumeData.personalInfo.phone}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={resumeData.personalInfo.location}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, location: e.target.value }
            })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={resumeData.summary}
          onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
        />
      </div>
    </div>
  );

  const renderExperienceForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={addExperience}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Experience
        </button>
      </div>
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                />
                <span className="text-sm text-gray-600">Currently working here</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="• Describe your key responsibilities and achievements"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderResumePreview = () => (
    <div id="resume-preview" className="bg-white p-8 shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b-2 border-primary-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>{resumeData.personalInfo.email}</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>{resumeData.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary-600 mb-3">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary-600 mb-3">Work Experience</h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-primary-600 font-medium">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <div className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary-600 mb-3">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-primary-600">{edu.school}</p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
              <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary-600 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-bold text-primary-600 mb-3">Projects</h2>
        {resumeData.projects.map((project) => (
          <div key={project.id} className="mb-4">
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <p className="text-gray-700 text-sm mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-1">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a href={`https://${project.link}`} className="text-primary-600 text-sm hover:underline">
                {project.link}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-gray-600 mt-2">Create a professional resume in minutes</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Templates */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{template.preview}</div>
                    <div className="text-sm font-medium text-gray-900">{template.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section.icon}
                    <span>{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${showPreview ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeSection === 'personal' && renderPersonalInfoForm()}
              {activeSection === 'experience' && renderExperienceForm()}
              {/* Add other section forms here */}
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                <div className="bg-gray-100 p-4 rounded-xl max-h-[800px] overflow-y-auto">
                  <div className="transform scale-75 origin-top">
                    {renderResumePreview()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;