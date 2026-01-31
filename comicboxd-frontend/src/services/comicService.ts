import { Comic, CreateComicDTO } from "../types";
import api from "./api";

export const comicService = {
  getAll: async () => {
    const response = await api.get("/comics?size=50");
    return response.data.content as Comic[];
  },

  delete: async (id: number) => {
    await api.delete(`/comics/${id}`);
  },

  create: async (data: CreateComicDTO) => {
    const response = await api.post("/comics", data);
    return response.data;
  },
};
