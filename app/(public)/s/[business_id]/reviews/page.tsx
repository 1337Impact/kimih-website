import { FaStar, FaRegStar } from "react-icons/fa"; // FaRegStar is the empty star icon
import { StarRating } from "../BusinessRating";
import { createClient } from "@/utils/supabase/server";

const fetchRating = async (business_id: string) => {
  const supabase = createClient();

  const { data, count } = await supabase
    .from("reviews")
    .select("rating", { count: "exact" })
    .eq("business_id", business_id)
    .order("created_at", { ascending: false });
  if (!data) return { count: 0, average: 0 };
  return {
    count: count || 0,
    average: count
      ? data.reduce(
          (acc: number, curr: { rating: number }) => acc + curr.rating,
          0
        ) / count
      : 0,
  };
};

const fetchReviews = async (business_id: string) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("reviews")
    .select(
      "comment, created_at, rating, id, appointments(profiles(first_name))"
    )
    .eq("business_id", business_id)
    .order("created_at", { ascending: false });
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

export default async function ReviewsSection({
  params,
}: {
  params: {
    business_id: string;
  };
}) {
  const reviews = await fetchReviews(params.business_id);
  const rating = await fetchRating(params.business_id);

  if (!rating.count) return <p className="text-gray-700">No reviews yet.</p>;
  return (
    <div className="flex flex-col gap-2 items-center pt-32">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <StarRating rating={rating.average} />
      <div className="flex flex-col gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm w-[350px]"
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
              <div className="text-sm text-gray-700">
                {review.comment || "No comment provided"}
              </div>
              <div className="mt-1 flex text-sm justify-between items-center mb-2">
                <div className="text-gray-800">{review.profile}</div>
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
    </div>
  );
}
