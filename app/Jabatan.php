<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    //
    protected $table = 'jabatans';

    public function kondisi()
    {
        return $this->belongsTo('App\Kondisi', 'jabatan');
    }
}
