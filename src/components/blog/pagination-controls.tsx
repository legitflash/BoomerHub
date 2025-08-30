
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function PaginationControls({ currentPage, totalPages, baseUrl }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', String(page));
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    // Show first page
    if (currentPage > 2) {
        pageNumbers.push(1);
        if (currentPage > 3) {
            pageNumbers.push('...');
        }
    }

    // Show current page and siblings
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        if (!pageNumbers.includes(i)) {
             pageNumbers.push(i);
        }
    }
    
    // Show last page
    if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
    }
    if (currentPage < totalPages - 1) {
        if (!pageNumbers.includes(totalPages)) {
            pageNumbers.push(totalPages);
        }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" size="icon" disabled={!hasPreviousPage} onClick={() => handlePageChange(currentPage - 1)}>
          <ChevronLeft />
      </Button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={`${page}-${index}`}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-4 py-2">
            {page}
          </span>
        )
      )}

      <Button variant="outline" size="icon" disabled={!hasNextPage} onClick={() => handlePageChange(currentPage + 1)}>
          <ChevronRight />
      </Button>
    </div>
  );
}

    