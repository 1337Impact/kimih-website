import { FaStar, FaTrash } from "react-icons/fa";
import AddReview from "./AddReview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Assuming you have a Button component
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ADeleteReview from "@/actions/appointment-actions/review-actions";

export default function AppointmentReview({
  business_id,
  appointment_id,
  review,
}: {
  business_id: string;
  appointment_id: string;
  review: {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
  } | null;
}) {

  if (review) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm relative">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={18}
                className={
                  i < review.rating ? "text-yellow-500" : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-700 mb-2">
          {review.comment || "No comment provided"}
        </div>
          <span className="text-sm text-gray-500">
            {new Date(review.created_at).toLocaleDateString()}
          </span>
        <DeleteReview review_id={review.id} />
      </div>
    );
  } else {
    return (
      <div>
        <p className="text-gray-700 mb-2">You haven&apos;t left a review yet.</p>
        <AddReview business_id={business_id} appointment_id={appointment_id} />
      </div>
    );
  }
}

function DeleteReview({ review_id }: { review_id: string }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    const res = await ADeleteReview(review_id);
    if (res.error) {
      console.log("error: ", res.error);
      toast({
        variant: "destructive",
        title: "Failed to delete review",
        description: res.error,
      });
    } else {
      toast({
        variant: "success",
        title: "Success",
        description: "Review has been deleted successfully",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-end text-start text-red-400">
        <button
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          aria-label="Delete review"
        >
          <FaTrash size={22} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-gray-200">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="dark:text-gray-300">
            This action cannot be undone. This will permanently delete this
            Review.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:border-white dark:bg-transparent dark:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 hover:bg-red-500"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
