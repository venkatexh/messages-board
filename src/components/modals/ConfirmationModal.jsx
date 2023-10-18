const ModalButton = ({ handleClick, type }) => {
  return (
    <button
      className={`${
        type === "yes" ? "bg-red-700" : "bg-blue-700"
      } px-4 py-1 text-white rounded-md`}
      onClick={handleClick}
    >
      {type === "yes" ? "Yes" : "No"}
    </button>
  );
};

const ConfirmationModal = ({ message, handleYesClick, handleNoClick }) => {
  return (
    <div className="fixed z-50 w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white opacity-100 px-12 py-6 rounded-md">
        <div className="text-2xl">{message}</div>
        <div className="flex justify-center gap-2 mt-4">
          <ModalButton type="yes" handleClick={handleYesClick} />
          <ModalButton type="no" handleClick={handleNoClick} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
