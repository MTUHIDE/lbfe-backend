<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
          $table->id();
          $table->dateTime('appointment_date_time', $precision = 0);
          $table->dateTime('appointment_end_date_time', $precision = 0);
          $table->string('appointment_notes', 255)->nullable();
          $table->string('appointment_title', 100);
          $table->string('pickup_address', 255);
          $table->string('destination_address', 255);
          $table->unsignedBigInteger('driver_id');
          $table->unsignedBigInteger('client_id');
          $table->timestamps();
          $table->tinyInteger('is_cancelled');

          $table->foreign('driver_id')->references('id')->on('drivers');
          $table->foreign('client_id')->references('id')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
