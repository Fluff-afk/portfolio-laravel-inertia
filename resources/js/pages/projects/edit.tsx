import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type EditProject = {
    id: number;
    title: string;
    description: string;
    tech_stack: string;
    project_url: string | null;
    repository_url: string | null;
    date_completed: string;
    image: string | null;
};

export default function Edit({ project }: { project: EditProject }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack,
        project_url: project.project_url ?? '',
        repository_url: project.repository_url ?? '',
        date_completed: project.date_completed.slice(0, 10),
        image: null as File | null,
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/projects/${project.id}`, { forceFormData: true });
    }

    const input = 'w-full rounded-md border bg-transparent p-2 text-sm';
    const error = 'mt-1 text-sm text-red-500';

    return (
        <>
            <Head title="Edit Project" />
            <form onSubmit={submit} className="mx-auto max-w-md space-y-4 p-6">
                <h1 className="text-xl font-bold">Edit Project</h1>

                <div>
                    <label className="mb-1 block text-sm font-medium">Title</label>
                    <input className={input} value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    {errors.title && <p className={error}>{errors.title}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Description</label>
                    <textarea className={input} rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    {errors.description && <p className={error}>{errors.description}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Tech stack</label>
                    <input className={input} value={data.tech_stack} onChange={(e) => setData('tech_stack', e.target.value)} />
                    {errors.tech_stack && <p className={error}>{errors.tech_stack}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Project URL (optional)</label>
                    <input className={input} value={data.project_url} onChange={(e) => setData('project_url', e.target.value)} />
                    {errors.project_url && <p className={error}>{errors.project_url}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Repository URL (optional)</label>
                    <input className={input} value={data.repository_url} onChange={(e) => setData('repository_url', e.target.value)} />
                    {errors.repository_url && <p className={error}>{errors.repository_url}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Date completed</label>
                    <input type="date" className={input} value={data.date_completed} onChange={(e) => setData('date_completed', e.target.value)} />
                    {errors.date_completed && <p className={error}>{errors.date_completed}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Image (optional, max 2 MB)</label>
                    {project.image && <img src={`/storage/${project.image}`} alt="" className="mb-2 h-16 rounded object-cover" />}
                    <input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] ?? null)} />
                    {errors.image && <p className={error}>{errors.image}</p>}
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={processing} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Update Project
                    </button>
                    <Link href="/projects" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
                </div>
            </form>
        </>
    );
}
