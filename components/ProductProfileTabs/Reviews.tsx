import ReviewChart from "./ReviewChart";
import ReviewComment from "./ReviewComment";

export default function Reviews(){
    return(
        <>
        {/* Parent */}
        <div className="flex flex-row justify-center border-2 border-red-400">
            {/* Review chart */}
            <div className="border-2 border-blue-400 w-1/3">
                <ReviewChart/>
            </div>

            {/* Review comments */}
            <div className="border-2 border-green-400 w-2/3 pl-5">
                <h3 className="text-xl font-semibold mb-2">Top Reviews</h3>

                {/* comments content */}
                <div className="border-2  bg-gray-100 hover:bg-gray-300">
                    
                    {/* comments */}
                    <ReviewComment/>

                </div>
            </div>
        </div>
        </>
    )
}