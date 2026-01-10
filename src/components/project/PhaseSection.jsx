import TaskItem from "./TaskItem";

export default function PhaseSection({
  phase,
  tasks,
  onToggleTask,
  onOpenGuidance,
}) {
  if (!tasks || tasks.length === 0) return null;

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="card stack-md">
      <div className="phase-header">
        <h2>{phase}</h2>
        <span className="muted">
          {completedCount} / {tasks.length}
        </span>
      </div>

      <div className="stack-sm">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggleTask}
            onOpenGuidance={onOpenGuidance}
          />
        ))}
      </div>
    </div>
  );
}
