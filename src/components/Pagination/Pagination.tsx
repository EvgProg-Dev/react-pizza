import React, { FC } from "react";

import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";

type PaginationProps = {
    activeCurrentPage: number;
    onChangePage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
    activeCurrentPage,
    onChangePage,
}) => {
    return (
        <ReactPaginate
            className={style.root}
            forcePage={activeCurrentPage - 1}
            breakLabel="..."
            nextLabel="🢂"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="🡸"
            renderOnZeroPageCount={null}
        />
    );
};
