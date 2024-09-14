export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          business_id: string
          client_id: string
          created_at: string
          id: string
          notes: string | null
          payment_id: string | null
          price_paid: number
          ref: string
          scheduled_date: string
          services_id: string | null
          status: string | null
          team_member_id: string | null
        }
        Insert: {
          business_id: string
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          price_paid?: number
          ref?: string
          scheduled_date: string
          services_id?: string | null
          status?: string | null
          team_member_id?: string | null
        }
        Update: {
          business_id?: string
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          price_paid?: number
          ref?: string
          scheduled_date?: string
          services_id?: string | null
          status?: string | null
          team_member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_services_id_fkey"
            columns: ["services_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      business: {
        Row: {
          address: string
          cordinates: number[] | null
          created_at: string
          currency: string
          id: string
          images: string[] | null
          name: string
          owner_id: string
          published: boolean
          status: string
          tap_destination_id: string | null
          website: string | null
          working_hours: Json
        }
        Insert: {
          address: string
          cordinates?: number[] | null
          created_at?: string
          currency?: string
          id?: string
          images?: string[] | null
          name: string
          owner_id?: string
          published?: boolean
          status?: string
          tap_destination_id?: string | null
          website?: string | null
          working_hours?: Json
        }
        Update: {
          address?: string
          cordinates?: number[] | null
          created_at?: string
          currency?: string
          id?: string
          images?: string[] | null
          name?: string
          owner_id?: string
          published?: boolean
          status?: string
          tap_destination_id?: string | null
          website?: string | null
          working_hours?: Json
        }
        Relationships: [
          {
            foreignKeyName: "business_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          avatar_url: string | null
          business_id: string
          color: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          job_title: string | null
          last_name: string
          phone: number | null
        }
        Insert: {
          avatar_url?: string | null
          business_id: string
          color?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          job_title?: string | null
          last_name: string
          phone?: number | null
        }
        Update: {
          avatar_url?: string | null
          business_id?: string
          color?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          job_title?: string | null
          last_name?: string
          phone?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          business_id: string
          client_id: string
          created_at: string
          id: string
          memberships_catalog_id: string | null
          notes: string | null
          payment_id: string | null
          price_paid: number
          ref: string
        }
        Insert: {
          business_id: string
          client_id?: string
          created_at?: string
          id?: string
          memberships_catalog_id?: string | null
          notes?: string | null
          payment_id?: string | null
          price_paid?: number
          ref?: string
        }
        Update: {
          business_id?: string
          client_id?: string
          created_at?: string
          id?: string
          memberships_catalog_id?: string | null
          notes?: string | null
          payment_id?: string | null
          price_paid?: number
          ref?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_business_id_fkey1"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_memberships_catalog_id_fkey"
            columns: ["memberships_catalog_id"]
            isOneToOne: false
            referencedRelation: "memberships_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships_catalog: {
        Row: {
          business_id: string | null
          created_at: string
          description: string | null
          id: string
          is_unlimited_sessions: boolean
          membership_name: string
          number_of_sessions: number | null
          price: number
          terms: string | null
          valid_for_days: number
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_unlimited_sessions: boolean
          membership_name: string
          number_of_sessions?: number | null
          price: number
          terms?: string | null
          valid_for_days: number
        }
        Update: {
          business_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_unlimited_sessions?: boolean
          membership_name?: string
          number_of_sessions?: number | null
          price?: number
          terms?: string | null
          valid_for_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "memberships_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships_catalog_services: {
        Row: {
          id: number
          memberships_id: string | null
          services_id: string | null
        }
        Insert: {
          id?: number
          memberships_id?: string | null
          services_id?: string | null
        }
        Update: {
          id?: number
          memberships_id?: string | null
          services_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memberships_services_memberships_id_fkey"
            columns: ["memberships_id"]
            isOneToOne: false
            referencedRelation: "memberships_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_services_services_id_fkey"
            columns: ["services_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          business_id: string | null
          charge_id: string | null
          client_id: string | null
          created_at: string
          discount_id: string | null
          id: string
          status: string
        }
        Insert: {
          amount: number
          business_id?: string | null
          charge_id?: string | null
          client_id?: string | null
          created_at?: string
          discount_id?: string | null
          id?: string
          status?: string
        }
        Update: {
          amount?: number
          business_id?: string | null
          charge_id?: string | null
          client_id?: string | null
          created_at?: string
          discount_id?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "service_discounts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          isCompleted: boolean
          last_name: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          isCompleted?: boolean
          last_name: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          isCompleted?: boolean
          last_name?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          appointment_id: string | null
          business_id: string | null
          comment: string | null
          created_at: string
          id: string
          rating: number
        }
        Insert: {
          appointment_id?: string | null
          business_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
        }
        Update: {
          appointment_id?: string | null
          business_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      service_category: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          id: string
          owner_id: string
          title: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          id?: string
          owner_id?: string
          title: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          id?: string
          owner_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_category_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_category_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_discounts: {
        Row: {
          business_id: string
          created_at: string
          discount_code: string
          discount_value: number
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          discount_code: string
          discount_value: number
          id?: string
          name: string
          owner_id?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          discount_code?: string
          discount_value?: number
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_discounts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          business_id: string | null
          category_id: string | null
          created_at: string
          description: string | null
          duration: number | null
          id: string
          price: number
          service_name: string
        }
        Insert: {
          business_id?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          price: number
          service_name: string
        }
        Update: {
          business_id?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          price?: number
          service_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_category"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          avatar_url: string | null
          business_id: string
          color: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          job_title: string | null
          last_name: string
          phone: number | null
        }
        Insert: {
          avatar_url?: string | null
          business_id: string
          color?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          job_title?: string | null
          last_name: string
          phone?: number | null
        }
        Update: {
          avatar_url?: string | null
          business_id?: string
          color?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          job_title?: string | null
          last_name?: string
          phone?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team-members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members_services: {
        Row: {
          id: number
          services_id: string | null
          team_members_id: string | null
        }
        Insert: {
          id?: number
          services_id?: string | null
          team_members_id?: string | null
        }
        Update: {
          id?: number
          services_id?: string | null
          team_members_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team-memebers-services_services-id_fkey"
            columns: ["services_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team-memebers-services_team-members-id_fkey"
            columns: ["team_members_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
