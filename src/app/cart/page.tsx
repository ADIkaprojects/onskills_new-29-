import type { Metadata } from "next";
import { Cart } from "@/pages/Cart";

export const metadata: Metadata = {
  title: "Shopping Cart — OnSKILL",
  description: "View and manage your shopping cart on OnSKILL",
};

export default function CartPage() {
  return <Cart />;
}
