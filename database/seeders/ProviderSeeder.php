<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Provider;

class ProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hospitals = [
            ['name' => 'RS Pondok Indah', 'address' => 'Jl. Metro Pondok Indah, Jakarta Selatan', 'contact' => '021-12345678'],
            ['name' => 'RS Puri Indah', 'address' => 'Jl. Puri Indah Raya, Jakarta Barat', 'contact' => '021-87654321'],
            ['name' => 'RS Siloam Semanggi', 'address' => 'Jl. Jend. Sudirman Kav. 50, Jakarta Selatan', 'contact' => '021-98765432'],
            ['name' => 'RS Cipto Mangunkusumo', 'address' => 'Jl. Diponegoro No. 71, Jakarta Pusat', 'contact' => '021-5555555'],
            ['name' => 'RS Mitra Keluarga Kelapa Gading', 'address' => 'Jl. Bukit Gading Raya, Jakarta Utara', 'contact' => '021-43210987'],
            ['name' => 'RS Mayapada Lebak Bulus', 'address' => 'Jl. Lebak Bulus Raya, Jakarta Selatan', 'contact' => '021-76543210'],
            ['name' => 'RS Omni Alam Sutera', 'address' => 'Jl. Jalur Sutera Barat, Tangerang', 'contact' => '021-54321098'],
            ['name' => 'RS Husada Utama Surabaya', 'address' => 'Jl. HR. Muhammad No. 73, Surabaya', 'contact' => '031-9876543'],
            ['name' => 'RS Dr. Soetomo Surabaya', 'address' => 'Jl. Mayjen. Prof. Dr. Moestopo No. 6-8, Surabaya', 'contact' => '031-5555555'],
            ['name' => 'RS Bethesda Yogyakarta', 'address' => 'Jl. Jend. Sudirman No. 70, Yogyakarta', 'contact' => '0274-123456'],
        ];

        foreach ($hospitals as $hospital) {
            Provider::create([
                'name' => $hospital['name'],
                'address' => $hospital['address'],
                'contact' => $hospital['contact'],
            ]);
        }
    }
}
