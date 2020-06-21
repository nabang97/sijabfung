<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailJabfung extends Model
{
    //
    protected $table = 'detail_jabfung';

    public $timestamps = true;

    public function kategori()
    {
        return $this->belongsTo('App\Kategori', 'kategori');
    }

    public function jabfung()
    {
        return $this->belongsTo('App\JabatanFungsional', 'jabfung');
    }

    public function jabatan_fungsional()
    {
        return $this->belongsTo('App\JabatanFungsional', 'jabfung');
    }

    public function jenjang_jabatan()
    {
        return $this->hasMany('App\JenjangJabatan', 'id');
    }
}
