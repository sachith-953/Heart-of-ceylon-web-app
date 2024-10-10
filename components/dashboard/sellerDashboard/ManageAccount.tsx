import UploadProfilePicture from "@/components/dashboard/sellerDashboard/ManageAccount/UploadProfilePicture"
import UploadCoverImage from "./ManageAccount/UploadCoverImage"



const ManageAccount = () => {
    return (
        <>
            <div className="bg-white">
                {/* Upload seller profile picture */}
                <UploadProfilePicture />

                {/* Upload Seller Cover image */}
                <UploadCoverImage />



            </div>
        </>
    )
}
export default ManageAccount