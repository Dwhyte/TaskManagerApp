<?php

namespace App\Console\Commands\OneOff;

use App\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignAdminRoleToUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'OneOff:AssignAdminRoleToUser';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign the role of Admin to a user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $main = $this->output->createProgressBar(100);
        // find user
        $user = User::where('email', 'demoking@email.com')->first();

        $this->info(' Assigning User: '.$user->email.' to admin role .... .');

        // assign user to admin role.
        $adminRoleToAssign = Role::findByName('Admin', 'web');
        $user->assignRole($adminRoleToAssign);

        $main->finish();
        $this->info(' Assigning Complete. ');
    }
}
