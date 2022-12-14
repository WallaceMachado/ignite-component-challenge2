
import { useEffect, useState } from 'react';

import { MovieCard } from './MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from '../services/api';

import '../styles/sidebar.scss';
import '../styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ConstentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps
}

export function Content({selectedGenreId, selectedGenre}:ConstentProps) { 

  const [movies, setMovies] = useState<MovieProps[]>([]); 

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });   
  }, [selectedGenreId]); 

  return (
    
      <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
   
  )
}