import React, {useRef} from 'react';

function Search(props) {

    const inputRef = useRef();
    console.log(inputRef.current)

    return (
        <div>
            <h1>Search</h1>
            <form>
                <input
                    ref={inputRef}
                    required
                    type="search"
                    placeholder="Search...."
                />
                <button
                    type="submit"
                    onClick={() => {
                        inputRef.current.focus()
                    }}
                >Submit</button>
            </form>
        </div>
    );
}

export default Search;
