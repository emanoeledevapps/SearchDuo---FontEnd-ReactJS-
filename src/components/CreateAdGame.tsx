import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export default function CreateAdGames(){
    return(
        <div className='pt-1 bg-nlw-gradiente self-stretch rounded-lg mt-8 overflow-hidden'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between'>
            <div>
                <strong className='text-white font-black text-2xl block'>Não encontrou seu duo?</strong>
                <span className='text-zinc-300'>Publique um anúncio para encontrar novos players!</span>
            </div>

            <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white font-normal rounded-md flex items-center gap-3 justify-center'>
                <MagnifyingGlassPlus size={24}/>
                Publicar anúncio
            </Dialog.Trigger>
            </div>
        </div>
    )
}