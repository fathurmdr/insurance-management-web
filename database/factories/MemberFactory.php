<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    protected $model = Member::class;

    public function definition()
    {
        $activeStatus = $this->faker->randomElement(['active', 'terminated']);

        return [
            'name' => $this->faker->name,
            'address' => $this->faker->address,
            'phone_number' => '08' . $this->faker->numerify('##########'),
            'email' => $this->faker->unique()->safeEmail,
            'status' => $activeStatus,
            'registration_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'membership_start_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'membership_end_date' => $this->faker->dateTimeBetween('now', '+2 years'),
            'termination_date' => $activeStatus == 'terminated' ? $this->faker->dateTimeBetween('now', '+2 years') : null,
        ];
    }
}
