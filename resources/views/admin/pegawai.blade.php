@extends('layouts.admin_layout')

@section('page-title', 'Pegawai')

@section('style')
 <!-- Custom styles for this page -->
 <link href="{{asset('vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
 <link rel="stylesheet" href="{{asset('vendor\bootstrap-datepicker-1.9.0-dist\css\bootstrap-datepicker.min.css')}}">
 
@endsection

@section('additional-button')
<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#modalAddPegawai"><i class="fas fa-download fa-sm text-white-50"></i> Tambah Data</a>
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
                      <th>Nama</th>
                      <th>Tempat Lahir</th>
                      <th>Tanggal Lahir</th>
                      <th>Golongan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                    <th style="width:10px">No</th>
                      <th>Nama</th>
                      <th>Tempat Lahir</th>
                      <th>Tanggal Lahir</th>
                      <th>Golongan</th>
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
<div class="modal fade" id="modalAddPegawai" tabindex="-1" role="dialog" aria-labelledby="modalAddPegawaiTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAddPegawaiTitle">Tambah Data Pegawai</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div class="form-group">
          <label for="exampleInputEmail1">NIP </label>
          <input type="text" class="form-control" name="nipPegawai">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
      
        <div class="form-group">
          <label for="exampleInputEmail1">Nama </label>
          <input type="text" class="form-control" name="namaPegawai">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
        <div class="form-row">

            <div class="col">
                <div class="form-group">
                    <label for="inputTempatLahir">Tempat Lahir</label>
                    <input type="text" class="form-control" name="tempat-lahir">
          
                </div>
            </div>

            <div class="col">
                 <div class="form-group">
                    <label for="inputTempatLahir">Tanggal Lahir</label>
                     <input type="text" class="form-control datepicker" name="tanggal-lahir" >
                </div>
            </div>

        </div>
        
        
        <div class="form-group">
          <label for="inputTempatLahir">Nama Pegawai</label>
          <select class="form-control" name="golongan-pegawai">
            <option value="" >Pilih Golongan</option>
          </select>
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="btnAddPegawai">Tambahkan</button>
      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalEditPegawai" tabindex="-1" role="dialog" aria-labelledby="modalEditPegawaiTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditPegawaiTitle">Edit Data Jabatan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <input type="text" class="form-control" name="idJabatan" hidden>
      
        <div class="form-group">
          <label for="exampleInputEmail1">Nama Pegawai</label>
          <input type="text" class="form-control" name="namaPegawai">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="btnUpdatePegawai">Ubah</button>
      </div>

    </div>
  </div>
</div>
@endsection

@section('script')
  <!-- Page level plugins -->
  <script src="{{asset('vendor/datatables/jquery.dataTables.min.js')}}"></script>
  <script src="{{asset('vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>

  <!-- DATE PICKER -->
  <script src="{{asset('vendor\bootstrap-datepicker-1.9.0-dist\js\bootstrap-datepicker.min.js')}}"></script>

  <!-- Page level custom scripts -->
  <script type="text/javascript" src="{{asset('vendor/dates/date-id-ID.js')}}"></script>
  <script src="{{asset('js/demo/datatables-pegawai.js')}}"></script>
  <script src="{{asset('js/script.js')}}"></script>

@endsection