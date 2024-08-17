import Image from "next/image";

export default function BusinessFeatureCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="p-6 py-8 rounded-xl bg-gray-100 shadow-lg">
      <div className="flex flex-col justify-center items-center">
        <Image
          className="w-20 h-20 drop-shadow-md-vilot"
          src={image}
          alt={title}
          width={300}
          height={300}
        />
        <h1 className="text-xl text-gray-800 font-bold mt-4">{title}</h1>
        <p className="text-gray-600 text-center mt-2">{description}</p>
      </div>
    </div>
  );
}
