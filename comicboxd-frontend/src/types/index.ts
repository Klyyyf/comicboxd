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
