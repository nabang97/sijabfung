<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = 'categories';
    public $timestamps = true;

    public function detail_jabfung()
    {
        return $this->hasMany('App\DetailJabfung', 'id');
    }
}
