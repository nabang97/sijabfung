<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRumpunJabatanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rumpun_jabatan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->bigInteger('id_instansi', false)->unsigned();
            $table->timestamps();
        });

        Schema::table('rumpun_jabatan', function($table)
        {  
            $table->foreign('id_instansi')->references('id')->on('instansi_pembina')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rumpun_jabatan');
    }
}
