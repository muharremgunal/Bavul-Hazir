import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChecklistItem, TripTemplate } from "../data/templates";

export interface Trip extends TripTemplate {
  startDate?: string;
  items: ChecklistItem[];
}

interface TripState {
  trips: Trip[];
  activeTripId: string | null;
  actions: {
    createTripFromTemplate: (template: TripTemplate, selectedItems: string[]) => void;
    setActiveTrip: (id: string) => void;
    deleteTrip: (id: string) => void;
    addItem: (text: string, category: string, qty?: number) => void;
    toggleItem: (itemId: string) => void;
    updateQty: (itemId: string, qty: number) => void;
    deleteItem: (itemId: string) => void;
  };
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trips: [],
      activeTripId: null,
      actions: {
        createTripFromTemplate: (template, selectedItems) => {
          const newTrip: Trip = {
            ...template,
            id: generateId(),
            items: template.defaultItems
              .filter((item) => selectedItems.includes(item.text))
              .map((item) => ({
                ...item,
                id: generateId(),
                isChecked: false,
                qty: 1,
              })),
          };
          set((state) => ({
            trips: [...state.trips, newTrip],
            activeTripId: newTrip.id,
          }));
        },
        setActiveTrip: (id) => set({ activeTripId: id }),
        deleteTrip: (id) =>
            set((state) => ({
                trips: state.trips.filter((t) => t.id !== id),
                activeTripId: state.activeTripId === id ? null : state.activeTripId,
            })),
        addItem: (text, category, qty = 1) => {
          set((state) => {
            const activeTrip = state.trips.find((t) => t.id === state.activeTripId);
            if (!activeTrip) return state;

            const newItem: ChecklistItem = {
              id: generateId(),
              text,
              category,
              isChecked: false,
              qty,
            };

            const updatedTrips = state.trips.map((t) =>
              t.id === state.activeTripId ? { ...t, items: [...t.items, newItem] } : t
            );

            return { trips: updatedTrips };
          });
        },
        toggleItem: (itemId) => {
          set((state) => {
            const updatedTrips = state.trips.map((t) =>
              t.id === state.activeTripId
                ? {
                    ...t,
                    items: t.items.map((i) =>
                      i.id === itemId ? { ...i, isChecked: !i.isChecked } : i
                    ),
                  }
                : t
            );
            return { trips: updatedTrips };
          });
        },
        updateQty: (itemId, qty) => {
             set((state) => {
                const updatedTrips = state.trips.map((t) =>
                  t.id === state.activeTripId
                    ? {
                        ...t,
                        items: t.items.map((i) =>
                          i.id === itemId ? { ...i, qty: Math.max(1, qty) } : i
                        ),
                      }
                    : t
                );
                return { trips: updatedTrips };
              });
        },
        deleteItem: (itemId) => {
             set((state) => {
                const updatedTrips = state.trips.map((t) =>
                  t.id === state.activeTripId
                    ? {
                        ...t,
                        items: t.items.filter((i) => i.id !== itemId),
                      }
                    : t
                );
                return { trips: updatedTrips };
              });
        },
      },
    }),
    {
      name: "trip-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export { ChecklistItem };

