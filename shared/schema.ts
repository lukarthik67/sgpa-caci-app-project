import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  gender: z.enum(["male", "female", "others", "prefer-not-to-say"])
});

export const subjectSchema = z.object({
  name: z.string().min(1, "Subject name is required").max(100, "Subject name is too long"),
  marks: z.number().min(0, "Marks must be at least 0").max(100, "Marks cannot exceed 100"),
  credits: z.number().min(1, "Credits must be at least 1").max(10, "Credits cannot exceed 10")
});

export const calculationSchema = z.object({
  personalInfo: personalInfoSchema,
  subjects: z.array(subjectSchema).min(1, "At least one subject is required").max(15, "Maximum 15 subjects allowed")
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Subject = z.infer<typeof subjectSchema>;
export type CalculationData = z.infer<typeof calculationSchema>;

export interface SubjectResult extends Subject {
  gradePoints: number;
  grade: string;
  earnedCredits: number;
}

export interface SGPAResult {
  personalInfo: PersonalInfo;
  subjects: SubjectResult[];
  totalCredits: number;
  totalEarnedCredits: number;
  sgpa: number;
}
