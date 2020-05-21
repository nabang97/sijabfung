<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    //
    protected $table = 'jabatans';
    protected $fillable = ['name'];

    public function kondisi()
    {
        return $this->belongsTo('App\Kondisi', 'jabatan');
    }
}
