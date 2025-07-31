"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function PricingBuyButton({ plan }: { plan: "basic" | "pro" }) {
  const { toast } = useToast();

  function handleBuy() {
    toast({
      title: "Demo Purchase",
      description: `You have (demo) purchased the ${plan === "basic" ? "Basic" : "Pro"} plan!`,
      variant: "success",
    });
  }

  return (
    <Button
      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full py-2 mt-2"
      onClick={handleBuy}
      type="button"
    >
      Buy Now &rarr;
    </Button>
  );
} 