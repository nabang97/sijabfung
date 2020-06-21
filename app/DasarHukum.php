<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DasarHukum extends Model
{
    //
    protected $table = 'dasar_hukum';

    public $timestamps = true;

    protected $casts = [
        'status' => 'boolean',
    ];
}
