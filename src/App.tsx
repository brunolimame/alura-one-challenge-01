import { Button } from '@nextui-org/react';
import AluraLogo from './assets/alura.svg';
import { useState } from 'react';
import NenhumaMensagem from './components/nenhumaMensagem';
import { TfiReload } from 'react-icons/tfi';
import { FaInfoCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

type ChavesSecretas = {
  [key: string]: string;
};
const chavesSecretas: ChavesSecretas = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};
function App() {
  const [text, setText] = useState<string>('');
  const [textEncode, setTextEncode] = useState<string>('');

  const handleEncode = () => {
    let textEncode = text;
    if (textEncode.length === 0) {
      toast.error('Texto não informado!');
      return;
    }
    Object.keys(chavesSecretas).map((key) => {
      textEncode = textEncode.replace(key, chavesSecretas[key]);
    });
    setTextEncode(textEncode);
    toast.success('Texto criptografado!');
  };

  const handleDecode = () => {
    let textDecode = text;
    if (textEncode.length === 0) {
      toast.error('Texto não informado!');
      return;
    }
    Object.keys(chavesSecretas).map((key) => {
      textDecode = textDecode.replace(chavesSecretas[key], key);
    });
    setTextEncode(textDecode);
    toast.success('Texto descriptografado!');
  };

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error('Seu navegador não tem suporte para copiar o texto automaticamente. Seleciona o texto com o mouse e clique em ctrl+c(Windows) ou cmd+c(MacOS).');
      return;
    }
    if (textEncode.length === 0) {
      toast.error('Texto está em branco! Nada foi copiado.');
      return;
    }
    toast.success('Texto copiado para sua área de transferência.');
    navigator.clipboard.writeText(textEncode);
  };
  const handleReset = () => {
    setText('');
    setTextEncode('');
  };

  return (
    <>
      <div className='bg-cyan-100 w-screen h-screen flex p-[40px] overflow-hidden overflow-y-auto'>
        <div className='grid grid-cols-12 w-full gap-8 max-md:gap-3'>
          <div className='col-span-8 max-md:col-span-12 w-full relative p-8'>
            <div className='absolute left-0 top-0 flex justify-center items-center w-[120px] h-[50px]'>
              <img src={AluraLogo} alt='Alura' className='w-auto max-w-full' />
            </div>
            <div className='flex flex-col justify-between gap-8 h-full pt-[80px] w-full max-w-[680px] m-auto'>
              <textarea
                className='h-full min-h-[150px] text-[32px] max-md:text-[20px] text-blue-700 bg-transparent outline-none placeholder:text-blue-700'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Digite seu texto'
              />
              <div className='flex flex-col gap-3'>
                <div className='text-gray-600 flex gap-1 justify-start items-center'>
                  <FaInfoCircle />
                  <span className='text-[12px]'>
                    Apenas letras minúsculas e sem acento.
                  </span>
                </div>
                <div className='flex flex-row max-md:flex-col justify-between w-full gap-8 max-md:gap-4'>
                  <Button
                    className='py-7 max-md:py-3 bg-blue-900 hover:bg-blue-700 text-white text-[16px]'
                    fullWidth
                    onClick={handleEncode}
                  >
                    Criptografar
                  </Button>
                  <Button
                    variant='ghost'
                    className='py-7 max-md:py-3 border border-blue-900 text-blue-900 text-[16px]'
                    fullWidth
                    onClick={handleDecode}
                  >
                    Descriptografar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-4 max-md:col-span-12 bg-white rounded-[32px] p-8 flex flex-col justify-between drop-shadow-lg'>
            {textEncode.length === 0 && (
              <div className='h-full w-full flex justify-center items-center'>
                <NenhumaMensagem />
              </div>
            )}
            {textEncode.length > 0 && (
              <>
                <div className='text-[24px]'>{textEncode}</div>
                <div className='flex flex-col gap-4'>
                  <Button
                    fullWidth
                    variant='ghost'
                    className='py-7 max-md:py-3 border-blue-900 text-blue-900 text-[16px]'
                    onClick={handleCopy}
                  >
                    Copiar
                  </Button>
                  <Button
                    fullWidth
                    color='warning'
                    variant='solid'
                    startContent={<TfiReload />}
                    onClick={handleReset}
                  >
                    Reiniciar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
