@extends('layouts.web_layout')

@section('title', 'Dasar Hukum')

@section('style')

<link rel="stylesheet" href="{{asset('vendor\jquery-ui-themes-1.12.1\themes\base\jquery-ui.min.css')}}">

<link rel="stylesheet" href="{{asset('vendor\jquery-ui-themes-1.12.1\themes\base\theme.css')}}">


    
@endsection

@section('header')

    <div class="jumbotron-sijabfung" id="dasar-hukum-jumbotron">
        <div class="layer-jumbotron"></div>
    </div>


@endsection



@section('content')
    @parent
      
    <div class="container register">
        <center><h1>Registrasi</h1></center>
        <br>     
        @if(session()->has('message'))
            <div class="alert-sijabfung alert-sijabfung-success">
                {{ session()->get('message') }}
            </div>
        @endif
        <form method="POST" id="form-regis" >   
            <div class="card-sijabfung">
                <div class="card-sijabfung-header">
                    <h3>Account</h3>
                </div>
                <div class="card-sijabfung-body">
                    <div class="form-sijabfung-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" class="form-sijabfung" placeholder="name@example.com" required>
                    </div>
                    <div class="form-sijabfung-group">
                        <label for="password">Sandi</label>
                        <input type="password" name="password"  class="form-sijabfung" placeholder="Masukkan kata sandi" required>
                    </div>
                    <div class="form-sijabfung-group">
                        <label for="password">Konfirmasi Sandi</label>
                        <input type="password" name="confirm_password"  class="form-sijabfung" placeholder="Masukkan kata sandi" required>
                    </div>
                
                    <!-- button -->
                </div>
            </div>
            <div class="card-sijabfung">
                <div class="card-sijabfung-header">
                    <h3>Profile</h3>
                </div>
                <div class="card-sijabfung-body">
                    
                    <div class="form-sijabfung-group">
                        <label for="unitKerja">NIP</label>
                        <input type="text" name="nip" class="form-sijabfung" placeholder="" required>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="unitKerja">Nama</label>
                        <input type="text" name="nama" class="form-sijabfung" placeholder="" required>
                    </div>

                    <div class="sijabfung-inline-group">
                        <div class="form-sijabfung-group" >
                            <label for="unitKerja">Tempat Lahir</label>
                            <input type="text" name="tempat_lahir" class="form-sijabfung" placeholder="" required>
                        </div>
                        <div class="form-sijabfung-group" style="margin-left:15px">
                            <label for="unitKerja">Tanggal Lahir</label>
                            <input type="text" name="tanggal_lahir" class="form-sijabfung datepicker" placeholder="" required>
                        </div>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="selectInstanse">Golongan</label>          
                        <select class="form-sijabfung" name="golongan"  required>
                            <option value="0" selected>Pilih Golongan</option>
                        </select>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="selectInstanse">Instansi Pembina</label>          
                        <select class="form-sijabfung" name="instansi_pembina"  required>
                            <option value="0" selected>Pilih Instansi Pembina</option>
                        </select>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="selectInstanse">Rumpun Jabatan</label>          
                        <select class="form-sijabfung" name="rumpun_jabatan" required>
                            <option value="0" selected>Pilih Rumpun Jabatan</option>
                        </select>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="selectInstanse">Jabatan Fungsional</label>          
                        <select class="form-sijabfung" name="jabatan_fungsional" required>
                            <option value="0" selected>Pilih Jabatan Fungsional</option>
                        </select>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="selectInstanse">Jenjang Jabatan - Lingkup - Kategori</label>          
                        <select class="form-sijabfung" name="jenjang_kategori_lingkup" required>
                            <option value="0" selected>Pilih Jenjang Jabatan - Kategori - Linkup</option>
                        </select>
                    </div>

                    <div class="form-sijabfung-group">
                        <label for="unitKerja">Unit Kerja Saat Ini</label>
                        <input type="text" name="unit_kerja_saat_ini" class="form-sijabfung" placeholder="SMA N 7 Padang" required>
                    </div>

                    

                </div>
                
            </div>
            <center>
            <div class="register-button">
                    <button type="submit" class="btn-jabfung" style="width:80%" id="register">Daftarkan</button>
            </div>
            </center>
        </form>
        <br>
    </div>
    
    <br>
   
@endsection


@section('script')

<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="{{asset('vendor/jquery-validation-1.19.2/jquery.validate.min.js')}}"></script>
<script src="{{asset('vendor/jquery-validation-1.19.2/additional-methods.min.js')}}"></script>
 <!-- Page level custom scripts -->
 <script type="text/javascript" src="{{asset('vendor/dates/date-id-ID.js')}}"></script>
<script src="{{asset('js/register.js')}}"></script>
@endsection