<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Client::orderBy('client_name')->get(["id", "client_name", "client_address", "client_phone_number", "mobility", "client_notes", "#ofcancels as number_of_cancels", "created_at", "updated_at"]);
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
        $newClient = new Client;
        $newClient->client_id = $request->client["client_id"];
        $newClient->client_address = $request->client["client_address"];
        $newClient->client_phone_number = $request->client["client_phone_number"];
        $newClient->mobility = $request->client["mobility"];
        $newClient->client_notes = $request->client["client_notes"];
        $newClient->is_cancelled = 0;
    }

     /**
     * Fetch data for a single client specified by the id.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request, $id)
    {
        // Be sure to add validation
    //   $validated = $request->validate([
    //       'id' => 'required|integer|size:5',
    //   ]);
      
      $data = DB::table('clients')
                    ->where('clients.id', '=', $id)
                    ->get(['clients.id', 'clients.client_name', 'clients.client_address','clients.client_phone_number', 'clients.mobility', 'clients.client_notes','clients.#ofcancels as number_of_cancels']);
                                  
      return response()->json($data);
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
