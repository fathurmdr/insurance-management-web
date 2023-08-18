<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Claim>
 */
class ClaimFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $diagnoses = [
            'Acute Appendicitis',
            'Influenza',
            'Broken Arm',
            'Pneumonia',
            'Gastroenteritis',
            'Diabetes Type 2',
            'Hypertension',
            'Asthma',
            'Urinary Tract Infection',
            'Bronchitis',
        ];

        return [
            'member_id' => $this->faker->numberBetween(1, 15),
            'provider_id' => $this->faker->numberBetween(1, 10),
            'claim_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'diagnosis' => $this->faker->randomElement($diagnoses),
            'treatment_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'claim_bill' => $this->faker->randomFloat(2, 50000, 5000000),
            'claim_amount' => null,
            'claim_status' => 'pending',
        ];
    }
}
