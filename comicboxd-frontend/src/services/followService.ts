import api from "./api";

export const followService = {
    follow: async (userId: number) => {
        const response = await api.post(`/users/${userId}/follow`);
        return response.data;
    },

    unfollow: async (userId: number) => {
        const response = await api.post(`/users/${userId}/follow`);
        return response.data;
    },

    checkIsFollowing: async (userId: number): Promise<boolean> => {
        const response = await api.get(`/users/${userId}/check-follow`);
        return response.data;
    },

    getStats: async (userId: number) => {
        const response = await api.get(`/users/${userId}/stats/`);
        return response.data;
    }
}