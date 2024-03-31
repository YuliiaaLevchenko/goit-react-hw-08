import { useSelector, useDispatch } from "react-redux";

import css from './SearchBox.module.css'
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const nameFilter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { value } = e.target;
    dispatch(changeFilter(value));
  };

    return (
        <div className={css.container}>
        <p className={css.title}>Find contacts by name</p>
        <input className={css.textInput}
        type="text"
        value={nameFilter}
        onChange={handleFilterChange}
      />
      </div>
    )
}

export default SearchBox


  