import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import route from 'ziggy-js';
import { AxiosResponse } from 'axios';
import { differenceBy, every, some, unionBy } from 'lodash';
import { MdEdit } from 'react-icons/md';
import { RiIndeterminateCircleFill } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { InertiaProps, Member } from '@/interface/Inertia';
import Breadcrumb from '@/components/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import Table, { ColumnTypes } from '@/components/Table';
import Pagination from '@/components/Pagination';
import { PaginationData } from '@/interface/pagination';
import api from '@/api/axios';
import PrimaryButton from '@/components/PrimaryButton';

function MemberPage({ auth }: InertiaProps) {
  const [members, setMembers] = useState<PaginationData<Member> | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBulkTerminate = () => {
    const data = { members: selectedMembers };
    router.patch(route('member.bulk_terminate'), data, {
      onFinish: () => {
        setLoading(true);
        api
          .get('member/list?page=1')
          .then((result: AxiosResponse<PaginationData<Member>>) => {
            setMembers(result.data);
          })
          .finally(() => setLoading(false));
      },
    });
  };

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<Member>>) => {
          setMembers(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const memberColumns: ColumnTypes<Member> = [
    {
      dataIndex: '',
      name: (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={
              every(members?.data, (member) =>
                some(selectedMembers, { id: member.id }),
              ) && selectedMembers.length > 0
            }
            onChange={(e) => {
              setSelectedMembers((prevValue) => {
                if (e.target.checked) {
                  return unionBy(prevValue, members?.data, 'id');
                }
                return differenceBy(prevValue, members?.data || [], 'id');
              });
            }}
          />
        </div>
      ),
      width: '16px',
      textAlign: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={some(selectedMembers, { id: record.id })}
            onChange={(e) => {
              setSelectedMembers((prevValue) => {
                if (e.target.checked) {
                  return unionBy(prevValue, [record], 'id');
                }
                return differenceBy(prevValue, [record], 'id');
              });
            }}
          />
        </div>
      ),
    },
    {
      dataIndex: 'member_number',
      name: 'Number',
      width: '100px',
      textAlign: 'left',
    },
    {
      dataIndex: 'name',
      name: 'name',
      width: '200px',
      textAlign: 'left',
    },
    {
      dataIndex: 'phone_number',
      name: 'phone number',
      width: '150px',
      textAlign: 'left',
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      dataIndex: 'email',
      name: 'email',
      width: '250px',
      textAlign: 'left',
      render: (text) => <span className="line-clamp-1 text-sm">{text}</span>,
    },
    {
      dataIndex: 'status',
      name: 'status',
      width: '150px',
      textAlign: 'center',
      render: (text) => (
        <>
          {text === 'active' ? (
            <span className="line-clamp-1 rounded-md bg-meta-3 px-2 py-1.5 text-sm text-white">
              {text}
            </span>
          ) : (
            <span className="line-clamp-1 rounded-md bg-meta-1 px-2 py-1.5 text-sm text-white">
              {text}
            </span>
          )}
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
            href={route('member.edit', record.id)}
            title="Edit"
            className="flex items-center justify-center"
          >
            <MdEdit className="text-2xl text-success" />
          </Link>
          <span className="px-2 text-2xl">|</span>
          <Link
            as="button"
            href={route('member.terminate', record.id)}
            title="Terminate"
            className="flex items-center justify-center"
            onFinish={() => {
              setLoading(true);
              api
                .get('member/list?page=1')
                .then((result: AxiosResponse<PaginationData<Member>>) => {
                  setMembers(result.data);
                })
                .finally(() => setLoading(false));
            }}
            method="patch"
          >
            <RiIndeterminateCircleFill className="text-2xl text-danger" />
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get('/member/list?page=1')
      .then((result: AxiosResponse<PaginationData<Member>>) => {
        setMembers(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout user={auth.user}>
      <Head title="Member" />
      <Breadcrumb pageName="Member" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-8 flex items-center justify-between px-6.5 sm:px-7.5">
            <Link className="w-64" href={route('member.create')}>
              <PrimaryButton className="font-semibold">
                Add Member
              </PrimaryButton>
            </Link>
            <div className="relative flex items-center gap-4 text-graydark">
              <span>{selectedMembers.length} selected</span>
              <button
                onClick={() => setActionDropdown(!actionDropdown)}
                className=" flex items-center gap-2 rounded-md border border-dark px-2 py-1.5"
              >
                <span className="pt-0.5 font-semibold">Action</span>
                {actionDropdown ? (
                  <FaChevronUp className="text-md" />
                ) : (
                  <FaChevronDown className="text-md" />
                )}
              </button>
              {actionDropdown && (
                <div className="absolute bottom-0 right-0 z-9 w-48 translate-y-[120%] rounded-sm border border-gray bg-white px-4 py-3 text-left drop-shadow-lg">
                  <button
                    onClick={() => handleBulkTerminate()}
                    disabled={selectedMembers.length === 0}
                    className="hover:font-semibold disabled:text-body disabled:opacity-80"
                  >
                    Terminate
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4.5">
            <Table
              columns={memberColumns}
              data={members?.data || []}
              loading={loading}
            />
            <Pagination {...members} onChangePagination={onChangePagination} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default MemberPage;
