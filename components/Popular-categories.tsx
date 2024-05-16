import CategoryCard from "./CategoryCard"

export default function PopularCategories(){

    const fetchedData = [
        {
            title: "Diamonds and Gems",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/diamonds_gems_jewellery.jpg"
        },

        {
            title: "Coconut and products",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/giftware.jpg"
        },

        {
            title: "Fruits, Nuts and Vegitables",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/fruits-vegetables.jpg"
        },

        {
            title: "Ceramics and Porcelain Products",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/ceramic.jpg"
        },
        
        {
            title: "Apparel and Textiles",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/apparel.jpg"
        },

        {
            title: "Ceylon Tea",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/tea.jpg"
        },
        
        {
            title: "Food, Feed and Beverages",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/food-beverages.jpg"
        },
        
        {
            title: "Spices, Oil",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/spices.jpg"
        },

        {
            title: "Handloom Products",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/handloom.jpg"
        },

        {
            title: "Leather Products",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/footwear.jpg"
        },
        
        {
            title: "Live Fish",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/ornamental-fish.jpg"
        },
        
        {
            title: "Wood and Wooden products",
            imageLink : "https://www.srilankabusiness.com/images/export_categories/wooden-products.jpg"
        },
    ]
    
    // const name = "Coconut and products"
    // // const imageLink = "/coconut-products.jpg"
    // const imageLink = "https://www.srilankabusiness.com/images/export_categories/coconut-products.jpg"

    return(
        <>
            <div className="">
                {/* titile */}
                <h1 
                    className="text-2xl md:text-3xl font-bold text-center text-gray-700 m-3"
                >
                    Popular Categories
                </h1>

                {/* category grid is controlled in here */}
                <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {/* popular categories list */}
                    {fetchedData.map((data)=> {
                        console.log(data.imageLink)
                        return(
                            <CategoryCard title={data.title} imageLink={data.imageLink} key={data.imageLink} ></CategoryCard>
                        )  
                    })}
                </div>
            </div>
        </>
    )
}