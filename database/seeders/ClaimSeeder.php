<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Claim;

class ClaimSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Claim::factory(5)->create();
    }
}
