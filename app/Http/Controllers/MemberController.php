<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Member/index');
    }

    public function list(Request $request)
    {
        $query = Member::orderBy('updated_at', 'desc');

        $members = $query->paginate($request->size ?? 10)->withQueryString();
        return response()->json($members);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Member/Add/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone_number' => ['required', 'regex:/^(\+62|0)[0-9]{9,12}$/'],
            'email' => 'required|email',
            'status' => 'required|in:active,terminated',
            'registration_date' => 'required|date',
            'membership_start_date' => 'required|date',
            'membership_end_date' => 'required|date|after:membership_start_date',
        ]);

        Member::create([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'status' => $request->status,
            'registration_date' => $request->registration_date,
            'membership_start_date' => $request->membership_start_date,
            'membership_end_date' => $request->membership_end_date,
        ]);

        return redirect(route('member.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        return Inertia::render('Member/Edit/index', [
            'member' => $member,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone_number' => ['required', 'regex:/^(\+62|0)[0-9]{9,12}$/'],
            'email' => 'required|email',
            'status' => 'required|in:active,terminated',
            'membership_start_date' => 'required|date',
            'membership_end_date' => 'required|date|after:membership_start_date',
        ]);

        $termination_date = $request->status === 'terminated' ? date('Y-m-d') : null;

        $member->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'status' => $request->status,
            'membership_start_date' => $request->membership_start_date,
            'membership_end_date' => $request->membership_end_date,
            'termination_date' => $termination_date,
        ]);

        return redirect(route('member.index'));
    }

    public function terminate(Member $member): RedirectResponse
    {
        $member->update([
            'status' => 'terminated',
            'termination_date' => date('Y-m-d'),
        ]);
        return redirect(route('member.index'));
    }

    public function bulkTerminate(Request $request): RedirectResponse
    {
        foreach ($request->members as $member) {
            Member::findOrFail($member['id'])->update([
                'status' => 'terminated',
                'termination_date' => date('Y-m-d'),
            ]);
        }
        return redirect(route('member.index'));
    }
}
