<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider_number',
        'name',
        'address',
        'contact',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            $lastItem = Provider::orderBy('id', 'desc')->first();

            if ($lastItem) {
                $lastId = intval(substr($lastItem->provider_number, 3));
                $item->provider_number = 'PVD' . str_pad($lastId + 1, 4, '0', STR_PAD_LEFT);
            } else {
                $item->provider_number = 'PVD0001';
            }
        });
    }

    public function claims(): HasMany
    {
        return $this->hasMany(Claim::class);
    }
}
