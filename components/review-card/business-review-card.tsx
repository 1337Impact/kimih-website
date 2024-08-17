import { Star } from "lucide-react";

function BusinessReviewCard({
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
      <div className="flex flex-col items-center">
        <img
          src={client_image}
          alt={client_name}
          className="h-32 w-32 rounded-full"
        />
        <div className="flex flex-col h-full gap-10 justify-between">
          <div className="">
            <h3 className="text-xl font-bold mt-4 text-center">{title}</h3>
            <p className="text-[1.1rem] text-gray-600 leading-[30px] text-center mt-3">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-center">
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

export default BusinessReviewCard;
