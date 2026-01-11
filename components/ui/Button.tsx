import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({ title, variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const baseStyles = "items-center justify-center rounded-lg active:opacity-80";
  
  const variants = {
    primary: "bg-blue-600",
    secondary: "bg-gray-200",
    outline: "border border-blue-600 bg-transparent",
    danger: "bg-red-500",
  };

  const textVariants = {
    primary: "text-white font-semibold",
    secondary: "text-gray-800 font-medium",
    outline: "text-blue-600 font-medium",
    danger: "text-white font-medium",
  };

  const sizes = {
    sm: "px-3 py-1.5",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <Text className={`text-center ${textVariants[variant] || "text-white"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
