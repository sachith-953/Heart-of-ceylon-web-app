"use client";

import { useEffect, useState } from "react";
import ReviewChart from "./ReviewChart";
import ReviewComment from "./ReviewComment";

export default function Reviews() {
  interface reviewCommentDataType {
    reviewId: number;
    rating: number;
    reviewText: string;
    reviewDateTime: string;
    buyerName: string;
  }

  const [reviewComment, setReviewComment] = useState<reviewCommentDataType[]>(
    []
  );

  const fetchReviewComment = async (productId: string) => {
    // Requesting data from NextJs backend
    console.log("request sending to fetch review comment API");

    //sending request
    const res = await fetch(
      "http://localhost:3000/api/product/productProfile/reviewComment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    //printing response
    if (res.ok) {
      console.log("res" + res);
      const responseData = await res.json();
      setReviewComment(responseData);
      console.log(responseData);
    } else {
      console.log("Fetching Error!");
    }
  };

  useEffect(() => {
    fetchReviewComment("1");
  }, []);

  return (
    <>
      {/* Parent */}
      <div className="flex flex-row justify-center border-2 border-red-500">
        {/* Review chart side*/}
        <div className="border-2 border-blue-400 w-1/3">
          <ReviewChart />
        </div>

        {/* Review comments side*/}
        <div className="border-2 border-green-400 w-2/3 pl-5">
          <h3 className="text-xl font-semibold mb-2">Top reviews</h3>

          {/* comments */}
          <div className="border-2 border-pink-300">
            {/* one comment */}
            {reviewComment.map((singleComment: reviewCommentDataType) => (
              <ReviewComment
                key={singleComment.reviewId}
                comment={singleComment}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
