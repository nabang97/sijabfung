<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kondisi extends Model
{
    //
    protected $table = 'kondisis';
    protected $primaryKey = ['date_kondisi', 'pegawai'];
    public $incrementing = false; 
    protected $fillable =['date_kondisi', 'pegawai', 'jabatan'];

    public function pegawais()
    {
        return $this->belongsTo('App\Pegawai', 'pegawai');
    }

    public function jabatans()
    {
        return $this->belongsTo('App\Jabatan', 'jabatan');
    }
}
