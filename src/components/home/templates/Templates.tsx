import { templates } from "../../../constants/constTemplates";

function Templates() {
    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {templates.map((template, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-gray-900">
                    <h5 className="font-bold text-2xl text-center">{template.title}</h5>
                    <p className="text-gray-500 text-1xl text-center">{template.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Templates;
