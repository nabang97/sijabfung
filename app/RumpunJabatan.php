<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RumpunJabatan extends Model
{
    protected $table = 'rumpun_jabatan';
    
    public $timestamps = true;

    public function instansi_pembina()
    {
        return $this->belongsTo('App\InstansiPembina', 'id_instansi');
    }

    public function jabatan_fungsional()
    {
        return $this->hasMany('App\JabatanFungsional', 'id');
    }
}
