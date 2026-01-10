import { useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../hooks/useProject";
import PhaseSection from "../components/project/PhaseSection";
import TaskGuidanceModal from "../components/project/TaskGuidanceModal";
import Loader from "../components/common/Loader";

const PHASES = ["FOUNDATION", "CORE", "ADVANCED"];

export default function ProjectDashboard() {
  const { projectId } = useParams();
  const { project, loading, error, toggleTaskCompletion } =
    useProject(projectId);

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  if (loading) {
    return (
      <div className="page centered">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="page centered text-error">{error}</div>;
  }

  if (!project) return null;

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((task) => task.completed).length;

  const groupedTasks = PHASES.reduce((acc, phase) => {
    acc[phase] = project.tasks.filter((t) => t.phase === phase);
    return acc;
  }, {});

  return (
    <div className="dashboard stack-lg">
      <div className="card stack-sm">
        <p className="eyebrow">Project</p>
        <h1>{project.projectDescription}</h1>
        <p className="muted">Your project roadmap</p>
      </div>

      <div className="card stack-sm">
        <div className="phase-header">
          <span>Progress</span>
          <span className="muted">
            {completedTasks} / {totalTasks} tasks completed
          </span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          />
        </div>
      </div>

      {PHASES.map((phase) => (
        <PhaseSection
          key={phase}
          phase={phase}
          tasks={groupedTasks[phase]}
          onToggleTask={toggleTaskCompletion}
          onOpenGuidance={setSelectedTaskId}
        />
      ))}

      {selectedTaskId && (
        <TaskGuidanceModal
          projectId={projectId}
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
