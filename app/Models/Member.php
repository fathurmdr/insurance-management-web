<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'email',
        'status',
        'registration_date',
        'membership_start_date',
        'membership_end_date',
        'termination_date',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            $lastItem = Member::orderBy('id', 'desc')->first();

            if ($lastItem) {
                $lastId = intval(substr($lastItem->member_number, 3));
                $item->member_number = 'MBR' . str_pad($lastId + 1, 4, '0', STR_PAD_LEFT);
            } else {
                $item->member_number = 'MBR0001';
            }
        });
    }

    public function claims(): HasMany
    {
        return $this->hasMany(Claim::class);
    }
}
