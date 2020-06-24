<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\JabatanFungsional;

use App\RumpunJabatan;
use DataTables;

class JabatanFungsionalController extends Controller
{
    //

    public function index(){

        $jabfung = response()->json(JabatanFungsional::with(['rumpun_jabatan.instansi_pembina'])->get());

        return $jabfung;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $jabfung = new JabatanFungsional();

        $jabfung->nama = $request->data['name'];
        $jabfung->id_rumpun_jabatan = $request->data['rumpun'];

        $jabfung->save();

        return response()->json(['message' => 'Insert Successfully']);

    }

    public function optionByIndex(Request $request){

        $jabfung = response()->json(JabatanFungsional::with(['rumpun_jabatan'])->where('id_rumpun_jabatan', '=', $request->id)->get());

        return $jabfung;
    }

    function update(Request $request){

        $jabfung = JabatanFungsional::find($request->data['id']);

        $jabfung->nama = $request->data['nama'];
        $jabfung->id_rumpun_jabatan = $request->data['rumpun'];

        $jabfung->save();

        return response()->json(['message' => 'Update Successfully']);

    }

    public function destroy(Request $request){

        $jabfung = JabatanFungsional::findorfail($request->data['id']);

        $jabfung->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
