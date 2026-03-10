export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 border-b bg-white">

      <h1 className="text-2xl font-bold">EventEase</h1>

      <input
        type="text"
        placeholder="Search location"
        className="border rounded-lg px-4 py-2 w-96"
      />

      <div className="text-gray-600">User</div>

    </div>
  );
}