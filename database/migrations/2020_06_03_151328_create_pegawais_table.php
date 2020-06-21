<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePegawaisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pegawais', function (Blueprint $table) {
            $table->string('nip', 9);
            $table->string('name');
            $table->string('birthday_place');
            $table->date('birthday_date');
            $table->integer('golongan'); 
            $table->bigInteger('id_jenjang_jabfung', false)->unsigned();  
            $table->string('unit_kerja');   
            $table->text('photo_path')->nullable();      
            $table->timestamps();
            $table->primary('nip');
            
           
        });

        Schema::table('pegawais', function($table)
        {  
            $table->foreign('golongan')->references('id')->on('golongans')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_jenjang_jabfung')->references('id')->on('jenjang_jabfung')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pegawais');
        $table->dropForeign('pegawais_golongan_foreign');
    }
}
