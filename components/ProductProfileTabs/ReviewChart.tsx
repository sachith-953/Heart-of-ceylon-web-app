import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export default function ReviewChart() {
  return (
    <>
      <div>
        <p className="text-xl font-semibold my-2">Customer reviews</p>

        {/* Average rating stars */}
        <div>
        <div className="flex flex-row">
            {Array.from({ length: 3 }, (_, index) => (
              <Star key={index} fill="#FFD254" strokeWidth={0} />
            ))}
            {Array.from({ length: 5 - 3 }, (_, index) => (
              <Star
                key={5 * 3 + index}
                fill="#111"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>

        <p className="my-5 text-gray-400">10,345 Global ratings</p>

        {/* Progress bars */}
        <div>
          {/* Progress bar 5 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
            <p className="pr-2 text-sky-500">5 stars</p>
            <Progress value={78} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">78%</p>
          </div>

          {/* Progress bar 4 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2 text-sky-500">4 stars</p>
            <Progress value={63} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">63%</p>
          </div>

          {/* Progress bar 3 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2 text-sky-500">3 stars</p>
            <Progress value={55} className="w-3/5 bg-gray-200 mr-2"  />
            <p className="text-sky-500">55%</p>
          </div>

          {/* Progress bar 2 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2 text-sky-500">2 stars</p>
            <Progress value={30} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">30%</p>
          </div>

          {/* Progress bar 1 star */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-4 text-sky-500">1 star</p>
            <Progress value={15} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">15%</p>
          </div>
        </div>
      </div>
    </>
  );
}
