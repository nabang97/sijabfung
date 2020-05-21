@extends('layouts.admin_layout')

@section('page-title', 'Golongan')

@section('style')
 <!-- Custom styles for this page -->
 <link href="{{asset('vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
@endsection

@section('additional-button')
<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-download fa-sm text-white-50"></i> Tambah Data</a>
@endsection

@section('content')
  <!-- DataTales Example -->
  <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DataTables Golongan</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="tableGolongan" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th style="width:10px">No</th>
                      <th>Nama</th>
                      <th style="width:200px">Action</th>
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
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Tambah Data Golongan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        <div class="form-group">
          <label for="exampleInputEmail1">Nama Golongan</label>
          <input type="text" class="form-control" id="namaGolongan">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="submit" class="btn btn-primary" id="btnAddGolongan">Tambahkan</button>
      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalEditGolongan" tabindex="-1" role="dialog" aria-labelledby="modalEditGolonganTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditGolonganTitle">Edit Data Golongan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <input type="text" class="form-control" name="idGolongan" hidden>
      
        <div class="form-group">
          <label for="exampleInputEmail1">Nama Golongan</label>
          <input type="text" class="form-control" name="namaGolongan">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="submit" class="btn btn-primary" id="btnUpdateGolongan">Ubah</button>
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
  <script src="{{asset('js/demo/datatables-golongan.js')}}"></script>
  <script src="{{asset('js/script.js')}}"></script>

@endsection