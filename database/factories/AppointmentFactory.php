<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
      $start = $this->faker->dateTimeBetween($startDate = '-2 months', $endDate = '+2 months', $timezone = null);
      $start_date_clone = clone $start;

      $end = $this->faker->dateTimeBetween($start, $start_date_clone->modify('+5 hours'));
        return [
          'appointment_title' => $this->faker->sentence(3),
          'appointment_date_time' => $start,
          'appointment_end_date_time' => $end,
          'appointment_notes' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
          'pickup_address' => $this->faker->address(),
          'destination_address' => $this->faker->address(),
          'is_cancelled' => 0,
          'client_id' => $this->faker->numberBetween($min = 1, $max = 15),
          'driver_id' => $this->faker->numberBetween($min = 1, $max = 15),
        ];
    }
}
