export default function StatusBadge({ status }) {
  const statusStyles = {
    Open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
    Closed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400',
    'Pending Approval': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
    'In Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}