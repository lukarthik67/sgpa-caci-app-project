import { useState } from "react";
import { ProgressIndicator } from "./progress-indicator";
import { PersonalInfoStage } from "./personal-info-stage";
import { SubjectsStage } from "./subjects-stage";
import { ResultsStage } from "./results-stage";
import { FinalResultsStage } from "./final-results-stage";
import { calculateSGPA } from "@/lib/sgpa-utils";
import type { PersonalInfo, Subject, SubjectResult } from "@shared/schema";

export function SGPACalculator() {
  const [currentStage, setCurrentStage] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [results, setResults] = useState<{
    subjectResults: SubjectResult[];
    totalCredits: number;
    totalEarnedCredits: number;
    sgpa: number;
  } | null>(null);

  const handlePersonalInfoNext = (data: PersonalInfo) => {
    setPersonalInfo(data);
    setCurrentStage(2);
  };

  const handleSubjectsNext = (subjectsData: Subject[]) => {
    setSubjects(subjectsData);
    const calculatedResults = calculateSGPA(subjectsData);
    setResults(calculatedResults);
    setCurrentStage(3);
  };

  const handleResultsNext = () => {
    setCurrentStage(4);
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStage(1);
    setPersonalInfo(null);
    setSubjects([]);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-white p-2 rounded-lg">
              <i className="fas fa-graduation-cap text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SGPA Calculator</h1>
              <p className="text-sm text-gray-600">Track your academic performance with ease</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ProgressIndicator currentStage={currentStage} totalStages={4} />
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-8">
        {currentStage === 1 && (
          <PersonalInfoStage 
            onNext={handlePersonalInfoNext}
            initialData={personalInfo || undefined}
          />
        )}

        {currentStage === 2 && (
          <SubjectsStage 
            onNext={handleSubjectsNext}
            onBack={handleBack}
            initialData={subjects.length > 0 ? subjects : undefined}
          />
        )}

        {currentStage === 3 && results && (
          <ResultsStage 
            subjects={results.subjectResults}
            totalCredits={results.totalCredits}
            totalEarnedCredits={results.totalEarnedCredits}
            onNext={handleResultsNext}
            onBack={handleBack}
          />
        )}

        {currentStage === 4 && results && personalInfo && (
          <FinalResultsStage 
            personalInfo={personalInfo}
            subjects={results.subjectResults}
            totalCredits={results.totalCredits}
            totalEarnedCredits={results.totalEarnedCredits}
            sgpa={results.sgpa}
            onBack={handleBack}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}
