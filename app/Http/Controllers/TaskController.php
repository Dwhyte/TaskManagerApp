<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{

    /**
     * Get all tasks by project ID
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllTasks(Project $project)
    {
        $tasks = Task::where('project_id', '=' , $project->id)
            ->orderByRaw("tasks.priority_level = 'critical' DESC")
            ->orderByRaw("tasks.priority_level = 'important' DESC")
            ->orderByRaw("tasks.priority_level = 'normal' DESC")
            ->orderByRaw("tasks.priority_level = 'low' DESC")
            ->orderBy('updated_at', 'DESC')
            ->get();

        // return results in JSON format
        return response()->json(['success' => true, 'data' => $tasks], 200);
    }


    /**
     * Create a new task
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_name' => 'required',
            'description' => 'required'
        ]);

        // check if validator fails and return errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // create new task for project
        $task = Task::create([
            'project_id' => $request->project_id,
            'user_id' => Auth::user()->id,
            'task_name' => $request->task_name,
            'description' => $request->description,
            'priority_level' => $request->priority_level,
            'due_date' => $request->due_date,
//            'due_date' => Carbon::createFromFormat('YYYY-MM-DD h:i:s', $request->due_date),
            'is_completed' => $request->is_completed,
        ]);

        // return results in JSON format
        return response()->json(['success' => true, 'data' => $task], 200);
    }


    /**
     * Update Task
     * @param Task $task
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTask(Task $task, Request $request)
    {

        $validator = Validator::make($request->all(), [
            'task_name' => 'required',
            'description' => 'required'
        ]);

        // check if validator fails and return errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $task->task_name = $request->task_name;
        $task->description = $request->description;
        $task->priority_level = $request->priority_level;
        $task->due_date = $request->due_date;
        $task->is_completed = $request->is_completed;
        $task->update();

        return response()->json(['success' => true, 'data' => $task, 'message' => 'Task updated!'], 200);
    }


    /**
     * Mark task as complete
     * @param Task $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function markTaskComplete(Task $task)
    {
        $task->is_completed = true;
        $task->update();

        return response()->json(['success' => true, 'message' => 'Task updated!'], 200);
    }


    public function removeTask(Task $task)
    {
        $task->delete();
        return response()->json(['success' => true, 'message' => 'Task Removed!'], 200);
    }



}
