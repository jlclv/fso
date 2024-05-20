const Filter = ({ handleFilter }) => {
  return (
    <div className="filter">
      filter shown with <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
