@extends('user.profile')
@section('content-title', 'Edit Detail Information')
@section('style')
<meta name="csrf-token" content="{{ csrf_token() }}" />
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\jquery-ui.min.css') }}">
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\theme.css') }}">
@endsection
@section('edit-profile-active','active')
@section('content-detail')
<div class="edit-information-details">
    <div class="container-edit-detail">
        <form action="" id="form-profile">
            <div class="form-sijabfung-group">
                <label for="unitKerja">NIP</label>
                <input type="text" name="nip" class="form-control form-sijabfung" placeholder=""
                    value="{{ Auth::user()->pegawai->nip }}" required>
            </div>
            <div class="form-sijabfung-group">
                <label for="unitKerja">Nama</label>
                <input type="text" name="nama" class="form-control form-sijabfung" placeholder=""
                    value="{{ Auth::user()->pegawai->name }}" required>
            </div>
            <div class="sijabfung-inline-group">
                <div class="form-sijabfung-group">
                    <label for="unitKerja">Tempat Lahir</label>
                    <input type="text" name="tempat_lahir" class="form-control form-sijabfung" placeholder=""
                        value="{{ Auth::user()->pegawai->birthday_place }}" required>
                </div>
                <div class="form-sijabfung-group" style="margin-left:15px">
                    <label for="unitKerja">Tanggal Lahir</label>
                    <input type="text" name="tanggal_lahir" class="form-control form-sijabfung datepicker"
                        placeholder=""
                        value="{{ date('m-d-yy', strtotime(Auth::user()->pegawai->birthday_date)) }}"
                        required>
                </div>
            </div>
            <div class="form-sijabfung-group">
                <label for="selectInstanse">Golongan</label>
                <select class="form-control form-sijabfung" name="golongan" required>
                    <option value="0" selected>Pilih Golongan</option>
                    @foreach( $golongans as $golongan)
                        <option value="{{ $golongan->id }}"
                            {{ $golongan->id == Auth::user()->pegawai->golongan  ? 'selected' : '' }}>
                            {{ $golongan->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-sijabfung-group">
                <label for="selectInstanse">Instansi Pembina</label>
                <select class="form-control form-sijabfung" name="instansi_pembina" required>
                    <option value="0" selected>Pilih Instansi Pembina</option>
                    @foreach( $instansis as $instansi)
                        <option value="{{ $instansi->id }}"
                            {{ $instansi->id == $idInstansi  ? 'selected' : '' }}>
                            {{ $instansi->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-sijabfung-group">
                <label for="selectInstanse">Rumpun Jabatan</label>
                <select class="form-control form-sijabfung" name="rumpun_jabatan" required>
                    <option value="0" selected>Pilih Rumpun Jabatan</option>
                    @foreach( $rumpuns as $rumpun)
                        <option value="{{ $rumpun->id }}"
                            {{ $rumpun->id == $idRumpun  ? 'selected' : '' }}>
                            {{ $rumpun->nama }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-sijabfung-group">
                <label for="selectInstanse">Jabatan Fungsional</label>
                <select class="form-control form-sijabfung" name="jabatan_fungsional" required>
                    <option value="0" selected>Pilih Jabatan Fungsional</option>
                    @foreach( $jabatans as $jabatan)
                        <option value="{{ $jabatan->id }}"
                            {{ $jabatan->id == $idJabatan  ? 'selected' : '' }}>
                            {{ $jabatan->nama }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-sijabfung-group">
                <label for="selectInstanse">Jenjang Jabatan - Lingkup - Kategori</label>
                <select class="form-control form-sijabfung" name="jenjang_kategori_lingkup" required>
                    <option value="0" selected>Pilih Jenjang Jabatan - Kategori - Linkup</option>
                    @foreach( $jenjangJabatans as $jenjang)
                        <option value="{{ $jenjang->id }}"
                            {{ $jenjang->id == Auth::user()->pegawai->id_jenjang_jabfung  ? 'selected' : '' }}>
                            {{ $jenjang->jenjang }} - {{ $jenjang->kategori }} -
                            {{ $jenjang->lingkup == 1 ? 'Pusat' : 'Daerah' }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="form-sijabfung-group">
                <label for="unitKerja">Unit Kerja Saat Ini</label>
                <input type="text" name="unit_kerja_saat_ini" class="form-control form-sijabfung"
                    value="{{ Auth::user()->pegawai->unit_kerja }}" placeholder="SMA N 7 Padang" required>
            </div>
            <br>
            <button type="submit" class="btn-jabfung" style="width:100%" id="updateProfile">Simpan Perubahan</button>
        </form>
    </div>
    <div class="container-edit-photo">
        <div class="preview-photo-container">
            <div class="preview-photo">
                @if(Auth::user()->pegawai->photo_path)
                    <img src="{{ asset('storage/profiles/'.Auth::user()->pegawai->photo_path) }}"
                        alt="" srcset="">
                @else
                    <img src="{{ asset('storage/images/user.svg') }}" alt="" srcset="">
                @endif
            </div>
            <center>
                <form id="form-photo" enctype="multipart/form-data">
                    <label class="btn btn-dark">
                        Ganti Foto <input type="file" name="photo-profile" hidden>
                    </label>
                </form>
            </center>
        </div>
    </div>
</div>
@endsection
@section('script')
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="{{ asset('vendor/jquery-validation-1.19.2/jquery.validate.min.js') }}"></script>
<script src="{{ asset('vendor/jquery-validation-1.19.2/additional-methods.min.js') }}"></script>
<!-- Page level custom scripts -->
<script type="text/javascript" src="{{ asset('vendor/dates/date-id-ID.js') }}"></script>
<script src="{{ asset('js\user\profile-edit-detail.js') }}"></script>
@endsection
