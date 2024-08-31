export interface Service {
  id: string;
  service_name: string;
  price: number | null;
  duration: number | null;
}

export interface Membership {
  id: string;
  membership_name: string;
  valid_for_days: number | null;
  price: number | null;
}

export interface Selected {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
