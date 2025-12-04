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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cuisines: {
        Row: {
          en_text: string | null
          id: string
          sv_text: string | null
        }
        Insert: {
          en_text?: string | null
          id?: string
          sv_text?: string | null
        }
        Update: {
          en_text?: string | null
          id?: string
          sv_text?: string | null
        }
        Relationships: []
      }
      favourites: {
        Row: {
          created_at: string
          recipe_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          recipe_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favourites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      grocery_list_items: {
        Row: {
          amount: string | null
          completed: boolean | null
          created_at: string
          id: string
          list_id: string | null
          text: string
          unit: string | null
          user_id: string
        }
        Insert: {
          amount?: string | null
          completed?: boolean | null
          created_at?: string
          id: string
          list_id?: string | null
          text: string
          unit?: string | null
          user_id: string
        }
        Update: {
          amount?: string | null
          completed?: boolean | null
          created_at?: string
          id?: string
          list_id?: string | null
          text?: string
          unit?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grocery_list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "grocery_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      grocery_lists: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      main_ingredients: {
        Row: {
          en_text: string | null
          id: string
          sv_text: string | null
        }
        Insert: {
          en_text?: string | null
          id?: string
          sv_text?: string | null
        }
        Update: {
          en_text?: string | null
          id?: string
          sv_text?: string | null
        }
        Relationships: []
      }
      recipe_cuisines: {
        Row: {
          cuisine_id: string
          recipe_id: string
        }
        Insert: {
          cuisine_id: string
          recipe_id: string
        }
        Update: {
          cuisine_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_cuisines_cuisine_id_fkey"
            columns: ["cuisine_id"]
            isOneToOne: false
            referencedRelation: "cuisines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_cuisines_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_main_ingredients: {
        Row: {
          main_ingredient_id: string
          recipe_id: string
        }
        Insert: {
          main_ingredient_id: string
          recipe_id: string
        }
        Update: {
          main_ingredient_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_main_ingredients_main_ingredient_id_fkey"
            columns: ["main_ingredient_id"]
            isOneToOne: false
            referencedRelation: "main_ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_main_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          include_weekly: boolean
          ingredients: Json[]
          instructions: Json[]
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          include_weekly?: boolean
          ingredients: Json[]
          instructions: Json[]
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          include_weekly?: boolean
          ingredients?: Json[]
          instructions?: Json[]
          title?: string
        }
        Relationships: []
      }
      user_role: {
        Row: {
          created_at: string
          id: number
          rank: number
          role: Database["public"]["Enums"]["user_role_enum"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          rank?: number
          role: Database["public"]["Enums"]["user_role_enum"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          rank?: number
          role?: Database["public"]["Enums"]["user_role_enum"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cuisine:
        | "Korean"
        | "Vietnamese"
        | "Portuguese"
        | "Italian"
        | "Swedish"
        | "Mexican"
      main_ingredient:
        | "Beef"
        | "Chicken"
        | "Pork"
        | "Fish"
        | "Seafood"
        | "Vegetarian"
        | "Pasta"
        | "Other"
      user_role_enum: "admin" | "user" | "webmaster"
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
      cuisine: [
        "Korean",
        "Vietnamese",
        "Portuguese",
        "Italian",
        "Swedish",
        "Mexican",
      ],
      main_ingredient: [
        "Beef",
        "Chicken",
        "Pork",
        "Fish",
        "Seafood",
        "Vegetarian",
        "Pasta",
        "Other",
      ],
      user_role_enum: ["admin", "user", "webmaster"],
    },
  },
} as const
