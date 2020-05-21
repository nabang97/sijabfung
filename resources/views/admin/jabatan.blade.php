@extends('layouts.admin_layout')

@section('page-title', 'Jabatan')

@section('style')
 <!-- Custom styles for this page -->
 <link href="{{asset('vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
@endsection

@section('additional-button')
<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#modalAddJabatan"><i class="fas fa-download fa-sm text-white-50"></i> Tambah Data</a>
@endsection

@section('content')
  <!-- DataTales Example -->
  <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DataTables Jabatan</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="tableJabatan" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th style="width:10px">No</th>
                      <th>Nama</th>
                      <th style="width:300px">Action</th>
                    </tr>
                  </thead>
                  <!-- <tfoot>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Action</th>
                    </tr>
                  </tfoot> -->
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
@endsection

@section('additional-wrap')
<!-- Modal -->
<div class="modal fade" id="modalAddJabatan" tabindex="-1" role="dialog" aria-labelledby="modalAddJabatanTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAddJabatanTitle">Tambah Data Jabatan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        <div class="form-group">
          <label for="exampleInputEmail1">Nama Jabatan</label>
          <input type="text" class="form-control" name="namaJabatan">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="btnAddJabatan">Tambahkan</button>
      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalEditJabatan" tabindex="-1" role="dialog" aria-labelledby="modalEditJabatanTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditJabatanTitle">Edit Data Jabatan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <input type="text" class="form-control" name="idJabatan" hidden>
      
        <div class="form-group">
          <label for="exampleInputEmail1">Nama Jabatan</label>
          <input type="text" class="form-control" name="namaJabatan">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="btnUpdateJabatan">Ubah</button>
      </div>

    </div>
  </div>
</div>
@endsection

@section('script')
  <!-- Page level plugins -->
  <script src="{{asset('vendor/datatables/jquery.dataTables.min.js')}}"></script>
  <script src="{{asset('vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>

  <!-- Page level custom scripts -->
  <script src="{{asset('js/demo/datatables-jabatan.js')}}"></script>
  <script src="{{asset('js/script.js')}}"></script>

@endsection