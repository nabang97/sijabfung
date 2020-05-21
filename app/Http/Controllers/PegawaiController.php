<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Pegawai;

class PegawaiController extends Controller
{
    //
    public function index(){

        $pegawai = Pegawai::with('golongans')->get();       

        return response()->json($pegawai);
    }

    public function store(Request $request)
    {
        // Validate the request...

        // $pegawai = new Pegawai();

        // $pegawai->name = $request->name;
        $pegawai = Pegawai::create([
            'nip' => $request->nip,
            'name' => $request->name,
            'birthday_date' => $request->birthday_date,
            'birthday_place' => $request->birthday_place,
        ]);

        $pegawai->save();

        return response()->json(['message' => 'Insert Successfully']);
    }

    function update(Request $request){

        $pegawai = Pegawai::find($request->id);

        $pegawai->name = $request->name;

        $pegawai->save();

    }

    public function destroy(Request $request){

        $pegawai = Pegawai::findorfail($request->id);

        $pegawai->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
