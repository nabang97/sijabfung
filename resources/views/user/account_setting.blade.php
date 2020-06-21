@extends('user.profile')
@section('content-title', 'Account Settings')
@section('edit-email-active','active')
@section('style')
<style>
    #form-password,
    #form-email {
        max-width: 500px;
        margin-left: 0px
    }

</style>
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\jquery-ui.min.css') }}">
<link rel="stylesheet"
    href="{{ asset('vendor\jquery-ui-themes-1.12.1\themes\base\theme.css') }}">
@endsection
@section('content-detail')
<div class="account-container">
    <div class="container-sandi">
        <h5>Ganti Email</h5>
        <form action="" id="form-email">
            <div class="form-group">
                <label for="" class="mr-2">Email</label>
                <input type="email" class="form-control form-sijabfung" name="email"
                    value="{{ Auth::user()->email }}" />
            </div>
            <button type="submit" class="btn-jabfung btn" style="width:100%" id="btnUpdateEmail">Simpan
                Perubahan</button>
        </form>
    </div>
    <hr>
    <div class="container-sandi">
        <form action="" id="form-password">
            <h5>Ganti Kata Sandi</h5>
            <div class="form-group">
                <label for="" class="mr-2">Sandi Lama</label>
                <input type="password" class="form-control form-sijabfung" name="old_password" />
            </div>
            <div class="form-group">
                <label for="" class="mr-2">Sandi Baru</label>
                <input type="password" class="form-control form-sijabfung" name="new_password" />
            </div>
            <div class="form-group">
                <label for="" class="mr-2">Konfirmasi Sandi Baru</label>
                <input type="password" class="form-control form-sijabfung" name="confirm_password" />
            </div>
            <button type="submit" class="btn-jabfung btn" style="width:100%" id="btnUpdatePassword">Simpan
                Perubahan</button>
        </form>
    </div>
</div>
@endsection
@section('script')
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="{{ asset('vendor/jquery-validation-1.19.2/jquery.validate.min.js') }}"></script>
<script src="{{ asset('vendor/jquery-validation-1.19.2/additional-methods.min.js') }}"></script>
<script src="{{ asset('js\user\profile-account-setting.js') }}"></script>
@endsection
