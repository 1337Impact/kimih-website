export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
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
          status: string
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
          status?: string
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
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_business_id_fkey"
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
            foreignKeyName: "memberships_catalog_business_id_fkey"
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
            foreignKeyName: "memberships_catalog_services_memberships_id_fkey"
            columns: ["memberships_id"]
            isOneToOne: false
            referencedRelation: "memberships_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_catalog_services_services_id_fkey"
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
          auth_id: string | null
          business_id: string | null
          charge_date: string | null
          charge_id: string | null
          client_id: string | null
          created_at: string
          discount_id: string | null
          id: string
          status: string
        }
        Insert: {
          amount: number
          auth_id?: string | null
          business_id?: string | null
          charge_date?: string | null
          charge_id?: string | null
          client_id?: string | null
          created_at?: string
          discount_id?: string | null
          id?: string
          status?: string
        }
        Update: {
          amount?: number
          auth_id?: string | null
          business_id?: string | null
          charge_date?: string | null
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
          created_at: string
          email: string
          first_name: string
          id: string
          isCompleted: boolean
          last_name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name: string
          id: string
          isCompleted?: boolean
          last_name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          isCompleted?: boolean
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "service_discounts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
          email: string
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
          email: string
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
          email?: string
          first_name?: string
          id?: string
          job_title?: string | null
          last_name?: string
          phone?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_business_id_fkey"
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
            foreignKeyName: "team_members_services_services_id_fkey"
            columns: ["services_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_services_team_members_id_fkey"
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
      email_exists: { Args: { requested_email: string }; Returns: boolean }
    }
    Enums: {
      user_role: "manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["manager", "user"],
    },
  },
} as const
