<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tech_stack' => 'required|string|max:255',
            'project_url' => 'nullable|url',
            'repository_url' => 'nullable|url',
            'date_completed' => 'required|date',
            'image' => 'nullable|image|max:2048',
        ];
    }

    public function index()
    {
        return Inertia::render('projects/index', [
            'projects' => Project::latest()->get(),
            'flash' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('projects/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($data);

        return redirect('/projects')->with('success', 'Project added.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('projects/edit', ['project' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate($this->rules());

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $data['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($data['image']);
        }

        $project->update($data);

        return redirect('/projects')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();

        return redirect('/projects')->with('success', 'Project deleted.');
    }
}
