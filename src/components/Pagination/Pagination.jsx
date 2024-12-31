import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";

export const Pagination = ({onChangePage}) => {

    return (
        <ReactPaginate
            className={style.root}
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
