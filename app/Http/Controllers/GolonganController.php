<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Golongan;

class GolonganController extends Controller
{
    //
    public function index(){

        $golongan = response()->json(Golongan::get());

        return $golongan;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $golongan = new Golongan();

        $golongan->name = $request->name;

        $golongan->save();

        return response()->json(['message' => 'Insert Successfully']);
    }

    function update(Request $request){

        $golongan = Golongan::find($request->id);

        $golongan->name = $request->name;

        $golongan->save();

    }

    public function destroy(Request $request){
        $golongan = Golongan::findorfail($request->id);
        $golongan->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
