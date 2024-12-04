import React, { useState } from 'react';
import axios from 'axios';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';

export default function FunnyGifApp() {
  const router = useRouter();
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFunnyGif = async () => {
    setIsLoading(true);
    try {
      // Usando a API GIPHY para buscar GIFs engraçados aleatórios
      const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
          api_key: 'OeJglIrT4slMSSGeD7vsQHWNKFMPFsBO',
          tag: 'funny',
          rating: 'pg'
        }
      });

      setGifUrl(response.data.data.images.downsized.url);
    } catch (error) {
      console.error('Erro ao buscar GIF:', error);
      alert('Não foi possível carregar o GIF. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <h1 className="text-2xl font-bold mb-4">Gerador de GIFs Engraçados</h1>
      
      <button 
        onClick={fetchFunnyGif}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {isLoading ? 'Carregando...' : 'Só Clica vai....'}
      </button>

      {gifUrl && (
        <div className="max-w-md mt-4 d-flex">
          <img 
            src={gifUrl} 
            alt="GIF engraçado" 
            className="rounded-lg shadow-lg mt-4 d-flex"
          />
        </div>
      )}
      <SpeedInsights route={router.pathname} />
    </div>
  );
} 