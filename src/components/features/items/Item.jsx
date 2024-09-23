/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export const Item = ({ item }) => {
  return (
    <div className={cn("relative rounded-md border p-3 shadow-inner")}>
      <p className="absolute right-2 top-2 font-mono">
        {formatPrice(item.price)}
      </p>
      <img
        src={item.image}
        className="aspect-square w-full rounded-md object-contain"
      />
      <p>{item.name}</p>
      <div className="flex items-end justify-end">
        <CartButton item={item} />
      </div>
    </div>
  );
};

const CartButton = ({ item }) => {
  const quantity = useCartStore((s) => s.items[item.id]?.quantity ?? 0);
  const add = useCartStore((s) => s.addItem);
  const remove = useCartStore((s) => s.removeItem);

  if (quantity === 0) {
    return (
      <Button size="sm" onClick={() => add(item)}>
        Add
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" onClick={() => remove(item)}>
        <Minus size={12} />
      </Button>
      <p>{quantity}</p>
      <Button size="sm" variant="outline" onClick={() => add(item)}>
        <Plus size={12} />
      </Button>
    </div>
  );
};
