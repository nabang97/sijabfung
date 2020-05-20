@extends('layouts.web_layout')

@section('title', 'Home')

@section('content')
    @parent
        @foreach($golongans as $golongan)
    <p>This is golongan {{ $golongan->name }}</p>
    @endforeach
@endsection

