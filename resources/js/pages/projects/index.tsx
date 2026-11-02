import { Head, Link, router } from '@inertiajs/react';
import type { Project } from '@/components/project-form';

export default function Index({ projects, flash }: { projects: Project[]; flash?: string }) {
    function remove(id: number) {
        if (confirm('Delete this project? This cannot be undone.')) {
            router.delete(`/projects/${id}`);
        }
    }

    return (
        <>
            <Head title="Manage Projects" />
            <div className="mx-auto max-w-5xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manage Projects</h1>
                    <Link href="/projects/create" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Add Project
                    </Link>
                </div>

                {flash && <div className="mb-4 rounded-md bg-green-600/20 p-3 text-sm text-green-500">{flash}</div>}

                {projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No projects yet. Click "Add Project" to create one.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Image</th>
                                    <th className="p-2">Title</th>
                                    <th className="p-2">Tech Stack</th>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((p) => (
                                    <tr key={p.id} className="border-b">
                                        <td className="p-2">
                                            {p.image ? <img src={`/storage/${p.image}`} alt={p.title} className="h-12 w-16 rounded object-cover" /> : '—'}
                                        </td>
                                        <td className="p-2">{p.title}</td>
                                        <td className="p-2">{p.tech_stack}</td>
                                        <td className="p-2">{p.date_completed.slice(0, 10)}</td>
                                        <td className="p-2">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/projects/${p.id}/edit`}
                                                    className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => remove(p.id)}
                                                    className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
