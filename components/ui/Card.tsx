import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
