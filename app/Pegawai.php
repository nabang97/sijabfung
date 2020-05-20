<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    //
    protected $table = 'pegawais';

    public function kondisi()
    {
        return $this->belongsTo('App\Kondisi', 'pegawai');
    }
}
