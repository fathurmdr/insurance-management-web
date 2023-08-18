import { FormEvent, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import GuestLayout from '@/layouts/GuestLayout';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import Checkbox from '@/components/Checkbox';
import PrimaryButton from '@/components/PrimaryButton';

interface LoginPageProps {
  status: string;
}

function LoginPage({ status }: LoginPageProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('login'));
  };

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <TextInput
            label="Email"
            placeholder="Enter Your Email..."
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <TextInput
            label="Password"
            placeholder="Enter Your Password..."
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="my-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="text-gray-600 ml-2 text-sm">Remember me</span>
          </label>
        </div>
        <PrimaryButton disabled={processing}>Log in</PrimaryButton>
      </form>
    </GuestLayout>
  );
}

export default LoginPage;
