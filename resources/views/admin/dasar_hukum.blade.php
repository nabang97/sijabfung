@extends('layouts.admin_layout')
@section('page-title', 'Jabatan')
@section('style')
<!-- Custom styles for this page -->
<link href="{{ asset('vendor/datatables/dataTables.bootstrap4.min.css') }}" rel="stylesheet">
@endsection
@section('additional-button')
<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal"
    data-target="#modalAddJabatan"><i class="fas fa-download fa-sm text-white-50"></i> Tambah Data</a>
@endsection
@section('content')
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">DataTables Jabatan</h6>
    </div>
    <div class="card-body">
        @if($errors->any())
            <div class="alert alert-danger alert-block">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @if($message = Session::get('success'))
            <div class="alert alert-success alert-block">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <strong>{{ $message }}</strong>
            </div>
        @endif
        <div class="table-responsive">
            <table class="table table-bordered" id="tableDasarHukum" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th style="width:10px">No</th>
                        <th class="text-center">Judul</th>
                        <th style="max-width: 350px" class="text-center">Action</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th style="width:10px">No</th>
                        <th>Judul</th>
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
<div class="modal fade" id="modalAddJabatan" tabindex="-1" role="dialog" aria-labelledby="modalAddJabatanTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form action="{{ route('file.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddJabatanTitle">Tambah Dasar Hukum</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="titleDasarHukum">Title</label>
                        <input type="text" class="form-control" name="title_dasar_hukum">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group">
                        <label for="fileDasarHukum">Dasar Hukum (*pdf)</label>
                        <input type="file" class="form-control-file" name="file">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="btnAddDasarHukum">Tambahkan</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="modalEditDasarHukum" tabindex="-1" role="dialog" aria-labelledby="modalEditDasarHukumTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditDasarHukumTitle">Edit Dasar Hukum</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" name="idDasarHukum" hidden>
                <div class="form-group">
                    <label for="namaDasarHukum">Judul</label>
                    <input type="text" class="form-control" name="namaDasarHukum">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="btnUpdateDasarHukum">Ubah</button>
            </div>
        </div>
    </div>
</div>
@endsection
@section('script')
<!-- Page level plugins -->
<script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>
<!-- Page level custom scripts -->
<script src="{{ asset('js/demo/datatables-dasar-hukum.js') }}"></script>
<script src="{{ asset('js/script.js') }}"></script>
@endsection
