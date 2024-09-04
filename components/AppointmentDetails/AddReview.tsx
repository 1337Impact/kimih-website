"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ACreateReview } from "@/actions/appointment-actions/review-actions";

const createReviewSchema = z.object({
  review: z.string().max(255, "Review must be less than 255 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating can be at most 5 stars"),
});

export default function AddReview({
  business_id,
  appointment_id,
}: {
  business_id: string;
  appointment_id: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    review: "",
    rating: 0,
  });
  const [error, setError] = useState({
    review: "",
    rating: "",
  });

  const handleClose = () => {
    setIsOpen(false);
    setData({
      review: "",
      rating: 0,
    });
    setError({
      review: "",
      rating: "",
    });
  };

  const handleRating = (value: number) => {
    setData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    setError({
      review: "",
      rating: "",
    });

    const result = createReviewSchema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        setError((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      return;
    }
    const res = await ACreateReview({
      rating: data.rating,
      comment: data.review,
      business_id,
      appointment_id,
    });

    if (res.error) {
      toast({
        variant: "destructive",
        title: "Failed to create review. Please try again.",
      });
    } else {
      router.refresh();
      toast({
        variant: "success",
        title: "Success",
        description: "Review has been submitted successfully.",
      });
      handleClose();
    }
    setData({ review: "", rating: 0 });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger>
        <button
          onClick={() => setIsOpen(true)}
          className="text-nowrap rounded-lg bg-gray-900 px-5 py-2 text-lg text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Add Review
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-gray-200">
            Add Review
          </AlertDialogTitle>
          <div className="w-full pt-2">
            <label
              className="mb-3 block font-medium text-black dark:text-white"
              htmlFor="review"
            >
              How was your experience in this salon?
            </label>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={30}
                  className={`cursor-pointer ${
                    data.rating > i ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleRating(i + 1)}
                />
              ))}
            </div>
            {error.rating && (
              <p className="mb-3 text-xs font-medium text-red-500">
                {error.rating}
              </p>
            )}
            <textarea
              className="mt-4 w-full rounded border border-stroke bg-gray-50 px-3 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              name="review"
              id="review"
              rows={3}
              placeholder="Write your review here..."
              value={data.review}
              onChange={handleChanges}
            />
            {error.review && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {error.review}
              </p>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleClose}
            className="dark:border-white dark:bg-transparent dark:text-white"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gray-700 hover:bg-gray-500"
            onClick={handleSubmit}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
