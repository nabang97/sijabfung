<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\DasarHukum;
use Illuminate\Support\Facades\Storage;

class DasarHukumController extends Controller
{

    public function index()
    {
      $dasar = response()->json(DasarHukum::get());

        return $dasar;
      // return view('admin.dasar_hukum');
    }

    public function showPost()
    {
      $dasar = DasarHukum::where('status','=',true)->paginate(6);

        return view('dasar_hukum', ['dasar'=> $dasar]);
      // return view('admin.dasar_hukum');
    }

    public function showPostApi()
    {
      $dasar = DasarHukum::where('status','=',true)->get();

        return $dasar;
      // return view('admin.dasar_hukum');
    }

    public function search(Request $request)
    {
      $dasar = DasarHukum::where('status','=',true)
                          ->where('judul','LIKE','%'.$request->data.'%')
                          ->get();

        return $dasar;
      // return view('admin.dasar_hukum');
    }

    public function newest()
    {
      $dasar = response()->json(DasarHukum::where('status','=',true)->skip(0)->take(3)->get());
        return $dasar;
    }

    public function view($id)
    {
      $data = DasarHukum::find($id);

        return view('admin.document_view', compact('data'));
    }

    public function update(Request $request)
    {
      $data = DasarHukum::find($request->data['id']);
      $data->judul = $request->data['judul'];
      $data->save();
     

      return response()->json(["message"=>"Success"]);
      // return view('admin.dasar_hukum');
    }
                        
    public function store(Request $request)
    { 
          $validator = $request->validate([
          'file' => 'required|mimes:pdf',
          ]);
  
          $image = new DasarHukum();  
          if ($request->hasFile('file')) {
            $imagePath = $request->file('file');
            $imageName = $imagePath->getClientOriginalName();
            $filename = pathinfo($imageName, PATHINFO_FILENAME);
            $extension = pathinfo($imageName, PATHINFO_EXTENSION);
            $newname= uniqid('document_').'_'.time().'.'.$extension;
  
            $path = $request->file('file')->storeAs('uploads', $newname, 'public');
          }
  
          $image->judul = $request->title_dasar_hukum;
          $image->file_path = $newname;
          $image->save();
          
        return back()->with('success', 'Image uploaded successfully');
    }

    public function destroy(Request $request)
    {
      $data = DasarHukum::find($request->id);
      if($data->file_path){
        Storage::delete('public/uploads/'.$data->file_path);
      }
      $data->delete();

      return response()->json(["message" => "Success Delete"]);
    }

    public function post(Request $request)
    {
      $data = DasarHukum::find($request->id);
      $status = filter_var($request->status, FILTER_VALIDATE_BOOLEAN);
      $data->status = $status;
      

      $data->save();

      return response()->json(["message" => $status]);
    }
}
