"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // FaRegStar is the empty star icon

interface Review {
  comment: string | null;
  created_at: string;
  rating: number;
  id: string;
  profile: string;
}

const fetchReviews = async (business_id: string) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("reviews")
    .select(
      "comment, created_at, rating, id, appointments(profiles(first_name))"
    )
    .eq("business_id", business_id)
    .order("created_at", { ascending: false })
    .limit(3);
  return (
    data?.map((review) => ({
      comment: review.comment,
      created_at: review.created_at,
      rating: review.rating,
      id: review.id,
      profile: review.appointments?.profiles?.first_name || "_",
    })) || []
  );
};

export default function ReviewsSection({
  rating,
  business_id,
}: {
  rating: {
    count: number;
    average: number;
  };
  business_id: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (rating.count === 0) return;
    fetchReviews(business_id).then((data) => {
      setReviews(data);
    });
  }, [rating, business_id]);

  if (!rating.count) return <p className="text-gray-700">No reviews yet.</p>;
  return (
    <div className="flex flex-col gap-6 items-center">
      <StarRating rating={rating.average} />
      <div className="flex flex-col gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm w-[350px] md:w-[400px]"
            >
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {Array(5)
                  .fill("")
                  .map((_, index) => (
                    <span key={index}>
                      {index + 1 <= review.rating ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </span>
                  ))}
              </div>
              <div className="text-sm text-gray-800">
                {review.comment || "No comment provided"}
              </div>
              <div className="mt-1 flex text-sm justify-between items-center mb-2">
                <div className="text-gray-600">{review.profile}</div>
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No reviews available.</p>
        )}
      </div>
      <Link href={`/s/${business_id}/reviews`}>
        <Button variant="outline">View all reviews</Button>
      </Link>
    </div>
  );
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <span key={index}>
            {index + 1 <= rating ? (
              <FaStar className="text-gray-700" />
            ) : (
              <FaRegStar className="text-gray-700" />
            )}
          </span>
        ))}
      <span className="text-gray-800 ml-2">{rating.toFixed(1)}</span>
    </div>
  );
}
