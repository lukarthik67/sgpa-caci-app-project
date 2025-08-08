import type { Subject, SubjectResult } from "@shared/schema";

export function calculateGradePoints(marks: number): { points: number; grade: string } {
  if (marks >= 90) return { points: 10, grade: 'O' };
  else if (marks >= 80) return { points: 9, grade: 'A+' };
  else if (marks >= 70) return { points: 8, grade: 'A' };
  else if (marks >= 60) return { points: 7, grade: 'B+' };
  else if (marks >= 50) return { points: 6, grade: 'B' };
  else if (marks >= 40) return { points: 5, grade: 'C' };
  else if (marks >= 30) return { points: 4, grade: 'D' };
  else if (marks >= 20) return { points: 3, grade: 'E' };
  else if (marks >= 10) return { points: 2, grade: 'F' };
  else return { points: 1, grade: 'F' };
}

export function calculateSGPA(subjects: Subject[]): {
  subjectResults: SubjectResult[];
  totalCredits: number;
  totalEarnedCredits: number;
  sgpa: number;
} {
  const subjectResults: SubjectResult[] = subjects.map(subject => {
    const { points, grade } = calculateGradePoints(subject.marks);
    const earnedCredits = points * subject.credits;
    
    return {
      ...subject,
      gradePoints: points,
      grade,
      earnedCredits
    };
  });

  const totalCredits = subjectResults.reduce((sum, subject) => sum + subject.credits, 0);
  const totalEarnedCredits = subjectResults.reduce((sum, subject) => sum + subject.earnedCredits, 0);
  const sgpa = totalCredits > 0 ? totalEarnedCredits / totalCredits : 0;

  return {
    subjectResults,
    totalCredits,
    totalEarnedCredits,
    sgpa
  };
}

export interface MotivationMessage {
  emoji: string;
  title: string;
  message: string;
  borderColor: string;
  bgColor: string;
}

export function getMotivationMessage(sgpa: number): MotivationMessage {
  if (sgpa >= 9.5) {
    return {
      emoji: '🌟',
      title: 'Outstanding!',
      message: "You're on the path to excellence. Keep pushing boundaries — you're among the top achievers! 🚀",
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-50'
    };
  } else if (sgpa >= 9.0) {
    return {
      emoji: '💪',
      title: 'Great Job!',
      message: "You've built a strong academic foundation. Stay consistent, and you'll soon be a topper! ✨",
      borderColor: 'border-green-400',
      bgColor: 'bg-green-50'
    };
  } else if (sgpa >= 8.5) {
    return {
      emoji: '🔥',
      title: 'Very Good!',
      message: "Solid performance! With just a bit more effort, you'll break into the top tier. Keep going! 📈",
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-50'
    };
  } else if (sgpa >= 8.0) {
    return {
      emoji: '🧠',
      title: 'Good Work!',
      message: "You're doing well — a little more focus and discipline can take you far. Stay steady and aim high! 🎯",
      borderColor: 'border-indigo-400',
      bgColor: 'bg-indigo-50'
    };
  } else if (sgpa >= 7.0) {
    return {
      emoji: '📘',
      title: 'Fair Performance',
      message: "You've got the potential — now it's time to sharpen your focus and aim higher. You can do it! 💡",
      borderColor: 'border-purple-400',
      bgColor: 'bg-purple-50'
    };
  } else if (sgpa >= 6.0) {
    return {
      emoji: '🌱',
      title: 'Needs Improvement',
      message: "Don't lose hope — this is your chance to bounce back stronger. Start fresh, aim higher! 💥",
      borderColor: 'border-orange-400',
      bgColor: 'bg-orange-50'
    };
  } else {
    return {
      emoji: '❤️',
      title: "Don't Give Up",
      message: "Numbers don't define you. Learn from mistakes, rise with determination, and rewrite your story! 🔁",
      borderColor: 'border-red-400',
      bgColor: 'bg-red-50'
    };
  }
}
