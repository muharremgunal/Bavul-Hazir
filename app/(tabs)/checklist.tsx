import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, SectionList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { CATEGORIES } from "../../data/templates";
import { ChecklistItem, useTripStore } from "../../stores/tripStore";

export default function ChecklistScreen() {
  const router = useRouter();
  const { trips, activeTripId, actions } = useTripStore();
  const activeTrip = trips.find((t) => t.id === activeTripId);

  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Diğer");
  const [isAdding, setIsAdding] = useState(false);

  if (!activeTrip) {
    return (
      <View className="flex-1 items-center justify-center p-6 bg-gray-50">
        <Ionicons name="documents-outline" size={64} color="#D1D5DB" />
        <Text className="text-gray-500 mt-4 text-center text-lg">Aktif bir seyahat listesi seçili değil.</Text>
        <Button 
            title="Listelerime Git" 
            variant="outline"
            className="mt-6"
            onPress={() => router.push("/(tabs)/home")} 
        />
      </View>
    );
  }

  const totalItems = activeTrip.items.length;
  const completedItems = activeTrip.items.filter((i) => i.isChecked).length;
  const progress = totalItems > 0 ? completedItems / totalItems : 0;
  const sections = Object.values(
    activeTrip.items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { title: item.category, data: [] };
      }
      acc[item.category].data.push(item);
      return acc;
    }, {} as Record<string, { title: string; data: ChecklistItem[] }>)
  ).sort((a, b) => a.title.localeCompare(b.title));

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    actions.addItem(newItemName, newItemCategory, 1);
    setNewItemName("");
    setIsAdding(false);
  };

  const renderItem = ({ item }: { item: ChecklistItem }) => (
    <View className="flex-row items-center bg-white p-3 border-b border-gray-50">
      <TouchableOpacity onPress={() => actions.toggleItem(item.id)} className="mr-3">
         <View className={`w-6 h-6 rounded border-2 justify-center items-center ${item.isChecked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
            {item.isChecked && <Ionicons name="checkmark" size={16} color="white" />}
         </View>
      </TouchableOpacity>
      
      <View className="flex-1">
        <Text className={`text-base ${item.isChecked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {item.text}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
         {item.qty > 1 && <Text className="text-xs text-gray-500 font-bold">x{item.qty}</Text>}
         
         <TouchableOpacity onPress={() => actions.updateQty(item.id, item.qty + 1)} className="p-1">
             <Ionicons name="add-circle-outline" size={20} color="#9CA3AF" />
         </TouchableOpacity>
         
         <TouchableOpacity onPress={() => actions.deleteItem(item.id)} className="p-1">
             <Ionicons name="trash-outline" size={18} color="#EF4444" />
         </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="px-4 py-3 bg-white border-b border-gray-100">
        <Text className="text-lg font-bold text-gray-900 mb-2">{activeTrip.name}</Text>
        <ProgressBar progress={progress} className="h-2" />
        <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-gray-500 font-medium">%{(progress * 100).toFixed(0)} Tamamlandı</Text>
            <Text className="text-xs text-gray-500 font-medium">{completedItems}/{totalItems}</Text>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View className="px-4 py-2 bg-gray-100">
            <Text className="text-xs font-bold text-gray-600 uppercase tracking-wider">{title}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        stickySectionHeadersEnabled={true}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200"
      >
        {isAdding ? (
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="font-bold text-gray-700">Yeni Eşya Ekle</Text>
                    <TouchableOpacity onPress={() => setIsAdding(false)}>
                        <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                </View>
                
                <Input 
                    placeholder="Eşya adı..." 
                    value={newItemName} 
                    onChangeText={setNewItemName} 
                    autoFocus 
                    className="mb-3"
                    onSubmitEditing={handleAddItem}
                />
                
                <View className="mb-3">
                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity 
                                key={cat} 
                                onPress={() => setNewItemCategory(cat)}
                                className={`px-3 py-1 mr-2 rounded-full border ${newItemCategory === cat ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
                            >
                                <Text className={`text-xs ${newItemCategory === cat ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                     </ScrollView>
                </View>

                <Button title="Ekle" onPress={handleAddItem} />
            </View>
        ) : (
             <TouchableOpacity 
                activeOpacity={0.9} 
                className="p-4"
                onPress={() => setIsAdding(true)}
            >
                <View className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-row items-center">
                    <Ionicons name="add" size={20} color="#6B7280" />
                    <Text className="text-gray-500 ml-2">Hızlı eşya ekle...</Text>
                </View>
            </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
