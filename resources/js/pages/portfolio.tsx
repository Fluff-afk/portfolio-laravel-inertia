import { Head } from '@inertiajs/react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import type { Project } from '@/components/project-form';
import SectionTitle from '@/components/section-title';

export default function Portfolio({ projects }: { projects: Project[] }) {
    return (
        <>
            <Head title="My Portfolio" />
            <Navbar />

            <main className="mx-auto max-w-5xl p-6">
                <section className="py-12">
                    <h1 className="text-4xl font-bold">Hi, I'm Mark Anthony Obina</h1>
                    <p className="mt-2 text-muted-foreground">Web development student.</p>
                </section>

                <section id="projects">
                    <SectionTitle title="Projects" />
                    {projects.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No projects yet.</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.map((p) => (
                                <div key={p.id} className="overflow-hidden rounded-lg border">
                                    {p.image && <img src={`/storage/${p.image}`} alt={p.title} className="h-48 w-full object-cover" />}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{p.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                                        <p className="mt-2 text-xs">{p.tech_stack}</p>
                                        <p className="text-xs text-muted-foreground">{p.date_completed.slice(0, 10)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
