import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import SelectInput from '@/components/SelectInput';

const urlBefore = [{ name: 'Member', url: '/member' }];

function AddMemberPage({ auth }: InertiaProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    address: '',
    phone_number: '',
    email: '',
    status: 'active',
    registration_date: '',
    membership_start_date: '',
    membership_end_date: '',
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('member.store'));
  };
  return (
    <AdminLayout user={auth.user}>
      <Head title="Add Member" />
      <Breadcrumb pageName="Add Member" urlBefore={urlBefore} />
      <div className="w-full">
        <Form title="Add Member" onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Full Name"
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Address"
              id="address"
              name="address"
              type="text"
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
            />
            <InputError message={errors.address} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Phone Number"
              id="phone_number"
              name="phone_number"
              type="text"
              value={data.phone_number}
              onChange={(e) => setData('phone_number', e.target.value)}
            />
            <InputError message={errors.phone_number} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Email"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <SelectInput
              label="Status"
              id="status"
              name="status"
              disabled
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
            >
              <option selected value="active">
                Active
              </option>
              <option value="terminated">Terminated</option>
            </SelectInput>
            <InputError message={errors.status} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Registration Date"
              id="registration_date"
              name="registration_date"
              type="date"
              value={data.registration_date}
              onChange={(e) => setData('registration_date', e.target.value)}
            />
            <InputError message={errors.registration_date} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Membership Start Date"
              id="membership_start_date"
              name="membership_start_date"
              type="date"
              value={data.membership_start_date}
              onChange={(e) => setData('membership_start_date', e.target.value)}
            />
            <InputError
              message={errors.membership_start_date}
              className="mt-2"
            />
          </div>
          <div className="mb-8">
            <TextInput
              label="Membership End Date"
              id="membership_end_date"
              name="membership_end_date"
              type="date"
              value={data.membership_end_date}
              onChange={(e) => setData('membership_end_date', e.target.value)}
            />
            <InputError message={errors.membership_end_date} className="mt-2" />
          </div>
          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default AddMemberPage;
