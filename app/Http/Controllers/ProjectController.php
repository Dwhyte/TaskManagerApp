<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Fetch all projects for auth user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllProjects()
    {
        $user = Auth::user();
//        $projects = Project::with(['Tasks' => function ($query) {
//            $query->orderByRaw("tasks.priority_level = 'critical' DESC");
//            $query->orderByRaw("tasks.priority_level = 'important' DESC");
//            $query->orderByRaw("tasks.priority_level = 'normal' DESC");
//            $query->orderByRaw("tasks.priority_level = 'low' DESC");
//
//        }])
//            ->where('user_id', '=', $user->id)
//            ->select('id', 'user_id', 'name')
//            ->latest()
//            ->get();

        $projects = Project::where('user_id', '=', $user->id)
            ->select('id', 'user_id', 'name', 'description', 'position')
            ->orderBy('position', 'asc')
            ->latest()
            ->get();

        return response()->json(['success' => true, 'data' => $projects], 200);
    }

    /**
     * Fetch project by ID and all related tasks
     * @param Project $project_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Project $project_id)
    {
        $project = Project::with('Tasks')->find($project_id);

        return response()->json(['success' => true, 'data' => $project], 200);
    }


    /**
     * Create a new Project
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function newProject(Request $request)
    {
        // validate fields
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);


        // check if validator fails and return errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $new_project = Project::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'description' => $request->description,
            'is_completed' => $request->is_completed,
        ]);

        // return results in JSON format
        return response()->json(['success' => true, 'data' => $new_project], 200);

    }


    /**
     * Update all projects position by new index key
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function SortProjectList(Request $request)
    {
        $projectsData = $this->validate($request, [
            'projects' => 'required|array'
        ]);

        foreach ($projectsData['projects'] as $key => $project) {
            $updateProject = Project::where('id', $project['id'])->first();
            $updateProject->position = $key + 1;
            $updateProject->save();
        }

        return response()->json(['success' => true, 'message' => 'Projects list sorted!'], 200);

    }



    public function editProject(Project $project, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        // check if validator fails and return errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $project->name = $request->name;
        $project->description = $request->description;
        $project->is_completed = $request->is_completed;
        $project->save();

        return response()->json(['success' => true, 'data' => $project, 'message' => 'Project Updated!'], 200);

    }

    /**
     * Mark project as complete
     * @param Project $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function markTaskComplete(Project $project)
    {
        $project->is_completed = true;
        $project->update();

        return response()->json(['success' => true, 'message' => 'Project updated!'], 200);
    }


    /**
     * Remove a Project and all its tasks
     * @param Project $project
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function removeProject(Project $project)
    {
        $project->delete();
        return response()->json(['success' => true, 'message' => 'Project Removed!'], 200);
    }


}
