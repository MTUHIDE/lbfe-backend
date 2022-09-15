<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DriverFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
          'driver_name' => $this->faker->name(),
          'driver_address' => $this->faker->address(),
          'driver_phone_number' => $this->faker->PhoneNumber(),
          'insurance_type_d' => $this->faker->company(),
          'driver_notes' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
        ];
    }
}
