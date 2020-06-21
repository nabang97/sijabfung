<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\JenjangJabatan;
use Illuminate\Support\Facades\DB;

class JenjangJabatanController extends Controller
{
    public function index(){

        $jenjang = response()->json(JenjangJabatan::with(['detail_jabfung.jabfung.rumpun_jabatan.instansi_pembina', 'detail_jabfung.kategori'])->get());

        return $jenjang;
    }

    public function optionByIndex(Request $request){

        $jenjang = response()->json(
            JenjangJabatan::select('jenjang_jabfung.id','jenjang_jabfung.nama as jenjang','detail_jabfung.id as detail','categories.name as kategori', 'detail_jabfung.lingkup')
            ->leftJoin('detail_jabfung',function($join) {
                $join->on('jenjang_jabfung.id_detail_jabfung', '=', 'detail_jabfung.id');
            })
            ->leftJoin('categories', function($join){
                $join->on('detail_jabfung.kategori', '=', 'categories.id');
            })
            ->where('jabfung',$request->id_jabfung)->get());
        // ->with(['jabfung.rumpun_jabatan.instansi_pembina'])

        return $jenjang;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $jenjang = new JenjangJabatan();

        $jenjang->nama = $request->data['nama'];
        $jenjang->id_detail_jabfung = $request->data['detail_jabfung'];
        $jenjang->save();

        return response()->json(['message' => 'Insert Successfully']);

    }

    function update(Request $request){

        $jenjang = JenjangJabatan::find($request->data['id']);

        $jenjang->nama = $request->data['nama'];
        $jenjang->id_detail_jabfung = $request->data['detail_jabfung'];
        $jenjang->save();

        return response()->json(['message' => 'Update Successfully']);

    }

    public function destroy(Request $request){

        $jenjang = JenjangJabatan::findorfail($request->data['id']);

        $jenjang->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
