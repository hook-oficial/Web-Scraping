interface Props {
    onHandleChange: (value:string)=> void; 
}

function InputURL({onHandleChange}: Props) {
    const handleURL=(e: Event | any)=>{
        const input = e.target;
        if(!(input && input instanceof HTMLInputElement)) return;
        const userURL = input?.value;
        onHandleChange(userURL);
    };

    return (
        <label className="flex flex-col gap-8 w-full">
            <p className="font-bold text-lg">
                Write your URL of site to do Scrapping:
            </p>
            <input onChange={handleURL} className="w-full bg-transparent py-3 outline-none" type="url" name="url" placeholder="https://example.com..."/>
        </label>
    );
}

export default InputURL;