import { useState, useEffect, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import Input from './Form/Input';
import axios from 'axios';

interface Game{
    id: string
    title: string
}

export default function CreateAdModal(){
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(res => {
            setGames(res.data);
        })
    },[]);

    async function handleCreateAd(event: FormEvent){
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if(!data.name){
            return;
        }

        try{
            await axios.post(`http://localhost:3333/games/${data.game}/createAds`, {
                name: data.game,
                weekDays: weekDays.map(Number),
                useVoiceChannel: useVoiceChannel,
                yearsPlaying: Number(data.yearsPlaying),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                discord: data.discord
            })
            alert('Anúncio criado com sucesso!');
        }catch (err){
            console.log(err)
            alert('Erro ao criar o anúncio!');
        }
    }

    return(
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[550px] shadow-lg'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            
              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='game'>Qual o Game?</label>
                  <select 
                    name='game'
                    id='game' 
                    className='bg-zinc-900 py-3 px-4 rounded text-sm appearance-none'
                    defaultValue=''
                  >
                    <option disabled value=''>Selecione o game que deseja jogar</option>
                    {games.map(game => {
                        return <option key={game.id} value={game.id}>{game.title}</option>
                    })}
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>Seu nome</label>
                  <Input name='name' id='name' placeholder='Como te chamam?'/>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                    <Input name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser zero!!!' type='number'/>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='discord'>Qual seu discord?</label>
                    <Input name='discord' id='discord' placeholder='usuário#5486'/>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='weekDays'>Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                        type='multiple' 
                        className='flex gap-1'
                        onValueChange={setWeekDays}
                        value={weekDays}
                    >
                      <ToggleGroup.Item
                        value='0'
                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                        title='Domingo'>D</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value='1'
                        className={`w-8 h-8 rounded ${weekDays.includes("1") ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        title='Segunda'>S</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value='2'
                        className={`w-8 h-8 rounded ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        title='Terça'>T</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value='3'
                        className={`w-8 h-8 rounded ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        title='Quarta'>Q</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value='4'
                        className={`w-8 h-8 rounded ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        title='Quinta'>Q</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value='5'
                        className={`w-8 h-8 rounded ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        title='Sexta'>S</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value='6'
                        className={`w-8 h-8 rounded ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        title='Sabado'>S</ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor='hourStart'>Qual horário?</label>
                    <div className='flex gap-2'>
                      <Input name='hourStart' id='hourStart' type='time' placeholder='De'/>
                      <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até'/>
                    </div>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Checkbox.Root
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                      if(checked === true){
                        setUseVoiceChannel(true);
                      }else{
                        setUseVoiceChannel(false);
                      }
                    }}
                    className='w-6 h-6 rounded p-1 bg-zinc-900'
                  >
                    <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400'/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </div>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close className='bg-zinc-600 px-4 py-2 rounded-lg font-semibold hover:bg-zinc-700'>
                    Cancelar
                  </Dialog.Close>
                  <button 
                    type='submit'
                    className='flex px-4 py-2 rounded-lg font-semibold gap-2 items-center bg-violet-500 hover:bg-violet-600'
                  >
                    <GameController size={20}/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}