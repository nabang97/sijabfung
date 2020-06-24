<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pegawai;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Diklat;

class PegawaiController extends Controller
{
    //
    public function index(){

        $pegawai = Pegawai::with(['golongans', 'jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan.instansi_pembina', 'jenjang_jabatan.detail_jabfung.kategori'])->get();       

        return response()->json($pegawai);
    }

    public function store(Request $request)
    {    
        $birth  = \Carbon\Carbon::parse($request->data['tanggal_lahir']);
        
        $data = $birth->diffInYears(\Carbon\Carbon::now());

        if($data < 65){
            $user = User::where('email', '=', $request->data['email'])->first();
            if ($user) {
                return response()->json(['error'=> true,'message' => 'Email telah digunakan']);
            }else{
                $pegawaiCheck = Pegawai::find($request->data['nip']);

                if($pegawaiCheck){
                    return response()->json(['error'=> true,'message' => 'NIP telah terdaftar']);
                    
                }else{
                    
                    $pegawai = Pegawai::create([
                        'nip' => $request->data['nip'],
                        'name' => $request->data['name'],
                        'birthday_date' =>$request->data['tanggal_lahir'],
                        'birthday_place' => $request->data['tempat_lahir'],
                        'golongan' => $request->data['golongan'],
                        'id_jenjang_jabfung' => $request->data['jenjang_kategori_lingkup'],
                        'unit_kerja' => $request->data['unit_kerja_saat_ini'],
                    ]);
            
                    $pegawai->save();                  
                    

                    // $collection->concat(['error'=> false,'message' => 'Data berhasil didaftarkan!' ]);
                    return response()->json(['error'=> false,'message' => 'Data berhasil didaftarkan!' ]);
                }
                
            }
        }else{
            return response()->json(['error'=> true, 'message' => 'Usia anda telah memasuki masa pensiun']);
        }
    }

    public function createAccount(Request $request){


        $user = User::create([
            'email' => $request->data['email'],
            'password' => Hash::make($request->data['password']),
            'nip' => $request->data['nip']
        ]);
        $user->save();
        
        return response()->json(['error'=> false, 'message' => 'Registrasi berhasil']);
    }

    public function update(Request $request){
        
        $pegawai = Pegawai::find((int)$request->data['nipBeforeUpdate']);

        $pegawai->nip = (int)$request->data['nip'];
        $pegawai->name = $request->data['name'];
        $pegawai->birthday_place = $request->data['birthday_place'];
        $pegawai->birthday_date = $request->data['birthday_date'];
        $pegawai->golongan = $request->data['golongan'];
        $pegawai->id_jenjang_jabfung = $request->data['id_jenjang_jabfung'];
        $pegawai->unit_kerja = $request->data['unit_kerja'];

        $pegawai->save();

        return response()->json(['error'=> false,'message' => 'Update Successfully']);

    }

    public function getAccount(Request $request){
        
        $pegawai = User::where('nip','=',$request->nip)->first();

        return $pegawai;
    }

    public function updateAccount(Request $request){
        $checkEmail = User::where('email','=',$request->data['email'])->first();
        $pegawai = User::where('nip','=',$request->data['nip'])->first();
        if ($checkEmail && $pegawai->email != $request->data['email']) {
            return response()->json(['error'=> true,'message' => 'Email sudah dipakai']);
        }else{
            $pegawai->email = $request->data['email'];
            $pegawai->password = Hash::make($request->data['password']);
            $pegawai->save();

            return response()->json(['error'=> false,'message' => 'Update Successfully']);
        }   
        
        return $request;
    }

    public function destroy(Request $request){

        $pegawai = Pegawai::findorfail($request->nip);

        $pegawai->delete();

        return response()->json(['message' => 'Delete Successfully']);
    }

    public function diklat(Request $request){
        $pegawai = Diklat::where('nip','=',$request->nip)->get()->sortByDesc('tahun_mengikuti')->values();

        
        return $pegawai;

        
    }
}
