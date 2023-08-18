import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import dayjs from 'dayjs';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import SelectInput from '@/components/SelectInput';
import TextArea from '@/components/TextArea';

const urlBefore = [{ name: 'Claim', url: '/claim' }];

function ProcessClaimPage({ auth, claim }: InertiaProps) {
  const { data, setData, processing, post, errors } = useForm({
    claim_amount: claim.claim_amount || '',
    claim_status: claim.claim_status || 'pending',
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('claim.submit', claim.id));
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Process Claim" />
      <Breadcrumb pageName="Process Claim" urlBefore={urlBefore} />
      <div className="w-full">
        <Form title="Process Claim" onSubmit={submit}>
          <div className="mb-8">
            <h2 className="mb-4 mt-6 text-lg font-semibold">Member</h2>
            <div className="grid grid-cols-1 gap-6 rounded-sm border border-gray p-4 lg:grid-cols-2">
              <div className="mb-4.5 lg:col-span-2 lg:w-1/2 lg:pr-4">
                <TextInput
                  label="Member Number"
                  type="text"
                  value={claim.member.member_number}
                  disabled
                />
              </div>
              <div className="mb-4.5">
                <TextInput
                  label="Name"
                  type="text"
                  value={claim.member.name}
                  disabled
                />
              </div>
              <div className="mb-4.5">
                <SelectInput
                  label="Status"
                  value={claim.member.status}
                  disabled
                >
                  <option value="active">Active</option>
                  <option value="terminated">Terminated</option>
                </SelectInput>
              </div>
              <div className="mb-4.5">
                <TextInput
                  label="Phone Number"
                  type="text"
                  value={claim.member.phone_number}
                  disabled
                />
              </div>
              <div className="mb-4.5">
                <TextInput
                  label="Email"
                  type="email"
                  value={claim.member.email}
                  disabled
                />
              </div>
              <div className="lg:col-span-2">
                <TextArea
                  label="Address"
                  value={claim.member.address}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="mb-4 mt-6 text-lg font-semibold">Provider</h2>
            <div className="grid grid-cols-1 gap-6 rounded-sm border border-gray p-4 lg:grid-cols-2">
              <div className="mb-4.5 lg:col-span-2 lg:w-1/2 lg:pr-4">
                <TextInput
                  label="Provider Number"
                  type="text"
                  value={claim.provider.provider_number}
                  disabled
                />
              </div>
              <div className="mb-4.5">
                <TextInput
                  label="Name"
                  type="text"
                  value={claim.provider.name}
                  disabled
                />
              </div>
              <div className="mb-4.5">
                <TextInput
                  label="Contact Info"
                  type="contact"
                  value={claim.provider.contact}
                  disabled
                />
              </div>
              <div className="lg:col-span-2">
                <TextArea
                  label="Address"
                  value={claim.provider.address}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Claim Number"
              id="claim_number"
              name="claim_number"
              type="text"
              value={claim.claim_number}
              disabled
            />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Diagnosis"
              id="diagnosis"
              name="diagnosis"
              type="text"
              value={claim.diagnosis}
              disabled
            />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Treatment Date"
              id="treatment_date"
              name="treatment_date"
              type="date"
              value={dayjs(claim.treatment_date).format('YYYY-MM-DD')}
              disabled
            />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Bill from Provider"
              id="claim_bill"
              name="claim_bill"
              type="text"
              prefix="Rp. "
              value={claim.claim_bill}
              disabled
            />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Claim Amount"
              id="claim_amount"
              name="claim_amount"
              type="text"
              prefix="Rp. "
              value={data.claim_amount}
              onChange={(e) => setData('claim_amount', e.target.value)}
            />
            <InputError message={errors.claim_amount} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <SelectInput
              label="Claim Status"
              value={data.claim_status}
              onChange={(e) => setData('claim_status', e.target.value)}
            >
              <option value="pending">Pending</option>
              {claim.member.status === 'active' && (
                <>
                  <option value="verified">Verified</option>
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                </>
              )}
              <option value="rejected">Rejected</option>
              {claim.member.status === 'active' && (
                <>
                  <option value="paid">Paid</option>
                  <option value="closed">Closed</option>
                </>
              )}
            </SelectInput>
          </div>
          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default ProcessClaimPage;
