<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    protected $fillable = ['project_id', 'user_id', 'task_name', 'description', 'priority_level', 'is_completed'];

    // Relationships
    public function Project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
