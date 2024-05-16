
import Image from "next/image";


export default function CategoryCard({
    title,
    imageLink 
} : {
    title : string
    imageLink : string
}){
    return (
        <>
            <div className="">
                <div>
                    <Image 
                        src={imageLink}
                        alt={title}
                        width={2000}
                        height={2000}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    />
                    {/* todo : set image alt for SEO */}
                </div>
                <div className="h-11 content-center bg-gray-300">
                    <h1 className="text-center text-lg lg:text-base font-bold leading-none align-text-bottom">
                        {title}
                    </h1>
                    
                </div>
            </div>
        </>
    )
}