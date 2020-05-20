<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kondisi extends Model
{
    //
    protected $table = 'konidisis';
    protected $primaryKey = ['date_kondisi', 'pegawai'];

    public function pegawais()
    {
        return $this->hasMany('App\Pegawai', 'pegawai');
    }

    public function jabatans()
    {
        return $this->hasMany('App\Jabatan', 'jabatan');
    }
}
