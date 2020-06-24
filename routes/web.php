<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['guest']], function(){  
    
    Route::get('login', 'AuthController@login')->name('login');
    Route::post('login', 'AuthController@postLogin');
    Route::get('register', 'RegisterController@index');
    Route::post('register', 'RegisterController@create');   
    
});

Route::get('/', 'HomeController@index');
Route::get('dasar-hukum/view/{id}', 'DasarHukumController@view');
Route::get('dasar-hukum/all', 'DasarHukumController@showPost');
Route::get('/api/dasar-hukum/newest', 'DasarHukumController@newest');
Route::get('/api/dasar-hukum/all/search' , 'DasarHukumController@search');
Route::view('jabatan-fungsional', 'jabatan_fungsional');
Route::get('/api/pegawai', 'PegawaiController@index');
Route::get('/api/pegawai/search', 'PegawaiController@serachPegawai');
Route::get('/pegawai/diklat','PegawaiController@diklat');
Route::get('/api/jabatan-fungsional', 'JabatanFungsionalController@index');
Route::get('/api/jenjang-jabatan', 'JenjangJabatanController@index');
Route::get('/api/kategori', 'KategoriController@index');
Route::get('/api/golongan', 'GolonganController@index');
Route::get('/api/detail-jabfung', 'DetailJabfungController@index');
Route::get('/api/instansi-pembina', 'InstansiPembinaController@index');
Route::get('/api/rumpun-jabatan', 'RumpunJabatanController@index');
Route::get('/api/jenjang-jabatan/option', 'JenjangJabatanController@optionByIndex');
Route::get('/api/detail-jabfung/kategori-lingkup', 'DetailJabfungController@optionByIndex');
Route::get('/api/rumpun-jabatan-option', 'RumpunJabatanController@optionByIndex');
Route::get('/api/jabatan-fungsional-option', 'JabatanFungsionalController@optionByIndex');
Route::post('/api/register/create', 'PegawaiController@store');
Route::post('/api/register/create/account', 'PegawaiController@createAccount');

Route::group(['middleware' => 'auth'], function(){
    Route::get('/logout', 'AuthController@logout');
});

Route::group(['middleware' => ['auth', 'user']], function(){
    Route::view('/profile', 'user.detail_information');
    Route::get('/profile/edit', 'ProfileController@edit');
    Route::post('/profile/update', 'ProfileController@update');
    Route::get('/profile/riwayat-diklat', 'ProfileController@editDiklat');
    Route::get('/api/profile/diklat','ProfileController@view');
    Route::post('/api/profile/diklat/update','ProfileController@updateDiklat');
    Route::post('/api/profile/diklat/store','ProfileController@storeDiklat');
    Route::post('/api/profile/diklat/remove','ProfileController@removeDiklat');
    Route::get('/profile/setting','ProfileController@settingView');
    Route::post('/profile/setting/email','ProfileController@updateEmail');
    Route::post('/profile/setting/password','ProfileController@updatePassword');
    Route::post('/profile/photo','ProfileController@uploadPhoto');
});


