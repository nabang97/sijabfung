@extends('user.profile')
@section('content-title', 'Edit Riwayat Diklat')
@section('style')
<meta name="csrf-token" content="{{ csrf_token() }}" />
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\jquery-ui.min.css') }}">
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\theme.css') }}">
@endsection
@section('edit-diklat-active','active')
@section('content-detail')
<div class="">
    <div class="table-button-group" style="height:50px">
        <button type="button" class="btn btn-primary btn-sm float-right br-25 pl-3 pr-3" id="btnAddDiklat"
            data-toggle="modal" data-target="#modalAddDiklat">
            Tambah Diklat</button>
    </div>
    <div class="table-container">
        <div class="table-jabfung" style="width:100%">
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
@endsection
@section('modal')
<!-- Modal -->
<div class="modal fade" id="modalAddDiklat" tabindex="-1" role="dialog" aria-labelledby="modalAddDiklatLabel"
    aria-hidden="true">
    <form id="form-add-diklat">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddDiklatLabel">Tambah Diklat</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" name="id_diklat" hidden>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nama Diklat</label>
                        <input type="text" class="form-control" name="nama_diklat">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Tahun Mengikuti</label>
                        <input type="text" class="form-control" name="tahun_diklat">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="btnInsertDiklat">Tambah</button>
                </div>
            </div>
        </div>
    </form>
</div>
<!-- Modal -->
<div class="modal fade" id="modalEditDiklat" tabindex="-1" role="dialog" aria-labelledby="modalEditDiklatLabel"
    aria-hidden="true">
    <form id="form-edit-diklat">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditDiklatLabel">Edit Diklat</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" name="id_diklat" hidden>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nama Diklat</label>
                        <input type="text" class="form-control" name="nama_diklat">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Tahun Mengikuti</label>
                        <input type="text" class="form-control" name="tahun_diklat">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Ubah</button>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection
@section('script')
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="{{ asset('vendor/jquery-validation-1.19.2/jquery.validate.min.js') }}"></script>
<script src="{{ asset('vendor/jquery-validation-1.19.2/additional-methods.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ asset('js\user\profile-diklat.js') }}"></script>
@endsection
