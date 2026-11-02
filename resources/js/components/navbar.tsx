import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <span className="text-lg font-bold">Mark Anthony Obina</span>
                <div className="flex gap-4 text-sm">
                    <a href="#projects">Projects</a>
                    <Link href="/projects">Manage</Link>
                </div>
            </div>
        </nav>
    );
}
