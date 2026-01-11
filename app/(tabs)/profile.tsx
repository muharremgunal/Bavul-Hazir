import { Ionicons } from "@expo/vector-icons";
import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/ui/Card";

export default function ProfileScreen() {
  const settings = [
    { id: "1", title: "Bildirimler", icon: "notifications-outline", type: "switch", value: true },
    { id: "2", title: "Karanlık Mod", icon: "moon-outline", type: "switch", value: false },
    { id: "3", title: "Dil", icon: "language-outline", type: "text", value: "Türkçe" },
    { id: "4", title: "Yardım & Destek", icon: "help-circle-outline", type: "link" },
    { id: "5", title: "Çıkış Yap", icon: "log-out-outline", type: "button", color: "red" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4" edges={['top']}>
      <View className="items-center mb-8 mt-4">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#2563EB" />
        </View>
        <Text className="text-xl font-bold text-gray-900">Misafir Kullanıcı</Text>
        <Text className="text-gray-500">Bavul Hazır v1.0.0</Text>
      </View>

      <Card className="p-0 overflow-hidden">
        {settings.map((item, index) => (
             <View 
                key={item.id} 
                className={`flex-row items-center justify-between p-4 ${index !== settings.length - 1 ? 'border-b border-gray-100' : ''}`}
             >
                <View className="flex-row items-center gap-3">
                    <Ionicons name={item.icon as any} size={22} color={item.color === "red" ? "#EF4444" : "#4B5563"} />
                    <Text className={`text-base font-medium ${item.color === "red" ? "text-red-500" : "text-gray-800"}`}>
                        {item.title}
                    </Text>
                </View>

                {item.type === "switch" && (
                    <Switch value={item.value as boolean} trackColor={{ false: "#D1D5DB", true: "#2563EB" }} />
                )}
                {item.type === "text" && (
                    <Text className="text-gray-500">{item.value as string}</Text>
                )}
                {(item.type === "link" || item.type === "button") && (
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                )}
             </View>
        ))}
      </Card>
      
      <View className="mt-8 px-4">
        <Text className="text-center text-gray-400 text-xs">
            Uygulama henüz geliştirme aşamasındadır.
        </Text>
      </View>
    </SafeAreaView>
  );
}
