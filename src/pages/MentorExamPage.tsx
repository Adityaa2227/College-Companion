import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, Clock, Book } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'communication' | 'knowledge' | 'ethics';
}

const MentorExamPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the most important quality for effective mentorship?",
      options: [
        "Technical expertise",
        "Active listening and empathy",
        "Years of experience",
        "Communication skills"
      ],
      correctAnswer: 1,
      explanation: "While technical skills are important, active listening and empathy are fundamental to building trust and understanding your mentee's needs.",
      category: 'communication'
    },
    {
      id: 2,
      question: "How should you handle a mentee who is consistently missing scheduled sessions?",
      options: [
        "Immediately end the mentorship relationship",
        "Ignore it and continue with available sessions",
        "Have an open conversation about expectations and barriers",
        "Report them to the platform administrators"
      ],
      correctAnswer: 2,
      explanation: "Open communication is key. Understanding the underlying issues helps both parties find solutions and maintain a productive relationship.",
      category: 'communication'
    },
    {
      id: 3,
      question: "What should you do if a mentee asks about confidential company information?",
      options: [
        "Share the information if it helps their learning",
        "Politely decline and explain confidentiality boundaries",
        "Share only non-sensitive parts",
        "Ask your manager for permission first"
      ],
      correctAnswer: 1,
      explanation: "Maintaining confidentiality is crucial for professional ethics. Always respect NDAs and company policies while explaining boundaries to mentees.",
      category: 'ethics'
    },
    {
      id: 4,
      question: "How do you structure an effective mentorship session?",
      options: [
        "Let the mentee lead the entire conversation",
        "Prepare an agenda and check in on goals regularly",
        "Focus only on current work problems",
        "Always start with personal topics"
      ],
      correctAnswer: 1,
      explanation: "Structured sessions with clear agendas help maximize time and ensure progress toward mentee goals while remaining flexible for their needs.",
      category: 'knowledge'
    },
    {
      id: 5,
      question: "What is the best way to give constructive feedback?",
      options: [
        "Point out all mistakes at once",
        "Use the 'feedback sandwich' method",
        "Be specific, actionable, and focus on behavior",
        "Wait until the end of the mentorship to give feedback"
      ],
      correctAnswer: 2,
      explanation: "Effective feedback is specific, actionable, and focuses on behaviors rather than personal traits. This helps mentees understand exactly what to improve.",
      category: 'communication'
    }
  ];

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setShowResults(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-success-600', bg: 'bg-success-50' };
    if (score >= 70) return { level: 'Good', color: 'text-primary-600', bg: 'bg-primary-50' };
    if (score >= 60) return { level: 'Fair', color: 'text-warning-600', bg: 'bg-warning-50' };
    return { level: 'Needs Improvement', color: '  -error-600', bg: 'bg-error-50' };
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Become a Mentor Certification
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Complete this assessment to demonstrate your mentorship skills and join our mentor community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-3">
                  <Book className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">5 Questions</h3>
                <p className="text-sm text-gray-600">Covering communication, knowledge, and ethics</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-3">
                  <Clock className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">30 Minutes</h3>
                <p className="text-sm text-gray-600">Take your time to think through each answer</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-3">
                  <Award className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">70% to Pass</h3>
                <p className="text-sm text-gray-600">Achieve certification and start mentoring</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">What you'll be assessed on:</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Communication skills and active listening</li>
                <li>• Professional ethics and boundaries</li>
                <li>• Mentorship best practices and techniques</li>
                <li>• Conflict resolution and feedback delivery</li>
                <li>• Goal setting and progress tracking</li>
              </ul>
            </div>

            <button
              onClick={() => setExamStarted(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Certification Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const scoreLevel = getScoreLevel(score);
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                passed ? 'bg-success-100' : 'bg-error-100'
              }`}>
                {passed ? (
                  <CheckCircle className="h-8 w-8 text-success-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-error-600" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h1>
              <p className="text-lg text-gray-600">
                {passed 
                  ? 'You have successfully passed the mentor certification exam.'
                  : 'You can retake the exam after reviewing the material.'
                }
              </p>
            </div>

            <div className={`rounded-lg p-6 mb-8 ${scoreLevel.bg}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${scoreLevel.color}`}>
                  {Math.round(score)}%
                </div>
                <div className={`text-lg font-semibold ${scoreLevel.color}`}>
                  {scoreLevel.level}
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900">Review Your Answers</h3>
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-success-100' : 'bg-error-100'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-success-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-error-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <div className="space-y-1 mb-3">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded text-sm ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-success-100 text-success-800'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'bg-error-100 text-error-800'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && ' ✓'}
                              {optionIndex === userAnswer && !isCorrect && ' ✗'}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              {passed ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    You are now certified to mentor on MentorConnect!
                  </p>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Review the material and try again when you're ready.
                  </p>
                  <button
                    onClick={() => {
                      setExamStarted(false);
                      setShowResults(false);
                      setCurrentQuestion(0);
                      setSelectedAnswers({});
                      setTimeLeft(30 * 60);
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Retake Exam
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mentor Certification Exam
              </h1>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">Time remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorExamPage;