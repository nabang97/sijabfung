<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    //
    protected $table = 'jabatans';
    protected $primaryKey = 'id';
    protected $fillable = ['name'];

    public function kondisi()
    {
        return $this->hasMany('App\Kondisi', 'id');
    }
}
