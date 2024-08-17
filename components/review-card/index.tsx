import { Star } from "lucide-react";
import SwiperBusinessReview from "./swiper-business-review";

function ReviewCard({
  title,
  description,
  client_name,
  client_address,
  client_image,
}: {
  title: string;
  description: string;
  client_name: string;
  client_address: string;
  client_image: string;
}) {
  return (
    <div className="bg-gray-100 shadow-lg min-w-[300px] min-h-[320px] rounded-2xl overflow-hidden p-4 hover-scale">
      <div className="flex flex-col h-full justify-between">
        <div className="">
          <div className="flex gap-1">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  className="text-black drop-shadow-md-black"
                />
              ))}
          </div>
          <h3 className="text-xl font-bold mt-4">{title}</h3>
          <p className="text-[1.1rem] text-gray-600 leading-[30px] mt-3">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={client_image}
              alt={client_name}
              className="h-12 w-12 rounded-full"
            />
            <div className="ml-2">
              <h3 className="font-bold">{client_name}</h3>
              <p className="text-gray-600 text-[.9rem]">{client_address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
export { SwiperBusinessReview };
