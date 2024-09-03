import { Button } from "@/components/ui/button";
import { Selected, Service } from "./types";

const ServiceItem = ({
  business_id,
  service,
  setSelected,
  selected,
}: {
  business_id: string;
  service: Service;
  selected: Selected[];
  setSelected: (services: Selected[]) => void;
}) => {
  const isSelected = selected.some((item) => item.id === service.id);

  const handleAdd = () => {
    const existingItem = selected.find((item) => item.id === service.id);
    let updatedSelected;
    if (existingItem) {
      updatedSelected = selected.map((item) =>
        item.id === service.id
          ? { ...item, quantity: item.quantity + 1, type: "service" }
          : item
      );
    } else {
      updatedSelected = [
        ...selected,
        {
          id: service.id,
          name: service.service_name,
          price: service.price || 0,
          quantity: 1,
          type: "service",
          duration: service.duration || 0,
        },
      ];
    }
    setSelected(updatedSelected);
    localStorage.setItem(business_id, JSON.stringify(updatedSelected));
  };

  const handleRemove = () => {
    const existingItem = selected.find((item) => item.id === service.id);
    let updatedSelected;
    if (existingItem && existingItem.quantity > 1) {
      updatedSelected = selected.map((item) =>
        item.id === service.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      updatedSelected = selected.filter((item) => item.id !== service.id);
    }
    setSelected(updatedSelected);
    localStorage.setItem(business_id, JSON.stringify(updatedSelected));
  };

  return (
    <div
      key={service.id}
      className="w-full p-4 px-5 border border-stroke rounded-xl flex justify-between items-center"
    >
      <div className="">
        <h2 className="text-lg text-gray-800">{service.service_name}</h2>
        <p className="text-sm text-gray-500">{service.duration} min</p>
        <p className="mt-1 text-gray-800">${service.price}</p>
      </div>
      <div className="flex items-center gap-2">
        {isSelected ? (
          <Button variant={"outline"} onClick={handleRemove} className="mt-2">
            Remove
          </Button>
        ) : (
          <Button onClick={handleAdd} className="mt-2">
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceItem;
