<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diklat extends Model
{
    protected $table = 'diklat_yang_diikuti';
    protected $fillable = ['id', 'nip', 'name', 'tahun_mengikuti'];
    public $timestamps = true;

    public function pegawai()
    {
        return $this->belongsTo('App\Pegawai', 'nip');
    }
}
