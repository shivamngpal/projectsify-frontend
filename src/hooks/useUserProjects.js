
import { useState, useEffect } from "react";
import { getUserProjects } from "../api/project.api";

export default function useUserProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                const data = await getUserProjects();
                setProjects(data.projects || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return { projects, loading, error };
}
