export type AuthUser = {
  id: number;
  name: string;
  profile_photo: string;
  email: string;
  admin: string;
};

export type Member = {
  id: number;
  member_number: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  status: string;
  registration_date: string;
  membership_start_date: string;
  membership_end_date: string;
  termination_date: string;
};

export type Provider = {
  id: number;
  provider_number: string;
  name: string;
  address: string;
  contact: string;
};

export type Claim = {
  id: number;
  claim_number: string;
  member: Member;
  provider: Provider;
  diagnosis: string;
  treatment_date: string;
  claim_date: string;
  claim_bill: string;
  claim_amount: string;
  claim_status: string;
};

export interface InertiaProps {
  status: string;
  auth: {
    user: AuthUser | null;
  };
  member: Member;
  claim: Claim;
}
