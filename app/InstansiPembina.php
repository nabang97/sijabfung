<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InstansiPembina extends Model
{
    protected $table = 'instansi_pembina';

    protected $fillable = ['name'];
    
    public $timestamps = true;

    public function rumpun_jabatan()
    {
        return $this->hasMany('App\RumpunJabatan', 'id_instansi');
    }
}
