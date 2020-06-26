@extends('layouts.admin_layout')
@section('page-title', 'Pegawai')
@section('style')
<!-- Custom styles for this page -->
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\jquery-ui.min.css') }}">
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\theme.css') }}">
<link href="{{ asset('vendor/datatables/dataTables.bootstrap4.min.css') }}" rel="stylesheet">
<link rel="stylesheet"
    href="{{ asset('vendor\bootstrap-datepicker-1.9.0-dist\css\bootstrap-datepicker.min.css') }}">
<style>
    .error {
        color: red;
        font-size: unset;
        position: relative;
        line-height: 1;
        width: 100%;
    }

</style>
@endsection
@section('additional-button')
<div class="additional-button">
    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addPegawai" data-toggle="modal"
        data-target="#modalAddPegawai"><i class="fas fa-plus fa-sm text-white-50"></i> Tambah Data Pegawai</a>
    <a class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
        href="{{ route('export') }}">Export User Data</a>
    <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addDiklat" data-toggle="modal"
        data-target="#modalAddDiklat"><i class="fas fa-plus fa-sm text-white-50"></i> Tambah Data Diklat</a> -->
</div>
@endsection
@section('content')
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">DataTables Pegawai</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="tablePegawai" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th style="width:10px">No</th>
                        <th>NIP</th>
                        <th>Nama</th>
                        <th>Tempat,Tanggal Lahir</th>
                        <th>Golongan</th>
                        <th>Jabatan Fungsional</th>
                        <th>Unit Kerja</th>
                        <th>Diklat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th style="width:10px">No</th>
                        <th>NIP</th>
                        <th>Nama</th>
                        <th>Tempat,Tanggal Lahir</th>
                        <th>Golongan</th>
                        <th>Jabatan Fungsional</th>
                        <th>Unit Kerja</th>
                        <th>Diklatt</th>
                        <th>Action</th>
                    </tr>
                </tfoot>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
@section('additional-wrap')
<!-- Modal -->
<div class="modal fade" id="modalAddPegawai" tabindex="-1" role="dialog" aria-labelledby="modalAddPegawaiTitle"
    aria-hidden="true">
    <form id="form-regis">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddPegawaiTitle">Tambah Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row data-alert">
                        <div class="col-4">
                            <h4>Account</h4>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email </label>
                                <input type="email" class="form-control" name="email">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Sandi </label>
                                <input type="password" class="form-control" name="new_password">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Konfirmasi Sandi </label>
                                <input type="password" class="form-control" name="confirm_password">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                        </div>
                        <div class="col-8">
                            <h4>Data Pegawai</h4>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">NIP </label>
                                        <input type="text" class="form-control" name="nip">
                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nama </label>
                                        <input type="text" class="form-control" name="nama">
                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inputTempatLahir">Tempat Lahir</label>
                                        <input type="text" class="form-control" name="tempat_lahir">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inputTempatLahir">Tanggal Lahir</label>
                                        <input type="text" class="form-control datepicker" name="tanggal_lahir">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inputTempatLahir">Golongan</label>
                                        <select class="form-control" name="golongan">
                                            <option value="">Pilih Golongan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectInstanse">Instansi Pembina</label>
                                        <select class="form-control select-select2" name="instansi_pembina">
                                            <option selected>Pilih Instansi Pembina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectRumpun">Rumpun Jabatan</label>
                                        <select class="form-control select-select2" name="rumpun_jabatan">
                                            <option selected>Pilih Rumpun Jabatan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectJabatanFungsional">Jabatan Fungsional</label>
                                        <select class="form-control select-select2" name="jabatan_fungsional">
                                            <option selected>Pilih Jabatan Fungsional</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectPegawai">Jenjang - Kategori - Lingkup</label>
                                        <select class="form-control select-select2" name="jenjang_kategori_lingkup">
                                            <option selected>Jenjang - Kategori - Lingkup</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectPegawai">Unit Kerja</label>
                                        <input class="form-control" name="unit_kerja_saat_ini" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="btnAddPegawai">Tambahkan</button>
                </div>
            </div>
        </div>
    </form>
