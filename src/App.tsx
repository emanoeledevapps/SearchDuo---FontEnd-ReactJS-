import {useState, useEffect} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from './assets/Logo.svg';
import CreateAdGames from './components/CreateAdGame';
import CreateAdModal from './components/CreateAdModal';
import GameBanner from './components/GameBanner';
import axios from 'axios';


interface Game{
  id: string
  title: string
  bannerUrl: string
  _count:{
    Ads: number
  }
}

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(res => {
                setGames(res.data);
            })
    },[])

  return (
    <div className='max-w-[1334px] mx-auto flex flex-col items-center m-20'>
      <img src={logoImg}/>
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradiente bg-clip-text text-transparent'>duo</span> está aqui
      </h1>

      <div className='flex gap-6 mt-16'>
        {games.map(game => {
          return(
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.Ads}
            />
          )
        })}
        
      </div>
      
      <Dialog.Root>
        <CreateAdGames/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
