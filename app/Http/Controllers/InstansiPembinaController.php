<?php

namespace App\Http\Controllers;

use App\InstansiPembina;

use Illuminate\Http\Request;

class InstansiPembinaController extends Controller
{
    public function index(){

        $instansi = response()->json(InstansiPembina::get());

        return $instansi;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $instansi = new InstansiPembina();

        $instansi->name = $request->data['nama'];

        $instansi->save();

        return response()->json(['message' => 'Insert Successfully']);

    }

    function update(Request $request){

        $instansi = InstansiPembina::find($request->data['id']);

        $instansi->name = $request->data['name'];

        $instansi->save();

        return response()->json(['message' => 'Update Successfully']);

    }

    public function destroy(Request $request){

         $instansi = InstansiPembina::findorfail($request->data['id']);

         $instansi->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
