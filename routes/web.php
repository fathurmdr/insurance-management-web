<?php

use App\Http\Controllers\ClaimController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PublicApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect((route('member.index')));
});

// Public API
Route::get('api/member/{member_number}', [PublicApiController::class, 'memberDetail'])->name('public.member');
Route::get('api/claim/{claim_number}', [PublicApiController::class, 'claimDetail'])->name('public.claim');
Route::get('api/claim/{claim_number}/letter-of-guarantee', [PublicApiController::class, 'downloadLetterOfGuarantee'])->name('public.letter_of_guarantee');

// Admin
Route::middleware(['auth'])->group(function () {
    Route::get('member/list', [MemberController::class, 'list'])->name('member.list');
    Route::patch('member/bulk-terminate', [MemberController::class, 'bulkTerminate'])->name('member.bulk_terminate');
    Route::patch('member/terminate/{member}', [MemberController::class, 'terminate'])->name('member.terminate');
    Route::resource('member', MemberController::class)
        ->only(['index', 'create', 'store', 'update', 'edit']);

    Route::get('claim', [ClaimController::class, 'index'])->name('claim.index');
    Route::get('claim/list', [ClaimController::class, 'list'])->name('claim.list');
    Route::get('claim/{id}/process', [ClaimController::class, 'process'])->name('claim.process');
    Route::post('claim/{id}', [ClaimController::class, 'submit'])->name('claim.submit');
    Route::get('claim/{id}/letter-of-guarantee', [ClaimController::class, 'downloadLetterOfGuarantee'])->name('claim.letter_of_guarantee');
});

require __DIR__ . '/auth.php';
