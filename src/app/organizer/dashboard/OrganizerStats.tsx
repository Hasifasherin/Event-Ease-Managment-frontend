import { Calendar, Ticket, CreditCard } from "lucide-react";

interface Props {
  stats: any;
}

export default function OrganizerStats({ stats }: Props) {
  const cards = [
    {
      title: "My Events",
      value: stats?.totalEvents || 0,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Bookings",
      value: stats?.totalBookings || 0,
      icon: Ticket,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Revenue",
      value: `₹ ${stats?.totalRevenue || 0}`,
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl border p-6 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">
                {card.value}
              </h2>
            </div>

            <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${card.color}`}>
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}