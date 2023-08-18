<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use Barryvdh\DomPDF\Facade\Pdf;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClaimController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Claim/index');
  }

  public function list(Request $request)
  {
    $query = Claim::with(['member', 'provider'])->orderBy('updated_at', 'desc');

    $claims = $query->paginate($request->size ?? 10)->withQueryString();
    return response()->json($claims);
  }

  public function process(Request $request)
  {
    $claim = Claim::with(['member', 'provider'])->find($request->id);
    return Inertia::render('Claim/Process/index', [
      'claim' => $claim
    ]);
  }

  public function submit(Request $request): RedirectResponse
  {
    $claim =  Claim::with(['member', 'provider'])
      ->findOrFail($request->id);

    $request->validate([
      'claim_amount' => [
        'required', 'numeric',
        'max:999999999',
        function (string $attribute, mixed $value, Closure $fail) use ($claim) {
          if ($claim->claim_bill != $value) {
            $fail("Claim amount not equal to bill from provider");
          }
        },
      ],
      'claim_status' => [
        'required',
        'in:pending,verified,processing,approved,rejected,paid,closed'
      ],
      function (string $attribute, mixed $value, Closure $fail) use ($claim) {
        if ($claim->member->status === 'terminated' && !in_array($value, ['rejected', 'closed'])) {
          $fail("Claim status not allowed because member status \"Terminated\"");
        }
      },
    ]);

    $claim->update([
      'claim_amount' => $request->claim_amount,
      'claim_status' => $request->claim_status,
    ]);

    return redirect(route('claim.index'));
  }

  public function downloadLetterOfGuarantee(Request $request)
  {
    $claim =  Claim::with(['member', 'provider'])
      ->findOrFail($request->id);

    if ($claim->claim_status !== 'approved') {
      return response()->json(['error' => 'claim status not allowed'], 400);
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
