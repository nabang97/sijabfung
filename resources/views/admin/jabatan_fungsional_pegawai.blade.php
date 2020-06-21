@extends('layouts.admin_layout')

@section('page-title', 'Jabatan Fungsional Pegawai')

@section('style')
 <!-- Custom styles for this page -->
 <link href="{{asset('vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
 <link rel="stylesheet" href="{{asset('vendor\bootstrap-datepicker-1.9.0-dist\css\bootstrap-datepicker.min.css')}}">
 <link rel="stylesheet" href="{{asset('vendor/select2-4.0.13/css/select2.min.css')}}">
 <link rel="stylesheet" href="{{asset('vendor/select2-4.0.13/css/select2-bootstrap.min.css')}}">
@endsection

@section('additional-button')
<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#modalAddJabfungPegawai" id="addJabfungPegawai"><i class="fas fa-download fa-sm text-white-50"></i> Tambah Data</a>
@endsection

@section('content')
  <!-- DataTales Example -->
  <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DataTables Jabatan Fungsional Pegawai</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="tableJabfungPegawai" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th style="width:10px">No</th>
                      <th>NIP</th> 
                      <th>Nama</th>   
                      <th>TTL</th>
                      <th>Golongan</th>                      
                      <th>Jabatan Fungsional</th> 
                      <th>Diklat</th>           
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                  <tr>
                      <th style="width:10px">No</th>
                      <th>NIP</th> 
                      <th>Nama</th>   
                      <th>TTL</th>
                      <th>Golongan</th>                      
                      <th>Jabatan Fungsional</th> 
                      <th>Diklat</th>           
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
<div class="modal fade" id="modalAddJenjangJabatan" tabindex="-1" role="dialog" aria-labelledby="modalAddJabFungTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAddJenjangJabatanLongTitle">Tambah Data Jenjang Jabatan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">      
        <div class="form-group">
          <label for="namaJenjangJabatan">Nama Jenjang Jabatan</label>
          <input type="text" class="form-control" name="nama-jenjang-jabatan" style="padding: 0px 15px" placeholder="ex: Auditor Muda, Pranata Komputer Muda , etc.">
        </div>
        <div class="form-group">
          <label for="selectInstanse">Instansi Pembina</label>          
          <select class="form-control select-select2" name="instansi-pembina">
            <option selected>Pilih Instansi Pembina</option>
          </select>
        </div>
        <div class="form-group">
          <label for="selectRumpun">Rumpun Jabatan</label>          
          <select class="form-control select-select2" name="rumpun-jabatan">
            <option selected>Pilih Rumpun Jabatan</option>
          </select>
        </div>
        <div class="form-group">
          <label for="selectJabatanFungsional">Jabatan Fungsional</label>          
          <select class="form-control select-select2" name="jabatan-fungsional">
            <option selected>Pilih Jabatan Fungsional</option>
          </select>
        </div>   
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="submit" class="btn btn-primary" id="btnAddJenjangJabatan">Tambahkan</button>
      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalEditJenjangJabatan" tabindex="-1" role="dialog" aria-labelledby="modalEditJenjangJabatanTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditJenjangJabatanTitle">Edit Jabatan Fungsional</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control select-select2" name="id-jenjang-jabatan" hidden>
        <div class="form-group">
          <label for="namaJenjangJabatan">Nama Jenjang Jabatan</label>
          <input type="text" class="form-control" name="nama-jenjang-jabatan" style="padding: 0px 15px" placeholder="ex: Auditor Muda, Pranata Komputer Muda, etc.">
        </div>
        <div class="form-group">
          <label for="selectInstanse">Instansi Pembina</label>          
          <select class="form-control select-select2" name="instansi-pembina">
            <option selected>Pilih Instansi Pembina</option>
          </select>
        </div>
        <div class="form-group">
          <label for="selectRumpun">Rumpun Jabatan</label>          
          <select class="form-control select-select2" name="rumpun-jabatan">
            <option selected>Pilih Rumpun Jabatan</option>
          </select>
        </div>
        <div class="form-group">
          <label for="selectJabatanFungsional">Jabatan Fungsional</label>          
          <select class="form-control select-select2" name="jabatan-fungsional">
            <option selected>Pilih Jabatan Fungsional</option>
          </select>
        </div>   
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="submit" class="btn btn-primary" id="btnUpdateJenjangJabatan">Ubah</button>
      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalViewJabFung" tabindex="-1" role="dialog" aria-labelledby="modalViewJabFungTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalViewJabFungTitle">Edit Jabatan Fungsional</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <!-- <button type="submit" class="btn btn-primary" id="btnUpdateJabFung">Ubah</button> -->
      </div>

    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalPostJabFung" tabindex="-1" role="dialog" aria-labelledby="modalPostJabFungTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalPostJabFungTitle">Post Kondisi</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
          <label for="selectJabatan">Title</label>          
          <input type="text" class="form-control select-select2" name="title-post" />
        </div>
        
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="submit" class="btn btn-primary" id="btnUpdateJabFung">Post</button>
      </div>
    </div>
  </div>
</div>
@endsection

@section('script')
  <!-- Page level plugins -->
  <script src="{{asset('vendor/datatables/jquery.dataTables.min.js')}}"></script>
  <script src="{{asset('vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>
  <!-- Page level plugins -->
  <script src="{{asset('vendor/select2-4.0.13/js/select2.full.js')}}"></script>
  
  

   <!-- DATE PICKER -->
   <script src="{{asset('vendor\bootstrap-datepicker-1.9.0-dist\js\bootstrap-datepicker.min.js')}}"></script>
    

  <!-- Page level custom scripts -->
  <script type="text/javascript" src="{{asset('vendor/dates/date.js')}}"></script>
  <script src="{{asset('js/demo/datatables-jabfung-pegawai.js')}}"></script>
  <script src="{{asset('js/script.js')}}"></script>

@endsection