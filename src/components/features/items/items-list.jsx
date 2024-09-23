import { getItems } from "@/lib/items/get-items";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { Item } from "./Item";

export const ItemsList = () => {
  const { data, isLoading } = useSWR("/items", async () => {
    return getItems();
  });

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {data?.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
};
