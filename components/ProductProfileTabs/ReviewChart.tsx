import { Progress } from "@/components/ui/progress";

export default function ReviewChart() {
  return (
    <>
      <div>
        <p className="text-xl font-semibold">Customer reviews</p>

        {/* Average rating stars */}
        <div></div>

        <p className="my-5">10,345 Global ratings</p>

        {/* Progress bars */}
        <div>
          {/* Progress bar 5 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
            <p className="pr-2">5 stars</p>
            <Progress value={78} className="w-3/5 bg-gray-200 mr-2" />
            <p>78%</p>
          </div>

          {/* Progress bar 4 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2">4 stars</p>
            <Progress value={45} className="w-3/5 bg-gray-200 mr-2" />
            <p>78%</p>
          </div>

          {/* Progress bar 3 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2">3 stars</p>
            <Progress value={78} className="w-3/5 bg-gray-200 mr-2"  />
            <p>78%</p>
          </div>

          {/* Progress bar 2 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2">2 stars</p>
            <Progress value={78} className="w-3/5 bg-gray-200 mr-2" />
            <p>78%</p>
          </div>

          {/* Progress bar 1 star */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-4">1 star</p>
            <Progress value={78} className="w-3/5 bg-gray-200 mr-2" />
            <p>78%</p>
          </div>
        </div>
      </div>
    </>
  );
}
