@extends('layouts.web_layout')
@section('title', 'Home')
@section('style')
<style>
</style>
@endsection
@section('header')
<div class="owl-carousel owl-theme">
    @foreach($sliders as $slider)
        <div class="item"><img src="{{ asset('storage/sliders/'.$slider->file_path) }}" />
        </div>
    @endforeach
</div>
@endsection
@section('content')
@parent
<div class="container">
    <center>
        <h1>Dasar Hukum</h1>
    </center><br>
    <div id="newest-dasar-hukum">
    </div><br>
    <center>
        <a href="{{ url('/dasar-hukum/all') }}" class="btn-jabfung">Lihat Semua</a>
    </center>
</div>
<br>
@endsection
@section('script')
<script src="{{ asset('js\home.js') }}"></script>
@endsection
