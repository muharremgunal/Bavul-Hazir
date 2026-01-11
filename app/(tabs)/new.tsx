import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TEMPLATES, TripTemplate } from "../../data/templates";
import { useTripStore } from "../../stores/tripStore";

export default function NewTripScreen() {
  const router = useRouter();
  const { actions } = useTripStore();
  
  const [step, setStep] = useState<"templates" | "customize">("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<TripTemplate | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectTemplate = (template: TripTemplate) => {
    setSelectedTemplate(template);
    const initialSelection = new Set(template.defaultItems.map(i => i.text));
    setSelectedItems(initialSelection);
    setStep("customize");
  };

  const toggleItemSelection = (text: string) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(text)) {
      newSet.delete(text);
    } else {
      newSet.add(text);
    }
    setSelectedItems(newSet);
  };

  const handleSave = () => {
    if (!selectedTemplate) return;
    
    actions.createTripFromTemplate(selectedTemplate, Array.from(selectedItems));
  
    setStep("templates");
    setSelectedTemplate(null);
    setSelectedItems(new Set());
    router.push("/(tabs)/checklist");
  };

  const renderTemplates = () => (
    <View>
      <Text className="text-xl font-bold text-gray-900 mb-4">Nereye gidiyorsun?</Text>
      <View className="flex-row flex-wrap justify-between">
        {TEMPLATES.map((template) => (
          <TouchableOpacity
            key={template.id}
            className="w-[48%] mb-4"
            onPress={() => handleSelectTemplate(template)}
          >
            <Card className="items-center py-6 active:bg-blue-50">
              <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mb-3">
                <Ionicons name={template.icon as any} size={24} color="#2563EB" />
              </View>
              <Text className="font-semibold text-gray-800 text-center">{template.name}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCustomize = () => {
    if (!selectedTemplate) return null;

    const groupedItems: Record<string, typeof selectedTemplate.defaultItems> = {};
    selectedTemplate.defaultItems.forEach(item => {
      if (!groupedItems[item.category]) {
        groupedItems[item.category] = [];
      }
      groupedItems[item.category].push(item);
    });

    return (
      <View className="flex-1">
        <View className="flex-row items-center mb-4">
           <TouchableOpacity onPress={() => setStep("templates")} className="mr-3">
             <Ionicons name="arrow-back" size={24} color="#374151" />
           </TouchableOpacity>
           <Text className="text-xl font-bold text-gray-900">{selectedTemplate.name} Listesi</Text>
        </View>
        
        <Text className="text-gray-500 mb-6">Listene dilediğin eşyaları seçerek başla. Daha sonra ekleme yapabilirsin.</Text>
        
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {Object.entries(groupedItems).map(([category, items]) => (
            <View key={category} className="mb-6">
              <Text className="font-semibold text-gray-700 mb-2 uppercase text-xs tracking-wider">{category}</Text>
              <Card className="p-0 overflow-hidden">
                {items.map((item, index) => (
                  <TouchableOpacity
                    key={item.text}
                    className={`flex-row items-center p-4 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
                    onPress={() => toggleItemSelection(item.text)}
                  >
                    <View className={`w-6 h-6 rounded-full border-2 mr-3 justify-center items-center ${selectedItems.has(item.text) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                      {selectedItems.has(item.text) && <Ionicons name="checkmark" size={16} color="white" />}
                    </View>
                    <Text className="text-gray-800 text-base">{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </Card>
            </View>
          ))}
          <View className="h-24" /> 
        </ScrollView>
        
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 pb-8">
            <Button title={`Listeyi Oluştur (${selectedItems.size} Öğe)`} onPress={handleSave} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4" edges={['top']}>
      {step === "templates" ? (
          <ScrollView showsVerticalScrollIndicator={false}>
              {renderTemplates()}
          </ScrollView>
      ) : (
          renderCustomize()
      )}
    </SafeAreaView>
  );
}
