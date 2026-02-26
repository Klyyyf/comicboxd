import api from "./api";

export const userService = {
    getById: async (id: number) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    }
}