</div>
<!-- Modal -->
<div class="modal fade" id="modalEditPegawai" tabindex="-1" role="dialog" aria-labelledby="modalEditPegawaiTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditPegawaiTitle">Edit Data Jabatan</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row data-alert">
                    <div class="col-4">
                        <form action="" id="form-update-account">
                            <h4>Account</h4>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email </label>
                                <input type="email" class="form-control" name="email">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Sandi </label>
                                <input type="password" class="form-control" name="new_password"
                                    autocomplete="new-password">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Konfirmasi Sandi </label>
                                <input type="password" class="form-control" name="confirm_password">
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                            <button type="submit" class="btn btn-primary" id="btnUpdateAccount">Update Account</button>
                        </form>
                    </div>
                    <div class="col-8">
                        <form action="" id="form-update-pegawai">
                            <h4>Data Pegawai</h4>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">NIP </label>
                                        <input type="text" class="form-control" name="nip">
                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nama </label>
                                        <input type="text" class="form-control" name="nama">
                                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inputTempatLahir">Tempat Lahir</label>
                                        <input type="text" class="form-control" name="tempat_lahir">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inputTempatLahir">Tanggal Lahir</label>
                                        <input type="text" class="form-control datepicker" name="tanggal_lahir">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inputTempatLahir">Golongan</label>
                                        <select class="form-control" name="golongan">
                                            <option value="">Pilih Golongan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectInstanse">Instansi Pembina</label>
                                        <select class="form-control select-select2" name="instansi_pembina">
                                            <option selected>Pilih Instansi Pembina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectRumpun">Rumpun Jabatan</label>
                                        <select class="form-control select-select2" name="rumpun_jabatan">
                                            <option selected>Pilih Rumpun Jabatan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectJabatanFungsional">Jabatan Fungsional</label>
                                        <select class="form-control select-select2" name="jabatan_fungsional">
                                            <option selected>Pilih Jabatan Fungsional</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectPegawai">Jenjang - Kategori - Lingkup</label>
                                        <select class="form-control select-select2" name="jenjang_kategori_lingkup">
                                            <option selected>Jenjang - Kategori - Lingkup</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="selectPegawai">Unit Kerja</label>
                                        <input class="form-control" name="unit_kerja_saat_ini" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" id="btnUpdatePegawai">Update Pegawai</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
    </form>
</div>
<!-- Modal -->
<div class="modal fade" id="modalViewDiklat" tabindex="-1" role="dialog" aria-labelledby="modalViewDiklatLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalViewDiklatLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <button type="button" class="btn btn-outline-primary form-control mb-4 m-2" id="btnAddDiklat">
                        Tambah Diklat
                    </button>
                    <div class="col">
                        <div class="table-container">
                            <div class="table-jabfung">
                                <table class="table table-bordered" id="tableDiklat" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th style="width:10px">No</th>
                                            <th>Nama</th>
                                            <th>Tahun</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th style="width:10px">No</th>
                                            <th>Nama</th>
                                            <th>Tahun</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 add-diklat-container">
                        <div clas="">
                            <h5>Add Diklat</h5>
                            <form id="form-add-diklat">
                                <input type="text" class="form-control" name="id_diklat" hidden>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Nama Diklat</label>
                                    <input type="text" class="form-control" name="nama_diklat">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Tahun Mengikuti</label>
                                    <input type="text" class="form-control" name="tahun_diklat">
                                </div>
                                <button type="submit" class="btn btn-primary">Tambahkan</button>
                                <button type="button" class="btn btn-secondary" button-type="close"
                                    button-target="add-diklat-container">
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-4 edit-diklat-container">
                        <div clas="">
                            <h5>Edit Diklat</h5>
                            <form id="form-edit-diklat">
                                <input type="text" class="form-control" name="id_diklat" hidden>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Nama Diklat</label>
                                    <input type="text" class="form-control" name="nama_diklat">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Tahun Mengikuti</label>
                                    <input type="text" class="form-control" name="tahun_diklat">
                                </div>
                                <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                                <button type="button" class="btn btn-secondary" button-type="close"
                                    button-target="edit-diklat-container">
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
    @section('script')
    <!-- Page level plugins -->
    <script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>
    <!-- DATE PICKER -->
    <script
        src="{{ asset('vendor\bootstrap-datepicker-1.9.0-dist\js\bootstrap-datepicker.min.js') }}">
    </script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="{{ asset('vendor/jquery-validation-1.19.2/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery-validation-1.19.2/additional-methods.min.js') }}">
    </script>
    <!-- Page level custom scripts -->
    <script type="text/javascript" src="{{ asset('vendor/dates/date-id-ID.js') }}"></script>
    <script src="{{ asset('js/demo/datatables-pegawai.js') }}"></script>
    <script src="{{ asset('js/script.js') }}"></script>
    @endsection
