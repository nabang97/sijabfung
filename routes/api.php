<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('golongan', 'GolonganController@index');

Route::post('golongan/store', 'GolonganController@store');

Route::post('golongan/destroy', 'GolonganController@destroy');

Route::post('golongan/update', 'GolonganController@update');

Route::get('jabatan', 'JabatanController@index');

Route::post('jabatan/store', 'JabatanController@store');

Route::post('jabatan/destroy', 'JabatanController@destroy');

Route::post('jabatan/update', 'JabatanController@update');

Route::get('pegawai', 'PegawaiController@index');

Route::post('pegawai/store', 'PegawaiController@store');

Route::post('pegawai/destroy', 'PegawaiController@destroy');

Route::post('pegawai/update', 'PegawaiController@update');