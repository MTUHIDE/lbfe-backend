<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use App\Models\Driver;
use App\Models\Client;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      // if($request->ajax())
      // {
      $validated = $request->validate([
          'start' => 'required|date_format:Y-m-d\TH:i:sP',
          'end' => 'required|date_format:Y-m-d\TH:i:sP',
      ]);

      $start_date_time = $request["start"];
      $end_date_time = $request["end"];

      // Format the date_time to fit MS SQL Server standard
     $start_date_time = Carbon::parse($start_date_time);
     $start_date_time->setTimezone('UTC');
     $start_date_time = $start_date_time->format('Y-m-d H:i:s.v');

     $end_date_time = Carbon::parse($end_date_time);
     $end_date_time->setTimezone('UTC');
     $end_date_time = $end_date_time->format('Y-m-d H:i:s.v');

        $data = DB::table('appointments')
                       ->join('drivers', 'appointments.driver_id', '=', 'drivers.id')
                       ->join('clients', 'appointments.client_id', '=', 'clients.id')
                       ->whereDate('appointment_date_time', '>=', $start_date_time)
                       ->whereDate('appointment_date_time', '<=', $end_date_time)
                       // ->get(['client_name as title', 'appointment_date_time as start']);
                       ->get(['appointments.id', 'clients.mobility as mobility', 'pickup_address', 'destination_address', 'appointment_notes', 'appointment_title as title', 'client_name', 'driver_name', 'appointment_date_time as start', 'appointment_end_date_time as end']);
            return response()->json($data);
      // }
    // return view('full-calender');
    }

    /**
     * Fetch data for a single appointment specified by the id.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request, $id)
    {
      // $validated = $request->validate([
      //     'id' => 'required',
      // ]);
      // return "yep";
      $data = DB::table('appointments')
                     ->join('drivers', 'appointments.driver_id', '=', 'drivers.id')
                     ->join('clients', 'appointments.client_id', '=', 'clients.id')
                     ->where('appointments.id', '=', $id)
                     ->get(['appointments.id', 'clients.id as elder_id', 'drivers.id as driver_id', 'appointment_title', 'clients.mobility as mobility', 'pickup_address', 'destination_address', 'appointment_notes', 'appointment_title as title', 'client_name', 'driver_name', 'appointment_date_time as start', 'appointment_end_date_time as end']);

      return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

      // Ensure user data is provided and within length requirement
      $validated = $request->validate([
        'driverId' => 'required',
        'clientId' => 'required',
          'clientNotes' => 'max:255',
          'appDate' => 'required|date_format:Y-m-d\TH:i',
          'appEndDate' => 'required|date_format:Y-m-d\TH:i',
          'pickupAddress' => 'required|max:255',
          'title' => 'required|max:100',
          'dropoffAddress' => 'required|max:255',
      ]);

      $newAppointment = new Appointment;
      $date_time = $request["appDate"];

       // Format the date_time to fit MS SQL Server standard
      $date_time = Carbon::createFromFormat('Y-m-d\TH:i', $date_time, 'America/Detroit');
      $date_time->setTimezone('UTC');
      $date_time = $date_time->format('Y-m-d H:i:s.v');

      $newAppointment->appointment_date_time = $date_time;


      $end_date_time = $request["appEndDate"];
      // Format the date_time to fit MS SQL Server standard
      $end_date_time = Carbon::createFromFormat('Y-m-d\TH:i', $end_date_time, 'America/Detroit');
      $end_date_time->setTimezone('UTC');
      $end_date_time = $end_date_time->format('Y-m-d H:i:s.v');

      $newAppointment->appointment_end_date_time = $end_date_time;

      $newAppointment->appointment_notes = $request["clientNotes"];
      $newAppointment->appointment_title = $request["title"];
      $newAppointment->pickup_address = $request["pickupAddress"];
      $newAppointment->destination_address = $request["dropoffAddress"];
      $newAppointment->driver_id = $request["driverId"];
      $newAppointment->client_id = $request["clientId"];
      $newAppointment->is_cancelled = 0;
      $newAppointment->save();

      return $newAppointment;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //Find id
        $existingAppointment= Appointment::find( $id );
        //Check appointment existence
        if(!$existingAppointment){
            return "Appointment not found.";
        }
        // show the edit form and pass the appointment
        return View::make('Appointment.edit')
            ->with('Appointment', $existingAppointment);

    }

    /**
     * Update the specified date in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateDate(Request $request, $id)
    {
        //Validate
        $validated = $request->validate([
            'start' => 'required',
            'end' => 'required',
        ]);

        //Find id
        $existingAppointment = Appointment::find( $id );
        if(!$existingAppointment){
            return "Appointment not found.";
        }
        //Update data
        if(isset($request['start'])){
            $date_time = $request["start"];
            // Format the date_time to fit MS SQL Server standard
            $date_time = Carbon::parse($date_time);
            $date_time->setTimezone('UTC');
            $date_time = $date_time->format('Y-m-d H:i:s.v');
            $existingAppointment->appointment_date_time = $date_time;
        }
        if(isset($request['end'])){
            $end_date_time = $request["end"];
            // Format the date_time to fit MS SQL Server standard
            $end_date_time = Carbon::parse($end_date_time);
            $end_date_time->setTimezone('UTC');
            $end_date_time = $end_date_time->format('Y-m-d H:i:s.v');
        $existingAppointment->appointment_end_date_time = $end_date_time;
        }

        $existingAppointment->save();
        return $existingAppointment;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Validate
        $validated = $request->validate([
            'driverId' => 'required',
            'clientId' => 'required',
            'clientNotes' => 'max:255',
            'appDate' => 'required|date_format:Y-m-d\TH:i',
            'appEndDate' => 'required|date_format:Y-m-d\TH:i',
            'pickupAddress' => 'required|max:255',
            'title' => 'required|max:100',
            'dropoffAddress' => 'required|max:255',
        ]);
        
       

        //Find id
        $existingAppointment = Appointment::find( $id );
        if(!$existingAppointment){
            return "Appointment not found.";
        }
        //Update data
        if(isset($request['clientNotes'])){
            $existingAppointment->appointment_notes = $request['clientNotes'];
        }
        if(isset($request['appDate'])){
            $date_time = $request["appDate"];
            // Format the date_time to fit MS SQL Server standard
           $date_time = Carbon::createFromFormat('Y-m-d\TH:i', $date_time, 'America/Detroit');
           $date_time->setTimezone('UTC');
           $date_time = $date_time->format('Y-m-d H:i:s.v');
        $existingAppointment->appointment_date_time = $date_time;
        }
        if(isset($request['appEndDate'])){
            $end_date_time = $request["appEndDate"];
            // Format the date_time to fit MS SQL Server standard
           $end_date_time = Carbon::createFromFormat('Y-m-d\TH:i', $end_date_time, 'America/Detroit');
           $end_date_time->setTimezone('UTC');
           $end_date_time = $end_date_time->format('Y-m-d H:i:s.v');
        $existingAppointment->appointment_end_date_time = $end_date_time;
        }
        if(isset($request['pickupAddress'])){
            $existingAppointment->pickup_address = $request['pickupAddress'];
        }
        if(isset($request['title'])){
            $existingAppointment->appointment_title = $request['title'];
        }
        if(isset($request['dropoffAddress'])){
            $existingAppointment->destination_address = $request['dropoffAddress'];
        }
        if(isset($request['driverId'])){
            $existingAppointment->driver_id = $request['driverId'];
        }
        if(isset($request['clientId'])){
            $existingAppointment->client_id = $request['clientId'];
        }

        $existingAppointment->save();
        return $existingAppointment;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $existingAppointment = Appointment::find($id);

        if($existingAppointment){
            $existingAppointment->delete();
            return "Appointment successfully deleted.";
        }
        return "Item not found.";
    }
}
