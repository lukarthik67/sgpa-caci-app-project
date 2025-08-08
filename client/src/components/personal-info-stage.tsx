import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { personalInfoSchema, type PersonalInfo } from "@shared/schema";
import { GraduationCap, ArrowRight } from "lucide-react";

interface PersonalInfoStageProps {
  onNext: (data: PersonalInfo) => void;
  initialData?: PersonalInfo;
}

export function PersonalInfoStage({ onNext, initialData }: PersonalInfoStageProps) {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData || {
      name: '',
      gender: 'prefer-not-to-say'
    },
  });

  const handleSubmit = (data: PersonalInfo) => {
    onNext(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-100 text-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get Started!</h2>
        <p className="text-gray-600">Tell us a bit about yourself to personalize your experience</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-md mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    data-testid="input-student-name"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-3"
                    data-testid="radio-gender"
                  >
                    <div className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="male" id="male" />
                      <label htmlFor="male" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">Male</label>
                    </div>
                    <div className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="female" id="female" />
                      <label htmlFor="female" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">Female</label>
                    </div>
                    <div className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="others" id="others" />
                      <label htmlFor="others" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">Others</label>
                    </div>
                    <div className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                      <label htmlFor="prefer-not-to-say" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">Prefer not to say</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            data-testid="button-continue"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
