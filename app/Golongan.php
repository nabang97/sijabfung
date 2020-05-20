<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Golongan extends Model
{
    //
    protected $table = 'golongans';

    public function pegawai()
    {
        return $this->belongsTo('App\Pegawai', 'nip');
    }
}
