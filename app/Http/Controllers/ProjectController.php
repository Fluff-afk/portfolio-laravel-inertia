<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private function rules(?int $ignoreId = null): array
    {
        return [
            'title' => ['required', 'string', 'max:255', Rule::unique('projects', 'title')->ignore($ignoreId)],
            'description' => 'required|string',
            'tech_stack' => 'required|string|max:255',
            'project_url' => 'nullable|url',
            'repository_url' => 'nullable|url',
            'date_completed' => 'required|date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Please enter a project title.',
            'title.unique' => 'You already have a project with this title.',
            'image.max' => 'The image must not be larger than 2 MB.',
            'image.mimes' => 'Only JPG, PNG, or WEBP images are allowed.',
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
        $data = $request->validate($this->rules(), $this->messages());

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
        $data = $request->validate($this->rules($project->id), $this->messages());

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
