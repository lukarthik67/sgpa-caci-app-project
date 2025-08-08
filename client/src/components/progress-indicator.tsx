interface ProgressIndicatorProps {
  currentStage: number;
  totalStages: number;
}

export function ProgressIndicator({ currentStage, totalStages }: ProgressIndicatorProps) {
  const progress = (currentStage / totalStages) * 100;
  
  const stageLabels = ['Personal Info', 'Subjects', 'Results', 'Final Score'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">Progress</span>
        <span className="text-sm font-medium text-primary" data-testid="progress-text">
          Step {currentStage} of {totalStages}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
        />
      </div>
      <div className="flex justify-between mt-3 text-xs text-gray-500">
        {stageLabels.map((label, index) => (
          <span key={index} className={index < currentStage ? 'text-primary' : ''}>{label}</span>
        ))}
      </div>
    </div>
  );
}
