
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  // Generate a distinct placeholder based on the title
  const placeholderId = Math.floor(Math.random() * 1000);
  const posterUrl = `https://picsum.photos/seed/${movie.title.replace(/\s+/g, '')}/400/600`;

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 bg-indigo-600 text-[10px] font-bold uppercase rounded tracking-wider">
               {movie.year}
             </span>
             <span className="px-2 py-0.5 bg-yellow-500/90 text-black text-[10px] font-bold uppercase rounded tracking-wider">
               ★ {movie.rating}
             </span>
          </div>
          <h3 className="text-xl font-bold leading-tight">{movie.title}</h3>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {movie.genres.map(genre => (
            <span key={genre} className="text-[10px] px-2 py-0.5 rounded-full border border-gray-700 text-gray-400 bg-gray-800/50">
              {genre}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-400 line-clamp-3 italic">
          "{movie.summary}"
        </p>

        <div className="mt-auto pt-4 border-t border-white/5">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">The AI's Verdict</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {movie.whyForYou}
          </p>
        </div>

        {movie.streamingOn && movie.streamingOn.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.streamingOn.map(platform => (
              <span key={platform} className="text-[10px] text-gray-500 font-medium">
                • {platform}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
