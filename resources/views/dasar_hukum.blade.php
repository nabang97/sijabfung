@extends('layouts.web_layout')
@section('title', 'Dasar Hukum')
@section('header')
<div class="jumbotron-sijabfung" id="dasar-hukum-jumbotron">
</div>
@endsection
@section('style')
@endsection
@section('content')
@parent
<div class="container">
    <center>
        <h1>Dasar Hukum Jabatan Fungsional</h1>
    </center>
    <br>
    <center>
        <form action="" method="get">
            <div class="search-dasar-hukum">
                <div class="search-sijabfung-group form-inline">
                    <div class="search-input">
                        <input type="text" name="" id="searchInputDasarHukum" class="form-control form-sijabfung"
                            placeholder="Masukan kata kunci">
                    </div>
                    <div class="search-button">
                        <button type="button" class="btn-jabfung" id="searchDasarHukum">Search</button>
                    </div>
                </div>
            </div>
        </form>
    </center>
    <br>
    <div id="newest-dasar-hukum">
    </div>
    <br>
    <center>
        <div id='pagination-dasar-hukum'></div>
    </center>
</div>
<br>
@endsection
@section('script')
<script src="{{ asset('js\dasar-hukum.js') }}"></script>
@endsection
