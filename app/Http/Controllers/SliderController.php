<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Slider;
use Illuminate\Support\Facades\Storage;
class SliderController extends Controller
{
    public function all()
    {
        $slider= Slider::get();
        return $slider;
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'file' => 'required|mimes:jpeg,jpg,bmp,png|max:2048',
            ]);
    
            $image = new Slider();  

            if ($request->hasFile('file')) {
              $imagePath = $request->file('file');
              $imageName = $imagePath->getClientOriginalName();
              $filename = pathinfo($imageName, PATHINFO_FILENAME);
              $extension = pathinfo($imageName, PATHINFO_EXTENSION);
              $newname= uniqid('slider_').'_'.time().'.'.$extension;
    
              $path = $request->file('file')->storeAs('sliders', $newname, 'public');
            }
    
            $image->file_path = $newname;
            $image->save();
            
          return back()->with('success', 'Image uploaded successfully');
    }

    public function destroy(Request $request)
    {
      $data = Slider::find($request->id);
      if($data->file_path){
        Storage::delete('public/sliders/'.$data->file_path);
      }
      $data->delete();

      return response()->json(["message" => "Success Delete"]);
    }
}
