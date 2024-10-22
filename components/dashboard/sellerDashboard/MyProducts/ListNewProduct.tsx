'use client'

import { useRouter } from 'next/navigation'


const ListNewProduct = () => {

    const router = useRouter()

    return (
        <>
            <div className="bg-white mx-2 mt-2 p-4 border-2">
                
                <div className="">
                    <button
                        type="button"
                        onClick={() => {router.push("/seller-dashboard/add-new-product")}}
                        className="bg-gray-300 text-gray-700 font-bold py-2 px-5 rounded-3xl hover:bg-gray-400"
                    >
                        Add New Product
                    </button>


                </div>

            </div>
        </>
    )
}
export default ListNewProduct


