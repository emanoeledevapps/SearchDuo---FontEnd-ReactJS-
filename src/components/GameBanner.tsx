interface GameBannerProps{
    bannerUrl: string
    title: string
    adsCount: number
}

export default function GameBanner(data: GameBannerProps){
    return(
        <a href='' className='relative rounded-lg overflow-hidden'>
          <img src={data.bannerUrl}/>

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradiente absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{data.title}</strong>
            <span className='text-zinc-300 text-sm block mt-1'>{data.adsCount} Anúncios</span>
          </div>
        </a>
    )
}