<?php

namespace App\Http\Controllers;

use App\RumpunJabatan;

use App\InstansiPembina;

use Illuminate\Http\Request;

class RumpunJabatanController extends Controller
{
    public function index(){

        $rumpun = response()->json(RumpunJabatan::with(['instansi_pembina'])->get());

        return $rumpun;
    }

    public function optionByIndex(Request $request){

        $rumpun = response()->json(RumpunJabatan::with(['instansi_pembina'])->where('id_instansi', '=', $request->id)->get());

        return $rumpun;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $rumpun = new RumpunJabatan();

        $rumpun->nama = $request->data['nama'];

        $rumpun->id_instansi = $request->data['instansi'];

        $rumpun->save();

        return response()->json(['message' => 'Insert Successfully']);

    }

    function update(Request $request){

        $rumpun = RumpunJabatan::find($request->data['id']);

        $rumpun->nama = $request->data['name'];

        $rumpun->id_instansi = $request->data['instansi'];

        $rumpun->save();

        return response()->json(['message' => 'Update Successfully']);

    }

    public function destroy(Request $request){

        $rumpun = RumpunJabatan::findorfail($request->data['id']);

        $rumpun->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
