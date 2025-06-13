import api from "@/api/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  nomeCompleto: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  login: (values: { email: string; senha: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      user: null,

      login: async (values) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(
            "https://api.quiz.saggioro.xyz/auth/login",

            values
          );
          console.log(response);

          const data: any = response.data;
          const token = data.access_token;
          const user = data.user;

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log("Login bem-sucedido, dados guardados:", { token, user });
        } catch (error: any) {
          console.error("Erro no login:", error);
          set({
            error: error.message || "Email ou senha inválidos.",
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
          });
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false, error: null });
        console.log("Logout efetuado.");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
