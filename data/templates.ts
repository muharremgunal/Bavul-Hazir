export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  isChecked: boolean;
  qty: number;
}

export interface TripTemplate {
  id: string;
  name: string;
  icon: string;
  defaultItems: Omit<ChecklistItem, "id" | "isChecked" | "qty">[];
}

export const CATEGORIES = [
  "Belgeler",
  "Kıyafet",
  "Hijyen",
  "Elektronik",
  "İlaç/Acil",
  "Diğer",
];

const commonItems = [
  { text: "Kimlik / Pasaport", category: "Belgeler" },
  { text: "Cüzdan / Para", category: "Belgeler" },
  { text: "Telefon Şarjı", category: "Elektronik" },
  { text: "Diş Fırçası & Macun", category: "Hijyen" },
];

export const TEMPLATES: TripTemplate[] = [
  {
    id: "beach",
    name: "Deniz Tatili",
    icon: "sunny-outline",
    defaultItems: [
      ...commonItems,
      { text: "Mayo / Bikini", category: "Kıyafet" },
      { text: "Güneş Kremi", category: "Hijyen" },
      { text: "Plaj Havlusu", category: "Diğer" },
      { text: "Terlik", category: "Kıyafet" },
      { text: "Şapka / Gözlük", category: "Kıyafet" },
    ],
  },
  {
    id: "business",
    name: "İş Seyahati",
    icon: "briefcase-outline",
    defaultItems: [
      ...commonItems,
      { text: "Laptop & Şarjı", category: "Elektronik" },
      { text: "Gömlek / Takım", category: "Kıyafet" },
      { text: "Not Defteri", category: "Diğer" },
      { text: "Kartvizitler", category: "Belgeler" },
    ],
  },
  {
    id: "winter",
    name: "Kış Tatili",
    icon: "snow-outline",
    defaultItems: [
      ...commonItems,
      { text: "Mont / Kaban", category: "Kıyafet" },
      { text: "Bot", category: "Kıyafet" },
      { text: "Eldiven / Atkı", category: "Kıyafet" },
      { text: "Nemlendirici", category: "Hijyen" },
    ],
  },
  {
    id: "camping",
    name: "Kamp",
    icon: "bonfire-outline",
    defaultItems: [
      ...commonItems,
      { text: "Çadır", category: "Diğer" },
      { text: "Uyku Tulumu", category: "Diğer" },
      { text: "Fener / Kafa Lambası", category: "Elektronik" },
      { text: "Sinek Kovucu", category: "Hijyen" },
      { text: "Mat", category: "Diğer" },
    ],
  },
  {
    id: "baby",
    name: "Bebekle Seyahat",
    icon: "happy-outline",
    defaultItems: [
      ...commonItems,
      { text: "Bebek Bezi", category: "Hijyen" },
      { text: "Mama / Biberon", category: "Diğer" },
      { text: "Yedek Kıyafet", category: "Kıyafet" },
      { text: "Puset", category: "Diğer" },
      { text: "Islak Mendil", category: "Hijyen" },
    ],
  },
  {
    id: "abroad",
    name: "Yurt Dışı / Şehir",
    icon: "airplane-outline",
    defaultItems: [
      ...commonItems,
      { text: "Vize Evrakları", category: "Belgeler" },
      { text: "Seyahat Sigortası", category: "Belgeler" },
      { text: "Priz Dönüştürücü", category: "Elektronik" },
      { text: "Rahat Ayakkabı", category: "Kıyafet" },
    ],
  },
  {
    id: "umrah",
    name: "Umre / Hac",
    icon: "moon-outline",
    defaultItems: [
      ...commonItems,
      { text: "İhram", category: "Kıyafet" },
      { text: "Seccade", category: "Diğer" },
      { text: "Tesbih", category: "Diğer" },
      { text: "Kokusuz Sabun", category: "Hijyen" },
      { text: "Terlik (Rahat)", category: "Kıyafet" },
    ],
  },
];
