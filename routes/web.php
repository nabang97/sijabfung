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



Route::get('/', 'GolonganController@index');

Route::view('/admin/golongan', 'admin.golongan');

Route::view('/admin/jabatan', 'admin.jabatan');

Route::view('/admin/pegawai', 'admin.pegawai');
