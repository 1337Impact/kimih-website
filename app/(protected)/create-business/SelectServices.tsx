import Image from "next/image";

const servicesData = [
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
  { title: "Henna", icon: "/assets/icons/tattoo.svg" },
  { title: "Dental", icon: "/assets/icons/dental.svg" },
  { title: "Therapy", icon: "/assets/icons/therapy.png" },
  { title: "Spa", icon: "/assets/icons/spa.png" },
];

export default function SelectServices({
  services,
  setServices,
  isConfimation= false,
}: {
    services: string[];
    setServices: React.Dispatch<React.SetStateAction<string[]>>;
    isConfimation?: boolean,
}) {
  const handleSelected = (title: string) => {
    if (services.includes(title)) {
      setServices(prev => prev.filter(service => service !== title));
      return;
    }
    setServices(prev => [...prev, title]);
  };
  return (
    <div className="max-w-[550px] grid grid-cols-2 md:grid-cols-3 gap-4">
      {isConfimation && services.map((service, index) => (
        <div
          onClick={() => handleSelected(service)}
          key={index}
          className={`${
            services.includes(service) ? "bg-gray-300" : "bg-gray-100"
          } cursor-pointer p-4 flex flex-col items-center gap-2 hover:bg-gray-200 rounded-md`}
        >
          <Image
            className="w-10"
            width="100"
            height="100"
            src={servicesData.find(s => s.title === service)?.icon || ""}
            alt={service}
          />
          <h1 className="text-center text-gray-800">
            {service}
          </h1>
        </div>
      ))}
      {!isConfimation && servicesData.map((service, index) => (
        <div
          onClick={() => handleSelected(service.title)}
          key={index}
          className={`${
            services.includes(service.title) ? "bg-gray-300" : "bg-gray-100"
          } cursor-pointer p-4 flex flex-col items-center gap-2 hover:bg-gray-200 rounded-md`}
        >
          <Image
            className="w-10"
            width="100"
            height="100"
            src={ service.icon}
            alt={service.title}
          />
          <h1 className="text-lg text-center text-gray-800">
            {service.title}
          </h1>
        </div>
      ))}
    </div>
  );
}
