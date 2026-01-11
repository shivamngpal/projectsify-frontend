export default function TaskItem({ task, onToggle, onOpenGuidance }) {
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onToggle(task._id, !task.completed);
  };

  const handleTaskClick = () => {
    onOpenGuidance(task._id);
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxClick}
        className="task-checkbox"
      />

      <div
        className="task-copy"
        onClick={handleTaskClick}
        role="button"
        tabIndex="0"
        onKeyPress={(e) => e.key === "Enter" && handleTaskClick()}
      >
        <p className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </p>
        <p className="task-meta">
          ⏱ {task.estimatedTime} • {task.difficulty}
        </p>
      </div>
    </div>
  );
}
