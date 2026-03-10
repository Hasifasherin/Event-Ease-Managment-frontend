interface Props {
  data: any;
}

export default function RevenueStats({ data }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm opacity-80">Total Revenue</h3>
        <p className="text-3xl font-bold mt-2">
          ₹ {data?.totalRevenue || 0}
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm opacity-80">Total Payments</h3>
        <p className="text-3xl font-bold mt-2">
          {data?.totalPayments || 0}
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm opacity-80">Success Rate</h3>
        <p className="text-3xl font-bold mt-2">
          {data?.successRate || 0}%
        </p>
      </div>

    </div>
  );
}