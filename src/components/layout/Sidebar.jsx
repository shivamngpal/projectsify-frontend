import { Link, useParams } from "react-router-dom";
import useUserProjects from "../../hooks/useUserProjects";

export default function Sidebar() {
    const { projects, loading, error } = useUserProjects();
    const { projectId } = useParams();

    if (loading) {
        return (
            <aside className="w-64 h-screen sticky top-[73px] hidden md:flex flex-col border-r border-white/10 bg-[rgba(16,21,33,0.85)] backdrop-blur p-4">
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-64 h-[calc(100vh-73px)] sticky top-[73px] hidden md:flex flex-col border-r border-white/10 bg-[rgba(16,21,33,0.85)] backdrop-blur overflow-y-auto">
            <div className="p-4">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Your Projects
                </h2>

                {error && (
                    <div className="text-red-400 text-sm mb-4">
                        Failed to load projects
                    </div>
                )}

                {projects.length === 0 && !error ? (
                    <p className="text-sm text-slate-500">No projects yet.</p>
                ) : (
                    <nav className="flex flex-col gap-2">
                        {projects.map((project) => (
                            <Link
                                key={project._id}
                                to={`/projects/${project._id}`}
                                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${projectId === project._id
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${projectId === project._id ? "bg-blue-400" : "bg-slate-600 group-hover:bg-slate-500"}`} />
                                <span className="truncate">{project.projectDescription}</span>
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </aside>
    );
}
