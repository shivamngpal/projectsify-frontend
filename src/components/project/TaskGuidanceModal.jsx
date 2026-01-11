import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
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

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Task Guidance</DialogTitle>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogHeader>

        {loading && <p className="muted">Generating guidance…</p>}
        {error && <p className="text-error">{error}</p>}

        {guidance && (
          <ScrollArea className="modal__content max-h-[70vh] pr-2">
            <section className="stack-sm">
              <h4 className="text-lg font-semibold">Steps</h4>
              <ol className="list list-decimal ml-4 space-y-1">
                {guidance.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </section>

            {guidance.codeSnippets?.length > 0 && (
              <section className="stack-sm">
                <h4 className="text-lg font-semibold">Code</h4>
                {guidance.codeSnippets.map((c, i) => (
                  <pre key={i} className="code-block">
                    {c.code}
                  </pre>
                ))}
              </section>
            )}

            <section className="stack-sm">
              <h4 className="text-lg font-semibold">Verification</h4>
              <p className="muted">{guidance.verification}</p>
            </section>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
