"use client";

import { useEffect, useState } from "react";
import ReviewChart from "./ReviewChart";
import ReviewComment from "./ReviewComment";

export default function Reviews() {

  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  interface reviewCommentDataType {
    reviewId: number;
    rating: number;
    reviewText: string;
    reviewDateTime: string;
    buyerName: string;
  }

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

  const [reviewComment, setReviewComment] = useState<reviewCommentDataType[]>(
    []
  );
  const [reviewSummary, setReviewSummary] = useState<reviewSummaryDataType | null>(null);

  const fetchReview = async (productId: string) => {
    // Requesting data from NextJs backend
    console.log("request sending to fetch review comment API");

    //sending request
    const res = await fetch(
      `${BASE_URL}/api/product/productProfile/reviewComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    //sending request to get review summary
    const resSummary = await fetch(
      `${BASE_URL}/api/product/productProfile/productReviewSummary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    //printing response
    if (res.ok && resSummary.ok) {
      const responseData = await res.json();
      const responseSummaryData = await resSummary.json();

      console.log("response data " + res);
      console.log("response summary data " + resSummary);

      // if (Array.isArray(responseData)) {
      //   setReviewComment(responseData);
      // } else {
      //   console.error('Received invalid data format for reviewComment');
      //   setReviewComment([]); // Set to empty array as fallback
      // }
      setReviewComment(responseData);
      setReviewSummary(responseSummaryData);
    } else {
      console.log("Fetching Error!");
    }
  };

  useEffect(() => {
    fetchReview("402");
  }, []);

  return (
    <>
      {/* Parent */}
      <div className="flex flex-col sm:flex-row justify-center">
        {/* Review chart side*/}
        <div className="w-full sm:w-1/3">
          {/* <ReviewChart totalCount = {reviewCount}/> */}
          <ReviewChart reviewSummaryData={reviewSummary}/>
        </div>

        {/* Review comments side*/}
        <div className="w-2/3 pl-5">
          <h3 className="text-xl font-semibold mb-4">Top reviews</h3>

          {/* comments */}
          <div className="">
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
