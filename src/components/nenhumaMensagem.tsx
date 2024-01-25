import { Controls, Player } from '@lottiefiles/react-lottie-player';
import AnimacaoSearch from '@/assets/animacao/search.json';

export default function NenhumaMensagem() {
  return (
    <>
      <div className='text-center'>
        <div className="block max-md:hidden">
          <Player autoplay loop src={AnimacaoSearch}>
            <Controls visible={false} />
          </Player>
        </div>
        <div className='text-[24px] font-bold text-black '>Nenhuma mensagem encontrada</div>
        <div className="text-[16px] text-gray-500 ">
          Digite um texto que você deseja criptografar ou descriptografar.
        </div>
      </div>
    </>
  );
}