Route::group(['middleware' => ['auth', 'admin']], function(){   
    Route::view('/admin/dasar-hukum', 'admin.dasar_hukum');
    Route::view('/admin/golongan', 'admin.golongan');
    Route::view('/admin/instansi-pembina', 'admin.instansi_pembina');
    Route::view('/admin/rumpun-jabatan', 'admin.rumpun_jabatan');
    Route::view('/admin/kategori', 'admin.kategori');
    Route::view('/admin/pegawai', 'admin.pegawai');
    Route::view('/admin/jabatan-fungsional', 'admin.jabatan_fungsional');
    Route::view('/admin/jenjang-jabatan', 'admin.jenjang_jabatan');
    Route::view('/admin/detail-jabfung', 'admin.detail_jabfung');
    Route::view('/admin/dasar-hukum', 'admin.dasar_hukum');
    
    Route::post('/admin/dasar-hukum','DasarHukumController@store')->name('file.store');    // Dasar Hukum
    Route::get('/api/dasar-hukum', 'DasarHukumController@index');
    Route::post('/api/dasar-hukum/destroy', 'DasarHukumController@destroy');
    Route::post('/api/dasar-hukum/post', 'DasarHukumController@post');
    Route::post('/api/dasar-hukum/update', 'DasarHukumController@update');

    //detail jabatan fungsional

    
    Route::post('/api/detail-jabfung/store', 'DetailJabfungController@store');
    Route::post('/api/detail-jabfung/check', 'DetailJabfungController@check');
    Route::post('/api/detail-jabfung/update', 'DetailJabfungController@update');
    Route::post('/api/detail-jabfung/destroy', 'DetailJabfungController@destroy');

    // kelola golongan
    
    Route::post('/api/golongan/store', 'GolonganController@store');
    Route::post('/api/golongan/destroy', 'GolonganController@destroy');
    Route::post('/api/golongan/update', 'GolonganController@update');

    Route::post('/api/pegawai/store', 'PegawaiController@store');
    Route::post('/api/pegawai/destroy', 'PegawaiController@destroy');
    Route::post('/api/pegawai/profile/update', 'PegawaiController@update');
    Route::post('/api/pegawai/account', 'PegawaiController@getAccount');
    Route::post('/api/pegawai/account/update', 'PegawaiController@updateAccount');
    Route::post('/api/pegawai/diklat/update','PegawaiController@updateDiklat');
    Route::post('/api/pegawai/diklat/destroy','PegawaiController@destroyDiklat');

    // Route::post('api/register/create', 'PegawaiController@store');
    // Route::post('api/register/create/account', 'PegawaiController@createAccount');

    //kelola instansi pembina
    
    Route::post('/api/instansi-pembina/store', 'InstansiPembinaController@store');
    Route::post('/api/instansi-pembina/update', 'InstansiPembinaController@update');
    Route::post('/api/instansi-pembina/destroy', 'InstansiPembinaController@destroy');

    //kelola rumpun jabatan

   
    Route::post('/api/rumpun-jabatan/store', 'RumpunJabatanController@store');
    Route::post('/api/rumpun-jabatan/update', 'RumpunJabatanController@update');
    Route::post('/api/rumpun-jabatan/destroy', 'RumpunJabatanController@destroy');
    

    //kelola kategori

    
    Route::post('/api/kategori/store', 'KategoriController@store');
    Route::post('/api/kategori/update', 'KategoriController@update');
    Route::post('/api/kategori/destroy', 'KategoriController@destroy');
    Route::get('/api/kategori-option', 'KategoriController@optionByIndex');

    //kelola jabatan fungsional

    Route::post('/api/jabatan-fungsional/store', 'JabatanFungsionalController@store');
    Route::post('/api/jabatan-fungsional/update', 'JabatanFungsionalController@update');
    Route::post('/api/jabatan-fungsional/destroy', 'JabatanFungsionalController@destroy');
    

    // jenjang jabatan

   
    Route::post('/api/jenjang-jabatan/store', 'JenjangJabatanController@store');
    Route::post('/api/jenjang-jabatan/update', 'JenjangJabatanController@update');
    Route::post('/api/jenjang-jabatan/destroy', 'JenjangJabatanController@destroy');
    

    // jenjang jabatan

    // Route::get('/api/jabatan-fungsional-pegawai', 'JabfungPegawaiController@index');
    // Route::post('/api/jabatan-fungsional-pegawai/store', 'JabfungPegawaiController@store');
    // Route::post('/api/jabatan-fungsional-pegawai/update', 'JabfungPegawaiController@update');
    // Route::post('/api/jabatan-fungsional-pegawai/destroy', 'JabfungPegawaiController@destroy');

    Route::get('/api/dasar-hukum/all' , 'DasarHukumController@showPostApi');
    Route::view('/admin/slider' , 'admin.slider');
    Route::get('/admin/slider/index' , 'SliderController@all');
    Route::post('/admin/slider/store','SliderController@store')->name('slider.store'); 
    Route::post('/admin/slider/destroy' , 'SliderController@destroy');
    
});
