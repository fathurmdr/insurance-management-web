<!DOCTYPE html>
<html>

<head>
  <title>Letter of Guarantee</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      margin-bottom: 5px;
    }

    .signature {
      margin-top: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Letter of Guarantee for Claim</h1>
    <p>Date: {{ date('d-m-Y') }}</p>
    <p>To: The Provider</p>
    <p>{{ $provider->name }}</p>
    <p>Address: {{ $provider->address }}</p>

    <p>With this letter, we guarantee that the member with member number {{ $member->member_number }} and claim number {{ $claim_number }} has fulfilled the requirements and procedures for the claim.</p>
    <p>We kindly request your cooperation and attention in handling the claim process.</p>


    <div class="signature">
      <p>Yours sincerely,</p>
      <p>PT Kartika Bina Medikatama</p>
    </div>
  </div>
</body>

</html>