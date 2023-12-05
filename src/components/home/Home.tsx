import { useNavigate } from 'react-router-dom';
import ButtonSubmit from './input/ButtonSubmit';
import InputURL from './input/InputUrl';
import Navbar from './navbar/Navbar';
import Templates from './templates/Templates';
import {useState, FormEvent} from 'react';

function Home() {

  const navigate = useNavigate();

  const [URL, setURL] = useState('');
  
  const handleURL =(value:string)=>{
    setURL(value);
  };

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    window.ipcRenderer.send('getUrl', URL);
    navigate('/default-template');
  }

  return (
    <main className='w-full'>
      <Navbar />
      <form onSubmit={handleSubmit} className="rounded-lg shadow-xl overflow-hidden p-6 space-y-10 m-10">
        <div className="relative flex justify-between items-center border-b-2 focus-within:border-violet-500">
          <InputURL onHandleChange={handleURL}/>
          <span className="material-symbols-outlined pointer-events-none mx-2 mt-12">Link</span>
        </div>
        <ButtonSubmit />
      </form>
      <Templates />
    </main>
  );
}

export default Home;