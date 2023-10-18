import { LiaGreaterThanSolid, LiaLessThanSolid } from "react-icons/lia";

const Pagination = ({ currentPage, previousPage, nextPage }) => {
  return (
    <div className="flex items-center justify-end text-slate-500 gap-4">
      <LiaLessThanSolid className="cursor-pointer" onClick={previousPage} />
      <span>{currentPage}</span>
      <LiaGreaterThanSolid className="cursor-pointer" onClick={nextPage} />
    </div>
  );
};

export default Pagination;
