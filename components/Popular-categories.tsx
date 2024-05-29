
import CategoryCard from "./CategoryCard"


interface categoryType {
    categoryId : number,
    categoryName : string,
    image : string,
}
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
async function getData() {

    // TODO:
    // use this try catch to handle server not found errors. 
    // otherwise it shows erro codes in client side
    // stop the backend server and load the home page. you'll see the issue
    try{

    }
    catch(error){

    }


    const res = await fetch('http://localhost:8080/api/v1/pBuyer/getPopularCategories',{ 
        cache: 'no-store' 
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}



// for fetch data : 4.48=> https://www.youtube.com/watch?v=O0-rb1B74xs
const  PopularCategories = async () => {

    const fetchedData = await getData()
    // console.log(fetchedData)

    return (
        <>
            <div className="">
                {/* titile */}
                <h1
                    className="text-2xl md:text-3xl font-bold text-center text-gray-700 m-3"
                >
                    Popular Categories
                </h1>

                {/* category grid is controlled in here */}
                <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {/* popular categories list */}
                    {fetchedData.map((data : categoryType) => {
                        
                        return (
                            // check the next.config.mjs for refer externam image fetching configurations
                            <CategoryCard title={data.categoryName} imageLink={data.image} key={data.categoryName} ></CategoryCard>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PopularCategories