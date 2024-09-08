import { Button } from "@/components/ui/button";
import { Selected, Membership } from "./types";

const MembershipItem = ({
  business_id,
  membership,
  setSelected,
  selected,
}: {
  business_id: string;
  membership: Membership;
  selected: Selected[];
  setSelected: (memberships: Selected[]) => void;
}) => {
  const isSelected = selected.some((item) => item.id === membership.id);

  const handleAdd = () => {
    const existingItem = selected.find((item) => item.id === membership.id);
    let updatedSelected;
    if (existingItem) {
      updatedSelected = selected.map((item) =>
        item.id === membership.id
          ? { ...item, quantity: item.quantity + 1, type: "membership" }
          : item
      );
    } else {
      updatedSelected = [
        ...selected,
        {
          id: membership.id,
          name: membership.membership_name,
          price: membership.price || 0,
          quantity: 1,
          type: "membership",
        },
      ];
    }
    setSelected(updatedSelected);
    localStorage.setItem(business_id, JSON.stringify(updatedSelected));
  };

  const handleRemove = () => {
    const existingItem = selected.find((item) => item.id === membership.id);
    let updatedSelected;
    if (existingItem && existingItem.quantity > 1) {
      updatedSelected = selected.map((item) =>
        item.id === membership.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    } else {
      updatedSelected = selected.filter((item) => item.id !== membership.id);
    }
    setSelected(updatedSelected);
    localStorage.setItem(business_id, JSON.stringify(updatedSelected));
  };

  return (
    <div
      key={membership.id}
      className="w-full p-4 px-5 border border-stroke rounded-xl flex justify-between items-center"
    >
      <div className="">
        <h2 className="text-lg text-gray-800">{membership.membership_name}</h2>
        <p className="text-sm text-gray-500">
          {membership.valid_for_days} days
        </p>
        <p className="mt-1 text-gray-800">${membership.price}</p>
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

export default MembershipItem;
