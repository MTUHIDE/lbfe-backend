<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
          'client_name' => $this->faker->name(),
          'client_address' => $this->faker->address(),
          'client_phone_number' => $this->faker->PhoneNumber(),
          'mobility' => $this->faker->jobTitle(),
          'client_notes' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
          '#ofcancels' => 0,
        ];
    }
}
