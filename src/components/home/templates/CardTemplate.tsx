import { Link } from "react-router-dom";

interface Props {
    title:string, 
    description: string, 
    logo: string
}
function CardTemplate({title, description, logo}: Props) {
    return (
        <Link to='/' className="transition-transform hover:scale-[0.99] hover:opacity-90 flex flex-col justify-center items-center border border-gray-600 rounded-lg p-4">
            <div className="flex justify-center min-h-[80px]">
                <img className="w-[80px] object-contain" src={logo} alt={title} />
            </div>
            <h3 className="w-full text-center font-bold text-2xl m-5">{title}</h3>
            <p className="text-center">{description}</p>
            <button className="bg-purple-600 px-4 py-2 font-medium rounded-lg mt-5">Go template</button>
        </Link>
    );
}

export default CardTemplate;