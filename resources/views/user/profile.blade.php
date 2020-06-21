@extends('layouts.user_layout')
@section('header')
<div class="jumbotron-sijabfung" id="profile-sijafung">
    <div class="layer-jumbotron"></div>
    <div class="photo-profile">
        <center>
            @if(Auth::user()->pegawai->photo_path)
                <img src="{{ asset('storage/profiles/'.Auth::user()->pegawai->photo_path) }}"
                    alt="" srcset="">
            @else
                <img src="{{ asset('storage/images/user.svg') }}" alt="" srcset="">
            @endif
            <br><br>
            <h2>{{ Auth::user()->pegawai->name }}</h2>
            <span>{{ Auth::user()->pegawai->nip }}</span>
        </center>
    </div>
</div>
@endsection
@section('content')
<div class="profile-page">
    <div class="profile-container">
        <div class="profile-sidebar">
            <div class="card-sijabfung profile">
                <div class="card-sijabfung-title">
                    <h5>Personal Settings</h5>
                </div>
                <ul class="card-sidebar-menu">
                    <li class="@yield('profile-active')"><a href="/profile">Profile Information</a></li>
                    <li class="@yield('edit-profile-active')"><a href="/profile/edit">Edit Profile Information</a></li>
                    <li class="@yield('edit-diklat-active')"><a href="/profile/riwayat-diklat">Riwayat Diklat</a>
                    </li>
                    <li class="@yield('edit-email-active')"><a href="/profile/setting">Change Email & Password</a></li>
                </ul>
            </div>
        </div>
        <div class="profile-content">
            <div class="content-title">
                <h4> @yield('content-title')</h4>
            </div>
            @yield('content-detail')
        </div>
    </div>
</div>
@endsection
