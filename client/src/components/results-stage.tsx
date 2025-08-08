import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowLeft, ArrowRight } from "lucide-react";
import type { SubjectResult } from "@shared/schema";

interface ResultsStageProps {
  subjects: SubjectResult[];
  totalCredits: number;
  totalEarnedCredits: number;
  onNext: () => void;
  onBack: () => void;
}

export function ResultsStage({ subjects, totalCredits, totalEarnedCredits, onNext, onBack }: ResultsStageProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="text-center mb-8">
        <div className="bg-amber-100 text-accent p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subject-wise Breakdown</h2>
        <p className="text-gray-600">Here's your detailed performance analysis</p>
      </div>

      <div className="overflow-x-auto mb-8">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Subject</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Marks</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Credits</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Grade Points</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject, index) => (
              <TableRow key={index} className="hover:bg-gray-50" data-testid={`row-subject-${index}`}>
                <TableCell className="font-medium" data-testid={`text-subject-name-${index}`}>
                  {subject.name}
                </TableCell>
                <TableCell className="text-center" data-testid={`text-subject-marks-${index}`}>
                  {subject.marks}
                </TableCell>
                <TableCell className="text-center" data-testid={`text-subject-credits-${index}`}>
                  {subject.credits}
                </TableCell>
                <TableCell className="text-center font-semibold text-primary" data-testid={`text-subject-points-${index}`}>
                  {subject.gradePoints}
                </TableCell>
                <TableCell className="text-center" data-testid={`text-subject-grade-${index}`}>
                  <Badge className="bg-primary text-white">
                    {subject.grade}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-blue-50 font-semibold">
              <TableCell>TOTAL</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center" data-testid="text-total-credits">
                {totalCredits}
              </TableCell>
              <TableCell className="text-center" data-testid="text-total-earned-credits">
                {totalEarnedCredits}
              </TableCell>
              <TableCell className="text-center">-</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={onBack}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          data-testid="button-view-results"
        >
          <span>View Final Results</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
