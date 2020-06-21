<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiklatYangDiikutiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diklat_yang_diikuti', function (Blueprint $table) {
            $table->integer('id');
            $table->string('nip', 9);
            $table->string('name');
            $table->integer('tahun_mengikuti', false);
            $table->timestamps();
            $table->primary(array('id', 'nip'));
        });

        Schema::table('diklat_yang_diikuti', function($table)
        {  
            $table->foreign('nip')->references('nip')->on('pegawais')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diklat_yang_diikuti');
    }
}
