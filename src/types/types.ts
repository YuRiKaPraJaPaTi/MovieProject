export interface Movie {
  id: number;
  title: string;
  image: string;          
  backdropImage?: string; 
  rating: number;         
  releaseDate: string;    
  overview: string;
  tagline?: string;
  duration?: number;      
  genres?: string;       
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Credits {
  director: string | null;
  cast: CastMember[];
}

export interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
  source: 'tmdb' | 'firebase';
}