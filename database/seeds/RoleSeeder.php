<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $memberRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Member', 'guard_name' => 'web']);
    }
}
