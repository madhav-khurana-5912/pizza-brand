import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Address",
      value: "123 Pizza Lane, Foodie City, 90210",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "(555) 123-4567",
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "contact@pizzabrand.com",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Business Hours",
      value: "Mon - Sun: 11:00 AM - 11:00 PM",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold font-headline text-center mb-8">
          Contact Us
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Store Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {contactDetails.map((detail, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{detail.icon}</div>
                  <div>
                    <h3 className="font-semibold">{detail.title}</h3>
                    <p className="text-muted-foreground">{detail.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
