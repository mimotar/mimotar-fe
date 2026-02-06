import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";


export default function CustomPagination() {
  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
      <Button> <FaAngleDoubleLeft /> </Button>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        {/* <PaginationNext href="#" /> */}
        <Button> <FaAngleDoubleRight /> </Button>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}
