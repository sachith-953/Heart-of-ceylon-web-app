"use client";

import { useToast } from "@/components/ui/use-toast";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChildProps {
  note: string;
  productId: number;
  updateParentNote: (newNote: string) => void;
}

const UpdateProductNote: React.FC<ChildProps> = ({
  note,
  productId,
  updateParentNote,
}) => {
  const router = useRouter();

  // display messages
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const [productNote, setProductNote] = useState("");

  const handleNoteUpdate = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/ProductManagement/update-product-note`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productNote, productId }),
        }
      );

      if (res.ok) {
        const ResponseData = await res.json();
        console.log(ResponseData);
        console.log("successfully changed acc info");
        toast({
          title: "Success!",
          description: "Note Updated Successfully !",
        });
        updateParentNote(productNote); // update the parent note; otherwise we have to reaload the changes to send changes to parent
      } else if (res.status === 403) {
        // this trigger when referesh token has issure.
        // if token is expired this will trigger
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        console.log("****403****************");
        console.log("Redirectiong to login. RT error");
        router.push("/log-in");
      } else {
        const ResponseData = await res.json();
        console.log(ResponseData);
        // show error notification in red color
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            "Plase Try Again. There was a problem with your request." +
            ResponseData.message,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "UnExpected Error",
        description: "Please Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        setProductNote(note)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
      <div className="bg-white">
        <div className="text-lg font-bold text-black">
          <span>Notes</span>
        </div>
        <div className="text-lg text-black rounded-md">
          {/* <span>product.productNotes</span> */}
          <textarea
            name=""
            value={productNote}
            onChange={(e) => setProductNote(e.target.value)}
            rows={4} // You can adjust this number to control initial height
            className="w-full py-2 border border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <button
          onClick={() => handleNoteUpdate()}
          className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded w-1/5 px-4 hover:text-black flex flex-row justify-center ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
              <span className="ml-2">Loading...</span>
            </div>
          ) : (
            <>
              <NotebookPen className="" />
              <span className="ml-1">Update Notes</span>
            </>
          )}
        </button>
        {/* ******************* */}
      </div>
    </>
  );
};
export default UpdateProductNote;
