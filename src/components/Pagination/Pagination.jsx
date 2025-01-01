import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";


export const Pagination = ({ activeCurrentPage, onChangePage }) => {
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
