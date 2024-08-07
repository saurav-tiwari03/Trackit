import { HoverEffect } from "@/components/ui/card-hover-effect"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-8 flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-Merienda text-5xl">Trackit</h1>
        <p className="font-Poppins">A real time web app to manage flow of exchange</p>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}
const projects = [
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
