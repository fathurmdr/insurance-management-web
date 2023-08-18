import { Link } from '@inertiajs/react';

interface BreadcrumbProps {
  pageName: string;
  urlBefore?: Array<{
    url: string;
    name: string;
  }>;
}
const Breadcrumb = ({ pageName, urlBefore = [] }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {urlBefore.map((item, index) => (
            <li key={index}>
              <Link className="capitalize" href={item.url}>
                {item.name} /
              </Link>
            </li>
          ))}
          <li className="capitalize text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
