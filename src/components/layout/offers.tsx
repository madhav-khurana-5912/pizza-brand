import { Card } from "@/components/ui/card";
import { Ticket } from "lucide-react";

export function WednesdayOffers() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-xl max-w-4xl mx-auto rounded-2xl overflow-hidden animate-slide-in-from-right">
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider uppercase" style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }}>
              Wednesday Offers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-6 space-y-2 border border-white/20">
              <h3 className="text-3xl font-extrabold text-yellow-300">BUY 1 GET 1</h3>
              <p className="text-2xl font-bold">ON MEDIUM PIZZA</p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Ticket className="h-5 w-5" />
                <span className="font-semibold text-lg">CODE: FSOF</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 space-y-2 border border-white/20">
              <h3 className="text-3xl font-extrabold text-yellow-300">BUY 1 GET 1</h3>
              <p className="text-2xl font-bold">ON LARGE PIZZA</p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Ticket className="h-5 w-5" />
                <span className="font-semibold text-lg">CODE: FSOF</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-sm bg-black/20 p-2 rounded-md">
            <p>Offer valid on App & Web | T&C Apply</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
