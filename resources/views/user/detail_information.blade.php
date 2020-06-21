@extends('user.profile')

@section('content-title', 'Detail Information')

@section('profile-active','active')

@section('content-detail')
<div class="information-details">
    <div class="field-details">
        <div class="field-title">
            <p>NIP</p>
            <!-- <hr> -->
        </div>
        
        <div class="field-content">
            <p>{{Auth::user()->pegawai->nip}}</p>                        
        <hr>
        </div>
    </div>
    
    <div class="field-details">
        <div class="field-title">
            <p>Nama Lengkap</p>
            <!-- <hr> -->
            
        </div>
        <div class="field-content">
        <p>{{Auth::user()->pegawai->name}}</p>
            <hr>
            
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
            <p>Tempat, Tanggal Lahir</p>
            <!-- <hr> -->
            
        </div>
        <div class="field-content">
        <p>{{Auth::user()->pegawai->birthday_place}}, {{ date('d M Y', strtotime(Auth::user()->pegawai->birthday_date))}}</p>
            <hr>
            
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
        <p>Golongan</p>
            <!-- <hr> -->
            
        </div>
        <div class="field-content">
        <p>{{Auth::user()->pegawai->golongans->name}}</p>
            <hr>
            
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
        <p>Unit Kerja</p>
            <!-- <hr> -->
            
        </div>
        <div class="field-content">
            
            <p>{{Auth::user()->pegawai->unit_kerja}}</p>
            <hr>
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
            
            <p>Jenjang Jabatan</p>
            <!-- <hr> -->
        </div>
        <div class="field-content">
            
            <p>{{Auth::user()->pegawai->jenjang_jabatan->nama}}</p>
            <hr>
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
            
            <p>Jabatan Fungsional</p>
            <!-- <hr> -->
        </div>
        <div class="field-content">
        <p>{{Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->jabatan_fungsional->nama}}</p>
            <hr>
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
            
            <p>Rumpun Jabatan</p>
            <!-- <hr> -->
        </div>
        <div class="field-content">
        <p>{{Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->jabatan_fungsional->rumpun_jabatan->nama}}</p>
            <hr>
        </div>
    </div>
    <div class="field-details">
        <div class="field-title">
            
            <p>Instansi Pembina</p>
            <!-- <hr> -->
        </div>
        <div class="field-content">
        <p>{{Auth::user()->pegawai->jenjang_jabatan->detail_jabfung->jabatan_fungsional->rumpun_jabatan->instansi_pembina->name}}</p>
            <hr>
        </div>
    </div>
</div>
@endsection
