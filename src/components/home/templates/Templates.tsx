import { templates } from "../../../consts/constTemplates";
import CardTemplate from "./CardTemplate";

function Templates() {
    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {templates.map(({title, description, logo}, index) => (
                <CardTemplate key={index}  title={title} logo={logo} description={description}/>
            ))}
        </div>
    );
}

export default Templates;
