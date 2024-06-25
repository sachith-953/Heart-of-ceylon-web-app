import { Star } from "lucide-react";

interface reviewCommentDataType {
  reviewId: number;
  rating: number;
  reviewText: string;
  reviewDateTime: string;
  buyerName: string;
}

interface childProp {
  comment: reviewCommentDataType;
}

const ReviewComment: React.FC<childProp> = ({ comment }) => {
  const rating = 3;

  return (
    <>
      {/* parent */}
      <div className="bg-gray-100 hover:bg-gray-300 my-2">
        {/* buyer name */}
        <div>
          <p>{comment.buyerName}</p>
        </div>

        {/* rating */}
        <div>
          <div className="flex flex-row">
            {Array.from({ length: rating }, (_, index) => (
              <Star key={index} fill="#FFD254" strokeWidth={0} />
            ))}
            {Array.from({ length: 5 - rating }, (_, index) => (
              <Star key={5 * rating + index} fill="#111" strokeWidth={0} />
            ))}
          </div>
        </div>

        {/* date and text */}
        <div>
          <p>{comment.reviewDateTime}</p>
          <p>{comment.reviewText}</p>
        </div>
      </div>

    
    </>
  );
};

export default ReviewComment;
