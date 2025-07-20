export default function RecentActivity({ activities }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}