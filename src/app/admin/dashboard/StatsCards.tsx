import {
  Users,
  Calendar,
  Ticket,
  CreditCard,
  IndianRupee,
  UserCheck,
} from "lucide-react";

interface Props {
  stats: any;
}

export default function StatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Organizers",
      value: stats.totalOrganizers,
      icon: UserCheck,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Events",
      value: stats.totalEvents,
      icon: Ticket,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Payments",
      value: stats.totalPayments,
      icon: CreditCard,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Revenue",
      value: `₹ ${stats.totalRevenue}`,
      icon: IndianRupee,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h2 className="text-3xl font-bold mt-1 text-gray-800">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg ${card.color}`}
            >
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}