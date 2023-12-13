import { useNavigate } from 'react-router-dom';
import ButtonSubmit from './input/ButtonSubmit';
import InputURL from './input/InputUrl';
import Navbar from './navbar/Navbar';
import Templates from './templates/Templates';
import { useState, FormEvent } from 'react';
import { useDOM } from '../../store/useDOM';
import getHtmlFromElectron from '../../scrapping/getHtmlFromElectron';
import { useEffect } from 'react';

function Home() {
  const { setDOM, setWebSiteData, setCopySelectorText } = useDOM();
  const navigate = useNavigate();
  const [URL, setURL] = useState('');
  const [load, setLoad] = useState(false);
  const handleURL = (value: string) => setURL(value);

  useEffect(() => {
    setCopySelectorText('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!URL) {
      alert('Add a URL');
      return;
    }
    window.ipcRenderer.send('getUrl', URL);
    setLoad(true);
    const { DOM, webSiteData } = await getHtmlFromElectron();
    setLoad(false);
    setDOM(DOM);
    setWebSiteData(webSiteData);
    navigate('/default-template');
  }

  return (
    <main className='w-full'>
      <Navbar />
      <form onSubmit={handleSubmit} className="rounded-lg shadow-xl overflow-hidden p-6 space-y-10 m-10">
        <div className="relative flex justify-between items-center border-b-2 focus-within:border-violet-500">
          <InputURL onHandleChange={handleURL} />
          <span className="material-symbols-outlined pointer-events-none mx-2 mt-12">Link</span>
        </div>
        <div className='flex justify-center'>
          {!load ? <ButtonSubmit /> :
            <div className='max-w-min'>
              <h4 className='w-full text-center font-medium animate-typewriter'>Loading, this may take a few seconds...</h4>
            </div>
          }
        </div>
      </form>
      <h2 className='m-5 text-center font-bold text-3xl'>TEMPLATES</h2>
      <Templates />
    </main>
  );
}

export default Home;