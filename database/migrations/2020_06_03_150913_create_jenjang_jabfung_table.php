<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenjangJabfungTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jenjang_jabfung', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->bigInteger('id_detail_jabfung')->unsigned();
            $table->timestamps();
        });

        Schema::table('jenjang_jabfung', function($table)
        {  
            $table->foreign('id_detail_jabfung')->references('id')->on('detail_jabfung')->onDelete('cascade')->onUpdate('cascade');
         });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jenjang_jabfung');
    }
}
