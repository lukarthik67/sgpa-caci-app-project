import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ArrowLeft, RotateCcw } from "lucide-react";
import { getMotivationMessage } from "@/lib/sgpa-utils";
import type { PersonalInfo, SubjectResult } from "@shared/schema";

interface FinalResultsStageProps {
  personalInfo: PersonalInfo;
  subjects: SubjectResult[];
  totalCredits: number;
  totalEarnedCredits: number;
  sgpa: number;
  onBack: () => void;
  onStartOver: () => void;
}

export function FinalResultsStage({ 
  personalInfo, 
  subjects, 
  totalCredits, 
  totalEarnedCredits, 
  sgpa, 
  onBack, 
  onStartOver 
}: FinalResultsStageProps) {
  const motivation = getMotivationMessage(sgpa);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="text-center mb-8">
        <div className="bg-green-100 text-secondary p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
        <p className="text-gray-600">Here are your final academic results</p>
      </div>

      {/* SGPA Display */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 mb-8 text-center">
        <h3 className="text-lg font-medium mb-2">Your SGPA</h3>
        <div className="text-5xl font-bold mb-4" data-testid="text-final-sgpa">
          {sgpa.toFixed(2)}
        </div>
        <p className="text-blue-100">Semester Grade Point Average</p>
      </div>

      {/* Student Info Summary */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Academic Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Student:</span>
              <span className="font-medium ml-2" data-testid="text-summary-name">
                {personalInfo.name}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Subjects:</span>
              <span className="font-medium ml-2" data-testid="text-summary-subjects">
                {subjects.length}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Credits:</span>
              <span className="font-medium ml-2" data-testid="text-summary-credits">
                {totalCredits}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Grade Points Earned:</span>
              <span className="font-medium ml-2" data-testid="text-summary-points">
                {totalEarnedCredits}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <div className={`border-l-4 ${motivation.borderColor} ${motivation.bgColor} p-6 rounded-r-xl mb-8`} data-testid="motivation-card">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 text-2xl" data-testid="text-motivation-emoji">
            {motivation.emoji}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-motivation-title">
              {motivation.title}
            </h4>
            <p className="text-gray-700" data-testid="text-motivation-message">
              {motivation.message}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={onBack}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
          data-testid="button-back-to-results"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Results</span>
        </Button>
        <Button 
          onClick={onStartOver}
          className="flex-1 bg-secondary text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          data-testid="button-calculate-again"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Calculate Again</span>
        </Button>
      </div>
    </div>
  );
}
