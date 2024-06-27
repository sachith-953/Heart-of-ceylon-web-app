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

const formatDateTime = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

const ReviewComment: React.FC<childProp> = ({ comment }) => {
  const rating = 3;

  return (
    <>
      {/* parent (single comment)*/}
      <div className="bg-gray-100 hover:bg-gray-300 my-2">
        {/* buyer name */}
        <div>
          <p className="font-medium">{comment.buyerName}</p>
        </div>

        {/* rating stars */}
        <div>
          <div className="flex flex-row">
            {Array.from({ length: comment.rating }, (_, index) => (
              <Star key={index} fill="#FFD254" strokeWidth={0} />
            ))}
            {Array.from({ length: 5 - comment.rating }, (_, index) => (
              <Star
                key={5 * comment.rating + index}
                fill="#111"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>

        {/* date and text */}

        <div>
          <p className="text text-gray-400 text-sm">{formatDateTime(comment.reviewDateTime)}</p>
          <p className="text">{comment.reviewText}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewComment;
