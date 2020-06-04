<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::check()){
        return view('home');
    }
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');



Route::middleware(['auth'])->group(function () {

    /**************************************************************************
        API Points for Front End
     **************************************************************************/
    Route::group(['prefix' => 'vue'], function () {
        // Get wish lists
        Route::get('/get-projects', 'ProjectController@getAllProjects');
        Route::get('/project/{project_id}', 'ProjectController@show');

        Route::post('/add-new-project', 'ProjectController@newProject');
        Route::post('/remove-project/{project}', 'ProjectController@removeProject');

        Route::post('/project/tasks/{project}', 'TaskController@getAllTasks');
        Route::post('/add-new-task', 'TaskController@store');
        Route::post('/update/{task}', 'TaskController@updateTask');
        Route::post('/remove-task/{task}', 'TaskController@removeTask');
    });


});
