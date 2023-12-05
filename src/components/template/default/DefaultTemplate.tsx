import { Link } from "react-router-dom";
import {useEffect} from 'react';

function DefaultTemplate() {

  useEffect(()=>{
    window.ipcRenderer.on('html-result', (_, html)=>{
      console.log(html.DOM);
    })
  }, []);  

  return (
    
    <div> 
        <h1>DEFAULT TEMPLATE</h1>  
        <Link to="/">Go Back</Link>
    
    </div>

  );
  
}

export default DefaultTemplate;