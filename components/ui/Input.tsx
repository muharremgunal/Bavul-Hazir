import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({ label, error, className, containerClassName, ...props }: InputProps) {
  return (
    <View className={`w-full ${containerClassName}`}>
      {label && <Text className="text-gray-700 font-medium mb-1">{label}</Text>}
      <TextInput
        className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-blue-500 ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
