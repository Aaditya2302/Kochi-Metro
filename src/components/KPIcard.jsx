export default function KPIcard({ icon, title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-indigo-50 flex items-center justify-center rounded">
        <div className="text-indigo-600">{icon}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
