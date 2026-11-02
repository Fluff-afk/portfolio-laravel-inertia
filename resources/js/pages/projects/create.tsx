import { Head } from '@inertiajs/react';
import ProjectForm from '@/components/project-form';

export default function Create() {
    return (
        <>
            <Head title="Add Project" />
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Add Project</h1>
                <ProjectForm />
            </div>
        </>
    );
}
