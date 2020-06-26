<?php

namespace App\Exports\Exports;

use App\Pegawai;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;

class PegawaiExport extends DefaultValueBinder implements WithCustomValueBinder,
    FromCollection,
    ShouldAutoSize, 
    WithColumnFormatting, 
    WithMapping, 
    WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Pegawai::select('pegawais.nip as nip','pegawais.name as name','pegawais.birthday_date as tanggal_lahir', 'pegawais.birthday_place as tempat_lahir', 'golongans.name as golongan_name', 'jabatan_fungsional.nama as jabatan', 'jenjang_jabfung.nama as jenjang', 'pegawais.unit_kerja as unit_kerja' )
        ->leftJoin('jenjang_jabfung',function($join) {
            $join->on('jenjang_jabfung.id', '=', 'pegawais.id_jenjang_jabfung');
        })
        ->leftJoin('golongans',function($join) {
            $join->on('golongans.id', '=', 'pegawais.golongan');
        })
        ->leftJoin('detail_jabfung',function($join) {
            $join->on('detail_jabfung.id', '=', 'jenjang_jabfung.id_detail_jabfung');
        })
        ->leftJoin('jabatan_fungsional',function($join) {
            $join->on('detail_jabfung.jabfung', '=', 'jabatan_fungsional.id');
        })
        ->get();
    }

    public function map($pegawai): array
    {
        return [
            $pegawai->nip,
            $pegawai->name,
            $pegawai->tempat_lahir,
            Date::stringToExcel($pegawai->tanggal_lahir),
            $pegawai->golongan_name,
            $pegawai->jabatan,
            $pegawai->jenjang,
            $pegawai->unit_kerja     
        ];
    }

    public function headings(): array
    {
        return [
            'NIP',
            'Nama',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Golongan',
            'Jabatan Fungsional',
            'Jenjang Jabatan',
            'Unit Kerja'
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => '@',
            'D' => NumberFormat::FORMAT_DATE_XLSX15
        ];
    }

    public function bindValue(Cell $cell, $value)
    {
        if (is_numeric($value) && (strlen($value) == 18)) {
            
            $cell->setValueExplicit($value, DataType::TYPE_STRING);

            return true;
        }

        // else return default behavior
        return parent::bindValue($cell, $value);
    }

}
