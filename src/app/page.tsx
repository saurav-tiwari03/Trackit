import { HoverEffect } from "@/components/ui/card-hover-effect"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-8 flex items-center justify-center h-screen">
      <HoverEffect items={projects} />

    </div>
  );
}
export const projects = [
  {
    title: "Make Payment",
    description:
      "Send money with just scan code and amount",
    link: "/payment/send",
  },
  {
    title: "Recieve Payment",
    description:
      "Send money with show QR code and recieve money",
    link: "/payment/recieve",
  },
  {
    title: "Payment history",
    description:
      "Past payment records",
    link: "/payment/history",
  }
];
