<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Golongan;

class GolonganController extends Controller
{
    //
    function index(){

        $golongan = Golongan::get();

        return view('home')->with(['golongans' => $golongan]);
    }
}
