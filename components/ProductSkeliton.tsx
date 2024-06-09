
export default function ProductSkeliton() {
    return (
        <>


            <div className="flex bg-gray-300 flex-row h-40 sm:h-60">

                {/* image */}
                <div className="bg-muted animate-pulse rounded-2xl w-2/5 m-2"></div>

                {/* content */}
                <div className=" w-3/5 m-1 sm:m-2">
                    <p className="animate-pulse bg-muted rounded-xl w-full h-10"></p>
                    <p className="animate-pulse bg-muted rounded-xl mt-1 sm:mt-1 w-52 h-5"></p>

                    {/* ratings */}
                    <div className="flex flex-col md:flex-row mt-0 md:mt-1">

                        <div className="flex flex-row pr-1 justify-center sm:justify-normal">

                            <p className="animate-pulse bg-muted rounded-xl mr-1 hidden sm:flex w-80 min-w-16 h-8"></p>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between">
                        <p className="animate-pulse bg-muted rounded-xl w-32 h-10 mt-1"></p>

                        <p className="animate-pulse bg-muted rounded-xl w-28 h-5 mt-1"></p>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between">
                        <p className="animate-pulse bg-muted rounded-xl w-40 h-5 mt-1"></p>
                        <p className="animate-pulse bg-muted rounded-xl w-20 h-5 mt-1"></p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 my-2"></div>
        </>
    )
}