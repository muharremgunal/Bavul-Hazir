import { View, ViewProps } from "react-native";

interface ProgressBarProps extends ViewProps {
  progress: number;
  className?: string;
  color?: string;
}

export function ProgressBar({ progress, className, color = "bg-blue-600", ...props }: ProgressBarProps) {
  const percentage = Math.min(Math.max(progress, 0), 1) * 100;
  
  return (
    <View className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`} {...props}>
      <View 
        className={`h-full ${color} rounded-full`} 
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}
