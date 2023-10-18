const CardContainer = ({ children, classes }) => {
  return (
    <div className={`${classes} rounded-lg shadow-lg bg-white`}>{children}</div>
  );
};

export default CardContainer;
