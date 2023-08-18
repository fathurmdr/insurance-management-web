import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { AxiosResponse } from 'axios';
import { MdEdit, MdLocalPrintshop } from 'react-icons/md';
import dayjs from 'dayjs';
import { InertiaProps, Claim } from '@/interface/Inertia';
import Breadcrumb from '@/components/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import Table, { ColumnTypes } from '@/components/Table';
import Pagination from '@/components/Pagination';
import { PaginationData } from '@/interface/pagination';
import api from '@/api/axios';

function ClaimPage({ auth }: InertiaProps) {
  const [claims, setClaims] = useState<PaginationData<Claim> | null>(null);
  const [loading, setLoading] = useState(true);

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<Claim>>) => {
          setClaims(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const claimColumns: ColumnTypes<Claim> = [
    {
      dataIndex: 'claim_number',
      name: 'Claim Number',
      width: '110px',
      textAlign: 'center',
    },
    {
      dataIndex: 'member',
      name: 'Member Name',
      width: '200px',
      textAlign: 'left',
      render: (_, record) => <span>{record.member.name}</span>,
    },
    {
      dataIndex: 'provider',
      name: 'Provider',
      width: '200px',
      textAlign: 'left',
      render: (_, record) => <span>{record.provider.name}</span>,
    },
    {
      dataIndex: 'diagnosis',
      name: 'Disagnosis',
      width: '150px',
      textAlign: 'left',
    },
    {
      dataIndex: 'claim_date',
      name: 'Claim Date',
      width: '140px',
      textAlign: 'center',
      render: (text) => <span>{dayjs(text).format('DD MMM YY')}</span>,
    },
    {
      dataIndex: 'claim_amount',
      name: 'Claim Amount',
      width: '150px',
      textAlign: 'center',
      render: (text) => (
        <span>
          {Number(text).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </span>
      ),
    },
    {
      dataIndex: 'claim_status',
      name: 'status',
      width: '120px',
      textAlign: 'center',
      render: (text) => (
        <>
          <span
            className={`line-clamp-1 rounded-md px-2 py-1.5 text-sm text-white
            ${text === 'pending' && 'bg-pending'}
            ${text === 'verified' && 'bg-verified'}
            ${text === 'processing' && 'bg-processing'}
            ${text === 'approved' && 'bg-approved'}
            ${text === 'rejected' && 'bg-rejected'}
            ${text === 'paid' && 'bg-paid'}
            ${text === 'closed' && 'bg-closed'}
            `}
          >
            {text}
          </span>
        </>
      ),
    },
    {
      dataIndex: 'action',
      name: 'action',
      width: '64px',
      textAlign: 'center',
      render: (_, record) => (
        <>
          <Link
            as="button"
            href={route('claim.process', record.id)}
            title="Process"
            className="flex items-center justify-center"
          >
            <MdEdit className="text-2xl text-success" />
          </Link>
          <span className="px-2 text-2xl">|</span>
          <Link
            as="button"
            type="button"
            disabled={record.claim_status !== 'approved'}
            href={route('claim.letter_of_guarantee', record.id)}
            title="Download Letter of Guarantee"
            className="group flex items-center justify-center"
          >
            <MdLocalPrintshop className="text-2xl text-meta-5 group-disabled:opacity-50" />
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get('/claim/list?page=1')
      .then((result: AxiosResponse<PaginationData<Claim>>) => {
        setClaims(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout user={auth.user}>
      <Head title="Claim" />
      <Breadcrumb pageName="Claim" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-8 flex items-center justify-between px-6.5 sm:px-7.5"></div>
          <div className="mb-4.5">
            <Table
              columns={claimColumns}
              data={claims?.data || []}
              loading={loading}
            />
            <Pagination {...claims} onChangePagination={onChangePagination} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ClaimPage;
