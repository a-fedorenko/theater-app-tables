export interface Performance {
  id: number;
  performanceId?: string;
  title: string;
  genre: string;
  director?: string;
  duration: number;
  description: string;
  premiere_date: string;
  ageRestriction?: string;
  photoUrl?: string;
  actors?: { id: string; name: string; photoUrl: string }[];
}

export interface Actor {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  biography: string;
  contactInfo?: string;
  hireDate?: string;
  salary?: number;
  portfolio?: string;
  awards?: string;
  specialty?: string;
  performances?: string[];
  performanceIds?: string[];
  photoUrl?: string;
}

export interface Role {
  id: number;
  performance_id: number;
  actor_id: number;
  role_name: string;
}

export interface Schedule {
  id: number;
  scheduleId?: string;
  performance_id: number;
  performanceId?: string;
  date: string;
  scheduledDate?: string;
  time: string;
  scene: string;
  available_seats: number;
}

export interface Show {
  id: number;
  showId?: string;
  schedule_id: number;
  scheduleId?: string;
  performanceId?: string;
  tickets_sold: number;
  revenue: number;
  status: string;
  startTime?: string;
}

export interface Rehearsal {
  id: number;
  rehearsalId?: string;
  performance_id: number;
  performanceId?: string;
  date: string;
  time: string;
  scene: string;
  notes: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}
