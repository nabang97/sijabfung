<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Jabatan;

class JabatanController extends Controller
{
    //
    public function index(){

        $jabatan = response()->json(Jabatan::get());

        return $jabatan;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $jabatan = new Jabatan();

        $jabatan->name = $request->name;

        $jabatan->save();

        return response()->json(['message' => 'Insert Successfully']);
    }

    function update(Request $request){

        $jabatan = Jabatan::find($request->id);

        $jabatan->name = $request->name;

        $jabatan->save();

    }

    public function destroy(Request $request){
        $jabatan = Jabatan::findorfail($request->id);
        $jabatan->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
