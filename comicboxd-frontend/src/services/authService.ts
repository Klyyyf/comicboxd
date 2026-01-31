import api from "./api";

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  roles: string[];
}

export const authService = {
  register: async (data: RegisterData) => {
    return api.post("/users", data);
  },

  login: async (data: LoginData) => {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
  },
};
