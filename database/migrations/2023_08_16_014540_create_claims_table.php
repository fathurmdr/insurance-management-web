<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->string('claim_number', 7)->unique();
            $table->foreignId('member_id')->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('provider_id')->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('diagnosis');
            $table->timestamp('treatment_date');
            $table->timestamp('claim_date');
            $table->float('claim_bill', 10, 2);
            $table->float('claim_amount', 10, 2)->nullable();
            $table->enum('claim_status', [
                'pending',
                'verified',
                'processing',
                'approved',
                'rejected',
                'paid',
                'closed',
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
