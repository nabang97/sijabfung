<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Kondisi;

class KondisiController extends Controller
{
    //
    public function index(){

        $kondisi = Kondisi::with(['jabatans','pegawais'])->get();       

        return response()->json($kondisi);
    }

    public function periodeDetail(Request $request){

        $kondisi = Kondisi::with(['jabatans','pegawais'])->where('date_kondisi','=', $request->data)->get();       

        return response()->json($kondisi);
    }

    public function periode(){

        $kondisi = Kondisi::select(array('date_kondisi', DB::raw('COUNT(date_kondisi) as total')))->groupBy('date_kondisi')->get();       
      
        return response()->json($kondisi);
    }

    public function store(Request $request)
    {
        $kondisi = Kondisi::create([
            'date_kondisi' => $request->data['date_kondisi'],
            'pegawai' => $request->data['pegawai'],
            'jabatan' => $request->data['jabatan'],
        ]);

        $kondisi->save();

        return response()->json(['message' => 'Insert Successfully']);
    }

    function update(Request $request){
        
        $kondisi = Kondisi::where('date_kondisi','=', $request->data['periodeBeforeUpdate'])
        ->where('pegawai','=', $request->data['pegawaiBeforeUpdate'])
        ->update(['date_kondisi' => $request->data['date'], 'pegawai'=>$request->data['pegawai'], 'jabatan' => $request->data['jabatan']]);

        return response()->json(['message' => 'Update Successfully']);
    }

    public function destroy(Request $request){

        $pegawai = Kondisi::where('date_kondisi','=', $request->data['date_kondisi'])
        ->where('pegawai','=', $request->data['pegawai'])->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }

    public function destroyPegawai(Request $request){

        if($request->deletes == ''){
            return response()->json(['message' => 'Nothing to delete']);
        }else{
            for ($i=0; $i < count($request->deletes); $i++) {             
                $pegawai = Kondisi::where('date_kondisi','=', $request->data['periodeBeforeUpdate'])
                ->where('pegawai','=', $request->deletes[$i])->delete();
                }
            return response()->json(['message' => 'Delete Successfully']);
        }
          
    }

    public function updatePegawai(Request $request){

        if($request->updates == ''){
            return response()->json(['message' => 'Nothing to delete']);
        }else{
            for ($i=0; $i < count($request->updates); $i++) {             
                $kondisi = Kondisi::where('date_kondisi','=', $request->data['periodeBeforeUpdate'])
                ->where('pegawai','=', $request->updates[$i])->update(['date_kondisi' => $request->data['date_kondisi']]);
                }
            return response()->json(['message' => 'Update Successfully']);
        }
          
    }
}
