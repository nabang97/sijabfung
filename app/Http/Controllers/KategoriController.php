<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kategori;
use App\JabatanFungsional;

class KategoriController extends Controller
{
    public function index(){

        $kategori = response()->json(Kategori::get());

        return $kategori;
    }

    public function store(Request $request)
    {
        // Validate the request...

        $kategori = new Kategori();

        $kategori->name = $request->data['name'];

        $kategori->save();

        return response()->json(['message' => 'Insert Successfully']);
    }

    function update(Request $request){

        $kategori = Kategori::find($request->data['id']);

        $kategori->name = $request->data['name'];

        $kategori->save();

        return response()->json(['message' => 'Update Successfully']);

    }

    public function destroy(Request $request){
        $kategori = Kategori::findorfail($request->data['id']);
        
        $kategori->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }
}
