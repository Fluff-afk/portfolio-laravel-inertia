import { Link, useForm } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';

export type Project = {
    id: number;
    title: string;
    description: string;
    tech_stack: string;
    project_url: string | null;
    repo_url: string | null;
    image: string | null;
    date_completed: string;
};

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{error}</p>}
        </div>
    );
}

const inputClass = 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm';

export default function ProjectForm({ project }: { project?: Project }) {
    const isEdit = Boolean(project);

    const { data, setData, post, processing, errors } = useForm({
        title: project?.title ?? '',
        description: project?.description ?? '',
        tech_stack: project?.tech_stack ?? '',
        project_url: project?.project_url ?? '',
        repo_url: project?.repo_url ?? '',
        date_completed: project?.date_completed?.slice(0, 10) ?? '',
        image: null as File | null,
        _method: isEdit ? 'put' : 'post',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(isEdit ? `/projects/${project!.id}` : '/projects', { forceFormData: true });
    }

    return (
        <form onSubmit={submit}>
            <Field label="Title" error={errors.title}>
                <input className={inputClass} value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </Field>

            <Field label="Description" error={errors.description}>
                <textarea className={inputClass} rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </Field>

            <Field label="Tech stack (example: HTML, CSS, Laravel)" error={errors.tech_stack}>
                <input className={inputClass} value={data.tech_stack} onChange={(e) => setData('tech_stack', e.target.value)} />
            </Field>

            <Field label="Project URL (optional)" error={errors.project_url}>
                <input className={inputClass} value={data.project_url} onChange={(e) => setData('project_url', e.target.value)} />
            </Field>

            <Field label="Repository URL (optional)" error={errors.repo_url}>
                <input className={inputClass} value={data.repo_url} onChange={(e) => setData('repo_url', e.target.value)} />
            </Field>

            <Field label="Date completed" error={errors.date_completed}>
                <input type="date" className={inputClass} value={data.date_completed} onChange={(e) => setData('date_completed', e.target.value)} />
            </Field>

            <Field label="Image (optional, max 2 MB)" error={errors.image}>
                <input type="file" className={inputClass} onChange={(e) => setData('image', e.target.files?.[0] ?? null)} />
            </Field>

            <div className="flex gap-3">
                <button type="submit" disabled={processing} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    {processing ? 'Saving...' : isEdit ? 'Update Project' : 'Save Project'}
                </button>
                <Link href="/projects" className="rounded-md border px-4 py-2 text-sm">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
