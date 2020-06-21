<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailJabfungTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_jabfung', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('jabfung')->unsigned();
            $table->bigInteger('kategori')->unsigned();
            $table->bigInteger('lingkup')->unsigned();
            // $table->primary(['id','jabfung','kategori','lingkup'])->unique();
            $table->timestamps();
        });

        Schema::table('detail_jabfung', function($table)
        {  
            $table->foreign('jabfung')->references('id')->on('jabatan_fungsional')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('kategori')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_jabfung');
    }
}
