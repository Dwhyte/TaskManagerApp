<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
//        !Auth::user()->hasRole('Admin')
        return view('admin.index');
    }


    /**
     * Get all users, including their roles.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers()
    {
        $users = User::withCount('Projects', 'Tasks')
            ->with(['roles' => function($q) {
                $q->select('name');
            }])
            ->get();
        return response()->json(['success' => true, 'data' => $users], 200);
    }


    /**
     * Delete User
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function removeUser(User $user)
    {
        $user->delete();
        return response()->json(['success' => true, 'message' => 'User Removed!'], 200);
    }
}
