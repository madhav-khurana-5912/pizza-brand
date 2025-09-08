import { Card } from "@/components/ui/card";

export function WednesdayOffers() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-orange-500 text-white shadow-xl max-w-4xl mx-auto rounded-2xl overflow-hidden animate-slide-in-from-right">
            <div className="p-6 md:p-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 tracking-wider uppercase" style={{fontFamily: "'Arial Black', Gadget, sans-serif"}}>Wednesday Offers</h2>
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-6 text-center">
                    <div className="rounded-lg p-6 space-y-2">
                        <h3 className="text-2xl font-bold">BUY LARGE</h3>
                        <p className="text-4xl font-extrabold text-yellow-300">GET MEDIUM</p>
                        <p className="text-4xl font-extrabold text-yellow-300">FREE</p>
                    </div>
                    <div className="rounded-lg p-6 space-y-2">
                        <h3 className="text-2xl font-bold">BUY MEDIUM</h3>
                        <p className="text-4xl font-extrabold text-yellow-300">GET SMALL</p>
                        <p className="text-4xl font-extrabold text-yellow-300">FREE</p>
                    </div>
                </div>
                <div className="mt-6 text-center text-sm bg-pink-700 p-2 rounded-md">
                    <p>OFFER NOT VALID ON SIMPLY VEG. & VEG. DELIGHT</p>
                    <p>NOT VALID ON REGULAR PIZZA</p>
                </div>
            </div>
        </Card>
    </div>
  );
}
