export interface Comic {
  id: number;
  title: string;
  category: string;
  description: string;
  releaseDate?: string;
  coverUrl?: string;
}

export interface CreateComicDTO {
  title: string;
  description: string;
  category: string;
  releaseDate: string;
  coverUrl: string;
  authorNames: string[]; // O backend espera uma lista de strings
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createAt: string;
  username: string;
  coverUrl: string;
  comicName: string;
}

export interface ReviewDTO {
  id: number;
  rating: number;
  comment: string;
}

export interface ReviewRequestDTO {
  comicId: number;
  rating: number;
  comment: string;
}
