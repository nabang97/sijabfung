<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\InstansiPembina;
use App\RumpunJabatan;
use App\JabatanFungsional;
use App\DetailJabfung;
use App\JenjangJabatan;
use App\Golongan; 
use App\Pegawai; 
use App\Diklat; 
use App\User;


class ProfileController extends Controller
{
    //
    public function edit(){
       
        $instansis = InstansiPembina::get();
        $golongans = Golongan::get();
        
        $idInstansi = Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->jabatan_fungsional->rumpun_jabatan->instansi_pembina->id;

        $rumpuns = RumpunJabatan::where('id_instansi','=',$idInstansi)->get();

        $idRumpun = Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->jabatan_fungsional->rumpun_jabatan->id;

        $jabatans= JabatanFungsional::where('id_rumpun_jabatan','=',$idRumpun)->get();

        $idJabatan= Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->jabatan_fungsional->id;

        $detailJabfungs = DetailJabfung::where('jabfung','=',$idJabatan)->get();

        $idDetail = Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->id;

        $jenjangJabatans = JenjangJabatan::select('jenjang_jabfung.id','jenjang_jabfung.nama as jenjang','detail_jabfung.id as detail','categories.name as kategori', 'detail_jabfung.lingkup')
        ->leftJoin('detail_jabfung',function($join) {
            $join->on('jenjang_jabfung.id_detail_jabfung', '=', 'detail_jabfung.id');
        })
        ->leftJoin('categories', function($join){
            $join->on('detail_jabfung.kategori', '=', 'categories.id');
        })
        ->where('jabfung',$idJabatan)->get();
        // dd($jenjangJabatans);


        return view('user.edit_profile')->
        with(['instansis' => $instansis, 'golongans'=> $golongans, 'idInstansi'=> $idInstansi,'rumpuns'=>$rumpuns,'idRumpun'=>$idRumpun,'jabatans'=>$jabatans,'detailJabfungs'=>$detailJabfungs,'jenjangJabatans'=>$jenjangJabatans,'idJabatan'=>$idJabatan,'idDetail'=>$idDetail ]);
    }

    public function update(Request $request){
        $pegawaiCheck = Pegawai::find($request->data['nip']);

        if ($pegawaiCheck && $request->data['nip'] != Auth::user()->nip) {

            return response()->json(['error' => true, 'message' => 'NIP yang anda masukan telah ada']);
        }

        $pegawai = Pegawai::find(Auth::user()->nip);

        $pegawai->nip = $request->data['nip'];
        $pegawai->name = $request->data['name'];
        $pegawai->birthday_place = $request->data['birthday_place'];
        $pegawai->birthday_date = $request->data['birthday_date'];
        $pegawai->golongan = $request->data['golongan'];
        $pegawai->id_jenjang_jabfung = $request->data['id_jenjang_jabfung'];
        $pegawai->unit_kerja = $request->data['unit_kerja'];

        $pegawai->save();

        return response()->json(['error' => false , 'message' => 'Update Successfully']); 
    }

    public function editDiklat()
    {
        $diklat = Diklat::where('nip','=',Auth::user()->nip)->get();
        return view('user.edit_riwayat_diklat')->with(['diklats'=>$diklat]);
    }

    public function view()
    {
        $diklat = Diklat::where('nip','=',Auth::user()->nip)->get();
        // $diklat = Diklat::get();
        // dd($diklat);
        return $diklat;
    }

    public function updateDiklat(Request $request)
    {
        $diklat = Diklat::where('nip','=',Auth::user()->nip)->where('id','=',$request->data['id'])->first();

        $diklat->name = $request->data['name'];
        $diklat->tahun_mengikuti = $request->data['tahun_mengikuti'];
        $diklat->save();
        
        return response()->json(['error'=>false, 'message'=>'Data berhasil diperbaharui']);
    }

    public function storeDiklat(Request $request)
    {
        $diklat = Diklat::where('nip','=',Auth::user()->nip)->get()->sortBy('id');
        $no = 0;      
        $stack=array();  
        foreach($diklat as $dik){
            $no=$no+1;
            if($no != $dik->id){
                array_push($stack, $no);
            }
        }
        if (empty($stack)) {
            $id = count($diklat)+1;
            array_push($stack, $id);
        }
        $newdiklat = new Diklat();
        $newdiklat->id= $stack[0];
        $newdiklat->nip = Auth::user()->nip;
        $newdiklat->name = $request->data['name'];
        $newdiklat->tahun_mengikuti = $request->data['tahun_mengikuti'];
        $newdiklat->save();
        
        return response()->json(['error'=>false, 'message'=>'Data berhasil diperbaharui']);
    }

    public function removeDiklat(Request $request)
    {
        $diklat = Diklat::where('nip','=',Auth::user()->nip)->where('id','=',$request->data['id'])->first();

        $diklat->delete();
        
        return response()->json(['error'=>false, 'message'=>'Data berhasil dihapus']);
    }

    public function settingView()
    {
        return view('user.account_setting');
    }

    public function updateEmail(Request $request)
    {
       $checkEmail = User::where('email','=',$request->data['email'])->first();
       if ($checkEmail && ($checkEmail->email != Auth::user()->email)) {
           return response()->json(['error'=>true, 'message'=>'Email sudah dipakai']);
       }
           $account = User::where('nip','=',Auth::user()->nip)->first();
           $account->email = $request->data['email'];
           $account->save();
           return response()->json(['error'=>false, 'message'=>'Email berhasil diperbarui']);
    }

    public function updatePassword(Request $request)
    {
        if(Hash::check($request->data['oldPassword'], Auth::user()->password)){
            $account = User::where('nip','=',Auth::user()->nip)->first();
            $account->password = Hash::make($request->data['newPassword']);
            $account->save();
            return response()->json(['error'=>false, 'message'=>'Email berhasil diperbarui']);
        }
            return response()->json(['error'=>true, 'message'=>'Kata Sandi Lama tidak cocok']);
    }

    public function uploadPhoto(Request $request)
    {
            $user = Pegawai::where('nip', Auth::user()->nip)->first();

            if(Auth::user()->pegawai->photo_path){
                Storage::delete('public/profiles/'.Auth::user()->pegawai->photo_path);
            }

            $request->validate([
                'file' => 'required|mimes:jpeg,bmp,png|max:2048',
            ]);            

            if ($request->hasFile('file')) {
                $imagePath = $request->file('file');
                $imageName = $imagePath->getClientOriginalName();
                $filename = pathinfo($imageName, PATHINFO_FILENAME);
                $extension = pathinfo($imageName, PATHINFO_EXTENSION);
                $newname = uniqid('img_').'_'.time().'.'.$extension;
                $path = $request->file('file')->storeAs('profiles', $newname , 'public');
            }

            $user->photo_path = $newname;
            $user->save();

            return response()->json(['error'=>false, 'message'=>'Foto profile berhasil diganti']);
    }
}
