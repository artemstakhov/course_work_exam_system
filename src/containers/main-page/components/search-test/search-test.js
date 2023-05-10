import './search-test.sass';

function SearchTest() {
    return(
        <div className="search_wrapper">
            <span>Пошук тестів по тегу</span>
            <input type="text" placeholder='Введіть тег у форматі:#000000'/>
        </div>
    );
}

export default SearchTest;