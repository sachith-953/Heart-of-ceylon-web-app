import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";

const handleSearch = () => {

    // data fetch from this component
}

interface ChildProps {
    parentData: string;
    onChildDataChange: (newChildData: string) => void;
  }

const SearchBarForSearchSellerCom2 :  React.FC<ChildProps>  = ({ parentData, onChildDataChange,}) => {

    const [childData, setChildData] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChildData = event.target.value; // get data from input tag
      setChildData(newChildData);
      onChildDataChange(newChildData); // this call the parent component function
    };

    return (
        <>
            <>
            <MaxWidthWrapper>
                <div className="flex flex-col gap-10 items-center p-6">
                    <div className="items-start flex flex-row w-full sm:w-2/3 max-w-96 sm:max-w-screen-md">
                        <div className="relative flex flex-col
             w-full">
                            <div className="flex flex-row w-full">
                                <input 
                                type="text" 
                                className="z-40 px-5 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none focus:bg-gray-300"
                                onChange={handleInputChange}/>
                                <button className="z-40 bg-gray-300 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
                                    onClick={handleSearch}
                                >
                                    <p>Search</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </MaxWidthWrapper>
        </>
        </>
    )
}
export default SearchBarForSearchSellerCom2