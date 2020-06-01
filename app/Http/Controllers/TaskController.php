<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
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
            'is_completed' => $request->is_completed,
        ]);

        // return results in JSON format
        return response()->json(['success' => true, 'data' => $task], 200);
    }



    public function setPriority(Task $task, Request $request)
    {
        $task->priority_level = $request->priority_level;
        $task->update();

        return response()->json(['success' => true, 'message' => 'Task Priority updated!'], 200);
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
