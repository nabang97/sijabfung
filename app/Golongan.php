<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Golongan extends Model
{
    //
    protected $table = 'golongans';
    protected $fillable = ['name'];
    public $timestamps = true;

    public function pegawais()
    {
        return $this->hasMany('App\Pegawai', 'id');
    }
}
