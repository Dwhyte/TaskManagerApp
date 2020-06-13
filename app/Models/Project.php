<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';
    protected $fillable = ['user_id', 'name', 'description', 'is_completed', 'position'];

    // Relationships

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function Tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }
}
