export function calculateTrendData(tasks) {
  if (!tasks || !tasks.length) return { labels: [], counts: [], completed: [], overdue: [], durations: [] };

  const today = new Date();
  const labels = [];
  const counts = [];
  const completed = [];
  const overdue = [];
  const durations = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    labels.push(dateStr);

    const active = tasks.filter((task) => {
      const start = new Date(task.startDate);
      const due = new Date(task.dueDate);
      return (
        task.status !== 'Closed' &&
        start <= date &&
        due >= date
      );
    }).length;
    counts.push(active);

    const comp = tasks.filter((task) => {
      const due = new Date(task.dueDate);
      return task.status === 'Closed' && due.toISOString().split('T')[0] <= dateStr;
    }).length;
    completed.push(comp);

    const over = tasks.filter((task) => {
      const due = new Date(task.dueDate);
      return task.status !== 'Closed' && due < date;
    }).length;
    overdue.push(over);

    const activeTasks = tasks.filter((task) => {
      const start = new Date(task.startDate);
      const due = new Date(task.dueDate);
      return task.status !== 'Closed' && start <= date && due >= date;
    });
    const avgDuration =
      activeTasks.length > 0
        ? activeTasks.reduce((sum, task) => {
            const start = new Date(task.startDate);
            const due = new Date(task.dueDate);
            return sum + (due - start) / (1000 * 60 * 60 * 24); 
          }, 0) / activeTasks.length
        : 0;
    durations.push(avgDuration);
  }

  return { labels, counts, completed, overdue, durations };
}