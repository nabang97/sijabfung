<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DetailJabfung;

class DetailJabfungController extends Controller
{
    //

    public function index(){

        $detail = response()->json(DetailJabfung::with(['jabfung.rumpun_jabatan.instansi_pembina', 'kategori'])->get());

        return $detail;
    }

    public function check(Request $request){
        $detail = DetailJabfung::where('jabfung', $request->data['jabatan'])->where('kategori',$request->data['kategori'])->where('lingkup', $request->data['lingkup'])->first();
        
        return $detail;
    }

    public function optionByIndex(Request $request){

        $detail = response()->json(DetailJabfung::where('jabfung', $request->id_jabfung)->with(['jabfung', 'kategori'])->get());
        // ->with(['jabfung.rumpun_jabatan.instansi_pembina'])

        return $detail;
    }


    public function store(Request $request){
        $detail = new DetailJabfung();
        $detail->jabfung = $request->data['jabatan'];
        $detail->kategori = $request->data['kategori'];
        $detail->lingkup = $request->data['lingkup'];
        $detail->save();

        return $request;
        // return response()->json(['message' => 'Insert Successfully']);
    }

    function update(Request $request){

        $jabfungCheck = DetailJabfung::where('jabfung', $request->data['jabfung'])->where('kategori',$request->data['kategori'])->where('lingkup', $request->data['lingkup'])->first();

        if($jabfungCheck){
           return  response()->json(['error'=>true,'message' => 'Data sudah ada']);
        }
        $jabfung = DetailJabfung::find($request->data['id']);
        $jabfung->jabfung = $request->data['jabfung'];
        // $jabfung->kategori =$request->data['kategori'];
        // $jabfung->lingkup =$request->data['lingkup'];
        $jabfung->save();

        return response()->json(['error'=>false,'message' => 'Update Successfully']);

    }

    function destroy(Request $request){
        
        $jabfung = DetailJabfung::find($request->data['id']);
        $jabfung->delete();

        return response()->json(['error'=>false,'message' => 'Update Successfully']);

    }
}
