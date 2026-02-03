import axios from "axios";
import { parseCookies } from "nookies";

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  empty: boolean;
}

export interface ComicDTO {
  id: number;
  title: string;
  description: string;
  category?: string;
  coverUrl?: string;
  releaseDate?: string;
  authorNames?: string[];
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  expiresIn: number;
  roles: string[];
}

export interface RegisterRequestDTO {
  email: string;
  password: string;
  username: string;
}

export interface UserDTO {
  id: number;
  username: string;
  email: string;
}

export interface UpdateUserDTO {
  nome: string;
  email: string;
}

export interface ReviewRequestDTO {
  comicId: number;
  rating: number;
  comment: string;
}

export interface ReviewResponseDTO {
  id: number;
  rating: number;
  comment: string;
  comicId: number;
  userId: number;
  username?: string;
  createdAt?: string;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies["comicboxd.token"];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config?.url || "";

      if (requestUrl.includes("/login")) {
        return Promise.reject(error);
      }

      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const ComicService = {
  findAll: async (
    page = 0,
    category?: string,
    search?: string,
  ): Promise<Page<ComicDTO>> => {
    const params: any = { page, size: 12 };

    if (category) params.category = category;
    if (search) params.search = search;

    const response = await api.get("/comics", { params });
    return response.data;
  },

  findById: async (id: number): Promise<ComicDTO> => {
    const response = await api.get(`/comics/${id}`);
    return response.data;
  },

  create: async (data: Partial<ComicDTO>): Promise<ComicDTO> => {
    const response = await api.post("/comics", data);
    return response.data;
  },

  update: async (id: number, data: Partial<ComicDTO>): Promise<ComicDTO> => {
    const response = await api.put(`/comics/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/comics/${id}`);
  },
};

export const AuthService = {
  login: async (credentials: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await api.post("/login", credentials);
    return response.data;
  },
  register: async (userData: RegisterRequestDTO): Promise<void> => {
    await api.post("/users", userData);
  },
};

export const UserService = {
  getProfile: async (): Promise<UserDTO> => {
    const response = await api.get("/users/me");
    return response.data;
  },
  updateProfile: async (data: UpdateUserDTO): Promise<UserDTO> => {
    const response = await api.put("/users/me", data);
    return response.data;
  },
};

export const ReviewService = {
  create: async (data: ReviewRequestDTO): Promise<ReviewResponseDTO> => {
    const response = await api.post("/reviews", data);
    return response.data;
  },
  getByComicId: async (comicId: number): Promise<ReviewResponseDTO[]> => {
    const response = await api.get(`/reviews/comic/${comicId}`);
    return response.data;
  },
  delete: async (reviewId: number, userId: number): Promise<void> => {
    await api.delete(`/reviews/${reviewId}/user/${userId}`);
  },
};

export default api;
