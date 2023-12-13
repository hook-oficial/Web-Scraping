import { Link } from "react-router-dom";
import RenderDOM from "../DOMGraphic/RenderDOM";
import { useDOM } from "../../../store/useDOM";
import InputSelector from "../InputSelector";
import {useEffect} from 'react';

function DefaultTemplate() {
  const {DOM, webSiteData} = useDOM();
  return (
    <div className="flex justify-center flex-col items-center"> 
        { DOM && 
          (<><h1 className="text-center font-bold text-3xl mt-7">{webSiteData.title}</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-center font-medium italic text-md mt-3" >"{webSiteData.description}..."</h2>
            <img className="rounded-full" src={webSiteData.logo} width='50' alt={`${webSiteData.title} logo`} />        
          </div></> )
        }
        {DOM ? <RenderDOM DOM={DOM}/> : <p className="m-5 font-bold">"We're loading the your website elements..."</p>}
        <div className="flex">
          <Link className="bg-violet-600 rounded-md p-3 px-6 font-bold mt-8" to="/">Go Back</Link>
        </div>     
        <InputSelector/>
    </div>
  );
}

export default DefaultTemplate;