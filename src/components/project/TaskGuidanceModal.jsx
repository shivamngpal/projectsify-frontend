import { useEffect, useRef } from "react";
import useTaskGuidance from "../../hooks/useTaskGuidance";

export default function TaskGuidanceModal({ projectId, taskId, onClose }) {
  const { guidance, loading, error, fetchGuidance } = useTaskGuidance(
    projectId,
    taskId
  );

  const lastKeyRef = useRef(null);
  useEffect(() => {
    const key = `${projectId}:${taskId}`;
    // Avoid duplicate fetches (e.g., React StrictMode double-invoke)
    if (lastKeyRef.current !== key) {
      lastKeyRef.current = key;
      fetchGuidance();
    }
  }, [projectId, taskId, fetchGuidance]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h3>Task Guidance</h3>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        {loading && <p>Loading guidance...</p>}
        {error && <p className="text-error">{error}</p>}

        {guidance && (
          <div className="modal__content">
            <section className="stack-sm">
              <h4>Steps</h4>
              <ol className="list">
                {guidance.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </section>

            {guidance.codeSnippets?.length > 0 && (
              <section className="stack-sm">
                <h4>Code</h4>
                {guidance.codeSnippets.map((c, i) => (
                  <pre key={i} className="code-block">
                    {c.code}
                  </pre>
                ))}
              </section>
            )}

            <section className="stack-sm">
              <h4>Verification</h4>
              <p>{guidance.verification}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
