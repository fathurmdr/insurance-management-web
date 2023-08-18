<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'provider_id',
        'diagnosis',
        'claimd_date',
        'claim_amount',
        'claim_status',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            $lastItem = Claim::orderBy('id', 'desc')->first();

            if ($lastItem) {
                $lastId = intval(substr($lastItem->claim_number, 3));
                $item->claim_number = 'CLM' . str_pad($lastId + 1, 4, '0', STR_PAD_LEFT);
            } else {
                $item->claim_number = 'CLM0001';
            }
        });
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
