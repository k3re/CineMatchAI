[200~import { GoogleGenAI, Type } from "@google/genai";
import { PreferenceState, Movie, RecommendationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMovieRecommendations = async (preferences: PreferenceState): Promise<RecommendationResponse> => {
  const prompt = `
    Act as a world-class Cinephile and Entertainment Agent. 
    Based on the following preferences, recommend 4 highly relevant movies.
    
    Current Mood: ${preferences.mood}
    Favorite Genres: ${preferences.favoriteGenres.join(', ')}
    Era Preference: ${preferences.era}
    Story Complexity: ${preferences.complexity}
    Additional Request: ${preferences.additionalContext}
    
    For each movie, provide:
    1. Title and Release Year
    2. Genre list
    3. IMDb/Rotten Tomatoes approximate rating
    4. Duration
    5. A concise summary
    6. "Why for you": A specific explanation connecting the movie to their specific mood or preferences.
    7. Current streaming platforms (use your search grounding tool to be accurate).

    Also provide an "analyticalSummary" explaining your overall selection strategy for this user.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            movies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  year: { type: Type.NUMBER },
                  genres: { type: Type.ARRAY, items: { type: Type.STRING } },
                  rating: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  whyForYou: { type: Type.STRING },
                  streamingOn: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["title", "year", "genres", "rating", "duration", "summary", "whyForYou"]
              }
            },
            analyticalSummary: { type: Type.STRING }
          },
          required: ["movies", "analyticalSummary"]
        }
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    
    // Extract grounding sources from the response
    const sources: any[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return {
      movies: parsedData.movies || [],
      analyticalSummary: parsedData.analyticalSummary || "Enjoy your personalized cinematic journey.",
      sources: sources
    };
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
