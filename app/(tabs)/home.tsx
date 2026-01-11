import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Trip, useTripStore } from "../../stores/tripStore";

export default function HomeScreen() {
  const router = useRouter();
  const { trips, actions, activeTripId } = useTripStore();

  const handleTripPress = (tripId: string) => {
    actions.setActiveTrip(tripId);
    router.push("/(tabs)/checklist");
  };

  const renderTrip = ({ item }: { item: Trip }) => {
    const total = item.items.length;
    const completed = item.items.filter((i) => i.isChecked).length;
    const progress = total === 0 ? 0 : completed / total;
    const isActive = activeTripId === item.id;

    return (
      <TouchableOpacity onPress={() => handleTripPress(item.id)}>
        <Card className={`mb-4 border-l-4 ${isActive ? 'border-l-blue-600' : 'border-l-transparent'}`}>
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center gap-2">
                <Ionicons name={item.icon as any || "briefcase-outline"} size={24} color="#2563EB" />
                <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => actions.deleteTrip(item.id)} className="p-2">
                 <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <View className="mb-2">
             <Text className="text-sm text-gray-500 mb-1">{completed}/{total} tamamlandı</Text>
             <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-blue-500" style={{ width: `${progress * 100}%` }} />
             </View>
          </View>
          
          {isActive && (
             <Text className="text-xs text-blue-600 font-medium">Aktif Seyahat</Text>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4" edges={['top']}>
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-900">Seyahatlerim</Text>
      </View>

      {trips.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="airplane-outline" size={64} color="#D1D5DB" />
          <Text className="text-gray-500 mt-4 text-center px-8">
            Henüz bir seyahat planlamadınız. Yeni bir tane ekleyerek başlayın.
          </Text>
          <Button
            title="Şimdi Oluştur"
            className="mt-6"
            onPress={() => router.push("/(tabs)/new")}
          />
        </View>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderTrip}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
