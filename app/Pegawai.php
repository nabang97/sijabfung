<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    //
    protected $table = 'pegawais';
    protected $fillable =['nip',
    'name',
    'birthday_date',
    'birthday_place'];

    public function golongans()
    {
        return $this->belongsTo('App\Golongan', 'golongan');
    }

    public function kondisi()
    {
        return $this->belongsTo('App\Kondisi', 'pegawai');
    }
}
