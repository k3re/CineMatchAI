
import React, { useState, useEffect } from 'react';
import { getMovieRecommendations } from './services/geminiService';
import { Movie, PreferenceState, GroundingSource, RecommendationResponse } from './types';
import Button from './components/Button';
import MovieCard from './components/MovieCard';

const GENRES = ["Action", "Sci-Fi", "Drama", "Comedy", "Horror", "Thriller", "Romance", "Documentary", "Animation", "Crime", "Fantasy", "Mystery"];
const ERAS = ["Modern (2010s-Present)", "Millennium (2000s)", "Golden Age (90s)", "Classic (Pre-90s)", "No Preference"];

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<PreferenceState>({
    mood: '',
    favoriteGenres: [],
    excludeGenres: [],
    era: 'Modern (2010s-Present)',
    complexity: 'balanced',
    additionalContext: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleGenre = (genre: string) => {
    setPreferences(prev => {
      const isSelected = prev.favoriteGenres.includes(genre);
      return {
        ...prev,
        favoriteGenres: isSelected 
          ? prev.favoriteGenres.filter(g => g !== genre)
          : [...prev.favoriteGenres, genre]
      };
    });
  };

  const handleRecommend = async () => {
    if (!preferences.mood && !preferences.favoriteGenres.length && !preferences.additionalContext) {
      setError("Please tell me a bit about your mood or favorite genres!");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getMovieRecommendations(preferences);
      setResults(data);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <header className="relative py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rose-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 glass-card rounded-full border border-white/10 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            AI-Powered Entertainment Agent
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Curating the Perfect <span className="gradient-text">Cinematic</span> Escape
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Our agent analyzes your current emotional wavelength and tastes to find the films you didn't know you needed to see.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Input Form */}
        <section className="glass-card rounded-3xl p-8 md:p-12 space-y-10 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  How are you feeling?
                </label>
                <input 
                  type="text"
                  placeholder="e.g., Exhausted but want something inspiring..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                  value={preferences.mood}
                  onChange={(e) => setPreferences({...preferences, mood: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Preferred Eras
                </label>
                <div className="flex flex-wrap gap-2">
                  {ERAS.map(era => (
                    <button
                      key={era}
                      onClick={() => setPreferences({...preferences, era})}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                        preferences.era === era 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {era}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Narrative Depth
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'balanced', 'deep'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setPreferences({...preferences, complexity: c})}
                      className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        preferences.complexity === c
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Favorite Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        preferences.favoriteGenres.includes(genre)
                          ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                          : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Anything else? (Specific actors, keywords)
                </label>
                <textarea 
                  rows={3}
                  placeholder="e.g., I love neo-noir films like Blade Runner, or anything starring Jake Gyllenhaal."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600 resize-none"
                  value={preferences.additionalContext}
                  onChange={(e) => setPreferences({...preferences, additionalContext: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto min-w-[280px]"
              onClick={handleRecommend}
              isLoading={isLoading}
            >
              Discover Your Next Film
            </Button>
            {error && <p className="text-rose-400 text-sm font-medium">{error}</p>}
          </div>
        </section>

        {/* Results Section */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium tracking-widest text-sm uppercase">Synthesizing cinematic profiles...</p>
          </div>
        )}

        {results && !isLoading && (
          <section id="results-section" className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif">Selected For Your Current Frequency</h2>
              <div className="max-w-3xl mx-auto p-6 glass-card rounded-2xl border-l-4 border-indigo-500">
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{results.analyticalSummary}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.movies.map((movie, idx) => (
                <MovieCard key={`${movie.title}-${idx}`} movie={movie} index={idx} />
              ))}
            </div>

            {results.sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Intelligence Sources</h4>
                <div className="flex flex-wrap gap-4">
                  {results.sources.map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 underline underline-offset-4"
                    >
                      {source.title || 'Source'}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center pt-8">
              <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Refine Search
              </Button>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-20 py-12 border-t border-white/5 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-500"></div>
          <span className="text-xl font-serif tracking-tight">CineMatch AI</span>
        </div>
        <p className="text-gray-600 text-xs tracking-widest uppercase">
          Crafted for the modern cinephile. &copy; 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
