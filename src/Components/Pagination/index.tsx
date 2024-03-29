import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../Icons/index";
import styles from "../../Assets/Styles/Component/pagination.module.scss";
import { IconButton } from "../Buttons";

/**
  * <summary>
  * Provides the pagination for displaying the data
  * </summary>
  * <param name="totalPages, defaultActivePage">
  * </param> 
  * <returns>
  * returns the table data for pageNumber selected by the user
  * </returns> 
  */
interface PaginationProps {
  totalPages: number;
  defaultActivePage: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({
  totalPages,
  defaultActivePage,
  onChangePage,
}: PaginationProps) => {
  const [activePage, setActivePage] = useState(defaultActivePage);
  const maxFirstPages = totalPages<=6 ? 6: 3;

  const handlePaginationChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    onChangePage(pageNumber);
  };

  const firstPages = Array.from(
    { length: totalPages > maxFirstPages ? maxFirstPages : totalPages },
    (_, i) => i + 1
  );

  const lastTwoPages =((totalPages - 2) == 3 ) ? [totalPages - 1, totalPages] : [totalPages - 2,totalPages - 1, totalPages];

  const showThreeDots =
    (activePage > maxFirstPages && activePage < totalPages - 2);

  const canShowLastPages = totalPages > maxFirstPages;

  return (
    <div className={styles?.paginateContainer}>
      <div className="pagMob">
        <IconButton
          icon={<ArrowLeft />}
          buttonTitle="Previous"
          onClick={() => handlePaginationChange(activePage - 1)}
          disabled={activePage === 1 || totalPages === 1 || totalPages === 0}
        />
      </div>

      <div>
        {firstPages.map((pageNumber) => (
          <span
            key={pageNumber}
            className={`${styles?.pageNumber} ${
              (activePage === pageNumber || totalPages === 1) ? styles?.activePage : ""
            }`}
            onClick={() => handlePaginationChange(pageNumber) }
            onKeyDown={() => void 0}
          >
            {pageNumber}
          </span>
        ))}
        {(canShowLastPages || showThreeDots) && <span  hidden = {(activePage - maxFirstPages ==1 || totalPages<=6 )}>...</span>}
        {showThreeDots && (
          <span
            className={`${styles?.pageNumber} ${styles?.activePage}`}
            onClick={() => handlePaginationChange(activePage)}
            onKeyDown={() => void 0}
          >
            {activePage}
          </span>
        )}
        <span hidden = {(totalPages<=6 || activePage - (totalPages - 2) == -1)}>...</span>
        {canShowLastPages &&
          lastTwoPages.map((pageNumber) => (
            <span
            hidden = {(totalPages<=3)}
              className={`${styles?.pageNumber} ${
                activePage === pageNumber ? styles?.activePage : ""
              }`}
              key={pageNumber}
              onClick={() => handlePaginationChange(pageNumber)}
              onKeyDown={() => void 0}
            >
              {pageNumber}
            </span>
          ))}
      </div>
      <div className="pagMob">
        <IconButton
          icon={<ArrowRight />}
          buttonTitle="Next"
          iconPosition="right"
          onClick={() => handlePaginationChange(activePage + 1)}
          disabled={activePage === totalPages || totalPages === 0 ||  totalPages === 1}
        />
      </div>
    </div>
  );
};

export default Pagination;