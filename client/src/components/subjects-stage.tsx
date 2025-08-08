import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Book, ArrowLeft, Calculator } from "lucide-react";
import { z } from "zod";
import type { Subject } from "@shared/schema";

const subjectsFormSchema = z.object({
  numSubjects: z.number().min(1, "At least 1 subject required").max(15, "Maximum 15 subjects allowed"),
  subjects: z.array(z.object({
    name: z.string().min(1, "Subject name is required"),
    marks: z.number().min(0, "Marks must be at least 0").max(100, "Marks cannot exceed 100"),
    credits: z.number().min(1, "Credits must be at least 1").max(10, "Credits cannot exceed 10")
  }))
});

type SubjectsFormData = z.infer<typeof subjectsFormSchema>;

interface SubjectsStageProps {
  onNext: (subjects: Subject[]) => void;
  onBack: () => void;
  initialData?: Subject[];
}

export function SubjectsStage({ onNext, onBack, initialData }: SubjectsStageProps) {
  const [showSubjects, setShowSubjects] = useState(Boolean(initialData?.length));
  
  const form = useForm<SubjectsFormData>({
    resolver: zodResolver(subjectsFormSchema),
    defaultValues: {
      numSubjects: initialData?.length || 1,
      subjects: initialData || []
    },
  });

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "subjects"
  });

  const handleGenerateFields = () => {
    const numSubjects = form.getValues("numSubjects");
    if (numSubjects < 1 || numSubjects > 15) {
      form.setError("numSubjects", { message: "Please enter a valid number of subjects (1-15)" });
      return;
    }
    
    const newSubjects = Array(numSubjects).fill(null).map(() => ({
      name: '',
      marks: 0,
      credits: 1
    }));
    
    replace(newSubjects);
    setShowSubjects(true);
  };

  const handleSubmit = (data: SubjectsFormData) => {
    onNext(data.subjects);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="text-center mb-8">
        <div className="bg-green-100 text-secondary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Book className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subject Details</h2>
        <p className="text-gray-600">Enter your subjects and their respective marks & credits</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {!showSubjects && (
            <div className="max-w-md mx-auto">
              <FormField
                control={form.control}
                name="numSubjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Subjects</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="15"
                        placeholder="Enter number of subjects"
                        data-testid="input-num-subjects"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button" 
                onClick={handleGenerateFields}
                className="w-full mt-4 bg-secondary text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
                data-testid="button-generate-fields"
              >
                Generate Subject Fields
              </Button>
            </div>
          )}

          {showSubjects && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Enter Subject Details</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full" data-testid="subjects-progress">
                  {fields.filter((_, index) => {
                    const subject = form.watch(`subjects.${index}`);
                    return subject.name && subject.marks >= 0 && subject.credits > 0;
                  }).length} of {fields.length} completed
                </span>
              </div>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Subject {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`subjects.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Mathematics"
                                data-testid={`input-subject-name-${index}`}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`subjects.${index}.marks`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marks Obtained</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="100"
                                placeholder="0-100"
                                data-testid={`input-subject-marks-${index}`}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`subjects.${index}.credits`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credits</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="10"
                                placeholder="1-10"
                                data-testid={`input-subject-credits-${index}`}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="button" 
                  onClick={onBack}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  data-testid="button-calculate"
                >
                  <span>Calculate SGPA</span>
                  <Calculator className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
