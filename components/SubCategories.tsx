import Image from "next/image";
import Link from "next/link";


interface categoryDataType {
    categoryId: number
    categoryName: string;
    description: string
    image: string
}

interface ChildProps {
    subCategoryData: categoryDataType[];
    errorMessage: string
}




const SubCategories: React.FC<ChildProps> = ({ subCategoryData, errorMessage, }) => {
    return (
        <>


            <div>
                {subCategoryData && Array.isArray(subCategoryData) && subCategoryData.length > 0 ?
                    (
                        <div className="grid grid-cols-3 gap-4 p-2">
                            {subCategoryData.map((data: categoryDataType) => (
                                <div key={data.categoryId} className="group/item hover:scale-105">
                                    <Link
                                        href={`/category-home?parentCategoryId=${data.categoryId}`}
                                        className="cursor-pointer">
                                        {/* image */}
                                        <div className="rounded-t-2xl overflow-hidden">
                                            <Image
                                                src={data.image}
                                                width={2000}
                                                height={2000}
                                                alt={data.description}

                                                style={{
                                                    objectFit: "cover",
                                                    // maxWidth: "auto%",
                                                    height: "100%",
                                                }}
                                            />
                                        </div>
                                        <p className="bg-gray-200 group-hover/item:bg-gray-600 text-lg text-center py-1 rounded-b-2xl group-hover/item:text-white">
                                            {data.categoryName}
                                        </p>
                                    </Link>


                                </div>
                            ))}
                        </div>

                    )
                    :
                    (
                        <p className="font-bold text-lg justify-center text-center h-96 content-center">
                            {errorMessage}
                        </p>
                    )
                }
            </div>

            <div>

            </div>

        </>
    )
}

export default SubCategories;