import Image from "next/image";

const businesses = [
  { title: "Nail services", icon: "/assets/icons/nail.svg" },
  { title: "Haircuts & styling", icon: "/assets/icons/haircut.svg" },
  { title: "Eyebrows & lashes", icon: "/assets/icons/eyebrows.svg" },
  {
    title: "Injectables & fillers",
    icon: "/assets/icons/injectables.svg",
  },
  { title: "Makeup", icon: "/assets/icons/makeup.svg" },
  { title: "Massage", icon: "/assets/icons/massage.png" },
  {
    title: "Hair extensions",
    icon: "/assets/icons/hair-extensions.svg",
  },
  { title: "Hair removal", icon: "/assets/icons/hair-removal.svg" },
  { title: "Tattoo & piercing", icon: "/assets/icons/tattoo.svg" },
  { title: "Dental", icon: "/assets/icons/dental.svg" },
  { title: "Therapy", icon: "/assets/icons/therapy.png" },
  { title: "Spa", icon: "/assets/icons/spa.png" },
];

export default function PickBusiness() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {businesses.map((business, index) => (
        <div
          key={index}
          className="py-4 flex flex-col items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <Image
            className="w-10"
            width="100"
            height="100"
            src={business.icon}
            alt={business.title}
          />
          <h1 className="text-lg text-center text-gray-800">{business.title}</h1>
        </div>
      ))}
    </div>
  );
}
