import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";


interface reviewSummaryDataType {
  averageStarRating: number;
  totalNumberOfReviews: number;
  ratingDistribution:{
    oneStarPercentage: number;
    twoStarPercentage: number;
    threeStarPercentage: number;
    fourStarPercentage: number;
    fiveStarPercentage: number;
  }
}

interface childProp {
  reviewSummaryData: reviewSummaryDataType | null;
}

const ReviewChart: React.FC<childProp> = ({ reviewSummaryData }) => {

  console.log(reviewSummaryData);
  
  return (
    <>
      <div>
        <p className="text-xl font-semibold my-2">Customer reviews</p>

        {/* Average rating stars */}
        <div>
        <div className="flex flex-row">
            {Array.from({ length: reviewSummaryData?.averageStarRating ?? 0}, (_, index) => (
              <Star key={index} fill="#FFD254" strokeWidth={0} />
            ))}
            {Array.from({ length: 5 - (reviewSummaryData?.averageStarRating ?? 0)}, (_, index) => (
              <Star
                key={5 * 3 + index}
                fill="#111"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>

        <p className="my-5 text-gray-400">{`${reviewSummaryData?.totalNumberOfReviews} Global reviews`}</p>

        {/* Progress bars */}
        <div>
          {/* Progress bar 5 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
            <p className="pr-2 text-sky-500">5 stars</p>
            <Progress value={reviewSummaryData?.ratingDistribution.fiveStarPercentage} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">{`${reviewSummaryData?.ratingDistribution.fiveStarPercentage}%`}</p>
          </div>

          {/* Progress bar 4 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2 text-sky-500">4 stars</p>
            <Progress value={reviewSummaryData?.ratingDistribution.fourStarPercentage} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">{`${reviewSummaryData?.ratingDistribution.fourStarPercentage}%`}</p>
          </div>

          {/* Progress bar 3 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2 text-sky-500">3 stars</p>
            <Progress value={reviewSummaryData?.ratingDistribution.threeStarPercentage} className="w-3/5 bg-gray-200 mr-2"  />
            <p className="text-sky-500">{`${reviewSummaryData?.ratingDistribution.threeStarPercentage}%`}</p>
          </div>

          {/* Progress bar 2 stars */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-2 text-sky-500">2 stars</p>
            <Progress value={reviewSummaryData?.ratingDistribution.twoStarPercentage} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">{`${reviewSummaryData?.ratingDistribution.twoStarPercentage}%`}</p>
          </div>

          {/* Progress bar 1 star */}
          <div className="px-5 my-3 flex flex-row items-center">
          <p className="pr-4 text-sky-500">1 star</p>
            <Progress value={reviewSummaryData?.ratingDistribution.oneStarPercentage} className="w-3/5 bg-gray-200 mr-2" />
            <p className="text-sky-500">{`${reviewSummaryData?.ratingDistribution.oneStarPercentage}%`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewChart;
