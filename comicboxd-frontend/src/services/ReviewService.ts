import { ReviewRequestDTO, ReviewDTO, UpdateReviewDTO } from "../types"; // Importe a nova interface
import api from "./api";

export const reviewService = {
  create: async (data: ReviewRequestDTO) => {
    const response = await api.post("/reviews", data);
    return response.data;
  },

  getReviewById: async (id: string) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  getAllReviews: async () => {
    const response = await api.get("/reviews");
    return response.data;
  },

  getReviewsByComic: async (id: string) => {
    const response = await api.get(`/reviews/comic/${id}`);
    return response.data;
  },
  getReviewsByUser: async () => {
    const response = await api.get(`/reviews/user`);
    return response.data;
  },
  update: async (id: string, data: UpdateReviewDTO) => {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};
