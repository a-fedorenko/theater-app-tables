export interface Stage {
  id: string;
  name: string;
  capacity: number;
  type: string; // 'Основна', 'Камерна', 'Експериментальна'
  equipment: string[];
  status: string; // 'Доступна', 'Зайнята', 'На ремонті'
  description?: string;
  dimensions?: {
    width: number;
    depth: number;
    height: number;
  };
  technicalFeatures?: string[];
  lastMaintenance?: string;
  nextMaintenance?: string;
  manager?: string;
  photoUrl?: string;
}
