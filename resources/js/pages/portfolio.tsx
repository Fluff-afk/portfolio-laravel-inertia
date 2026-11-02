import { Head, Link } from '@inertiajs/react';

type Item = {
    id: number;
    title: string;
    description: string;
    tech_stack: string;
    date_completed: string;
    image: string | null;
};

export default function Portfolio({ projects }: { projects: Item[] }) {
    return (
        <>
            <Head title="My Portfolio" />

            <nav className="border-b">
                <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
                    <span className="text-lg font-bold">Mark Anthony Obina</span>
                    <div className="flex gap-4 text-sm">
                        <a href="#projects">Projects</a>
                        <Link href="/projects">Manage</Link>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-5xl p-6">
                <section className="py-12">
                    <h1 className="text-4xl font-bold">Hi, I'm Mark Anthony Obina</h1>
                    <p className="mt-2 text-sm">Web development student.</p>
                </section>

                <section id="projects">
                    <h2 className="mb-6 text-2xl font-bold">Projects</h2>
                    {projects.length === 0 ? (
                        <p className="text-sm">No projects yet.</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.map((p) => (
                                <div key={p.id} className="overflow-hidden rounded-lg border">
                                    {p.image && <img src={`/storage/${p.image}`} alt={p.title} className="h-48 w-full object-cover" />}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{p.title}</h3>
                                        <p className="mt-1 text-sm">{p.description}</p>
                                        <p className="mt-2 text-xs">{p.tech_stack}</p>
                                        <p className="text-xs">{p.date_completed.slice(0, 10)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className="mt-12 border-t p-6 text-center text-sm">© 2026 Mark Anthony Obina</footer>
        </>
    );
}
