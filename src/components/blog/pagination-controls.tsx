
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function PaginationControls({ currentPage, totalPages, baseUrl }: PaginationControlsProps) {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
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
      <Button variant="outline" size="icon" asChild disabled={!hasPreviousPage}>
        <Link href={`${baseUrl}?page=${currentPage - 1}`} scroll={false}>
          <ChevronLeft />
        </Link>
      </Button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={`${page}-${index}`}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            asChild
          >
            <Link href={`${baseUrl}?page=${page}`} scroll={false}>{page}</Link>
          </Button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-4 py-2">
            {page}
          </span>
        )
      )}

      <Button variant="outline" size="icon" asChild disabled={!hasNextPage}>
        <Link href={`${baseUrl}?page=${currentPage + 1}`} scroll={false}>
          <ChevronRight />
        </Link>
      </Button>
    </div>
  );
}
