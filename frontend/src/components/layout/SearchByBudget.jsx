import React,{useState} from "react";

const SearchByBudget = ({history}) => {
    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`tours/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
  return (
    <>
    <form onSubmit={searchHandler} className="shadow-lg">
      <div class="container">
        <div class="row wrapper mt-4 justify-content-center">
          <div class="col-8 search-card">
            <h1 class="mt-3">Search by Budget</h1>

            <div class="form-group mt-4">
              <label for="searchByBudgetField">
                Enter your Budget
              </label>
              <input
                type="text"
                class="form-control"
                id="searchByBudgetField"
                onChange={(e) => setKeyword(e.target.value)}
              />

              <button class="btn btn-block mt-3" id="searchByBudgetBtn">
                Search 
              </button>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default SearchByBudget;
