@extends('layouts.web_layout')
@section('title', 'Jabatan Fungsional')
@section('header')
<div class="jumbotron-sijabfung" id="Jabfung-jumbotron">
</div>
@endsection
@section('style')
@endsection
@section('content')
@parent
<div class="container">
    <center>
        <h1>Daftar Jabatan Fungsional</h1>
    </center>
    <br>
    <center>
        <form action="" method="get">
            <div class="search-dasar-hukum">
                <div class="search-sijabfung-group form-inline">
                    <div class="search-input">
                        <select type="text" name="jabatan-fungsional" id="jabatan-fungsional"
                            class="form-sijabfung form-control" placeholder="Masukan kata kunci">
                            <option value="0">Pilih Jabatan Fungsional</option>
                        </select>
                    </div>
                    <div class="search-input">
                        <select class="form-sijabfung form-control" name="jenjang-kategori-lingkup"
                            placeholder="Masukan kata kunci">
                            <option value="0">Pilih Jenjang - Kategori - Lingkup</option>
                        </select>
                    </div>
                    <div class="search-button">
                        <button type="button" class="btn-jabfung" id="searchJabfung">Tampilkan</button>
                    </div>
                </div>
            </div>
        </form>
    </center>
    <br>
    <div class="table-jabfung">
        <table class="table table-bordered" id="tableJabatanFungsional" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th style="width:10px">No</th>
                    <th>Nama</th>
                    <th>Tempat,Tanggal Lahir</th>
                    <th>Golongan</th>
                    <th>Jabatan Fungsional</th>
                    <th>Diklat yang Diikuti</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th style="width:10px">No</th>
                    <th>Nama</th>
                    <th>Tempat,Tanggal Lahir</th>
                    <th>Golongan</th>
                    <th>Jabatan Fungsional</th>
                    <th>Diklat yang Diikuti</th>
                </tr>
            </tfoot>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<br>
@endsection
@section('modal')
<!-- Modal -->
<div class="modal fade" id="modalViewDiklat" tabindex="-1" role="dialog" aria-labelledby="modalViewDiklatLabel"
    aria-hidden="true">
    <form id="form-add-diklat">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalViewDiklatLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-container">
                        <div class="table-jabfung">
                            <table class="table table-bordered" id="tableDiklat" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th style="width:10px">No</th>
                                        <th>Nama</th>
                                        <th>Tahun</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th style="width:10px">No</th>
                                        <th>Nama</th>
                                        <th>Tahun</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </form>
</div>
@endsection
@section('script')
<!-- Bootstrap core JavaScript-->
<script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('vendor/dates/date-id-ID.js') }}"></script>
<script src="{{ asset('js/jabatan-fungsional.js') }}"></script>
@endsection
