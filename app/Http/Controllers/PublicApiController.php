<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Member;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    public function memberDetail(Request $request)
    {
        $member = Member::where('member_number', $request->member_number)
            ->first();
        return response()->json($member);
    }

    public function claimDetail(Request $request)
    {
        $claim = Claim::where('claim_number', $request->claim_number)
            ->first();
        return response()->json($claim);
    }

    public function downloadLetterOfGuarantee(Request $request)
    {
        $claim =  Claim::with(['member', 'provider'])
            ->where('claim_number', $request->claim_number)
            ->first();

        if ($claim->claim_status !== 'approved') {
            abort(400, 'Bad Request');
        }

        $data = [
            'provider' => $claim->provider,
            'member' => $claim->member,
            'claim_number' => $claim->claim_number,
        ];

        $pdf = Pdf::loadView('pdf.letterOfGuarantee', $data)->setPaper('a4')->setWarnings(false);
        return $pdf->download($claim->claim_number . '-' . $claim->member->name . '.pdf');
    }
}
