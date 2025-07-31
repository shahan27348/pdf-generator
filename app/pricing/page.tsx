import { Card, CardContent } from "@/components/ui/card";
import PricingBuyButton from "@/components/PricingBuyButton";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 ">
      <h2 className="text-3xl font-extrabold text-rose-600 mb-10 tracking-tight">PRICING</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* Basic Plan */}
        <Card className="flex-1 max-w-md p-6 bg-white text-black rounded-2xl shadow-md border border-gray-200">
          <CardContent className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Basic</h3>
            <p className="text-gray-500 mb-4">Perfect for occasional use</p>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-extrabold text-gray-900 mr-2">$9</span>
              <span className="text-xs text-gray-500 font-semibold">USD</span>
              <span className="text-base text-gray-500 font-medium ml-1">/month</span>
            </div>
            <ul className="flex flex-col gap-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-sm font-semibold">5 PDF summaries per month</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Standard processing speed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Email support</span>
              </li>
            </ul>
            <PricingBuyButton plan="basic" />
          </CardContent>
        </Card>
        {/* Pro Plan */}
        <Card className="flex-1 max-w-md p-6 bg-white rounded-2xl shadow-md border-2 border-rose-400 text-black">
          <CardContent className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Pro</h3>
            <p className="text-gray-500 mb-4">For professionals and teams</p>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-extrabold text-gray-900 mr-2">$19</span>
              <span className="text-xs text-gray-500 font-semibold">USD</span>
              <span className="text-base text-gray-500 font-medium ml-1">/month</span>
            </div>
            <ul className="flex flex-col gap-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Unlimited PDF summaries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Priority processing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>24/7 priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Markdown Export</span>
              </li>
            </ul>
            <PricingBuyButton plan="pro" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 