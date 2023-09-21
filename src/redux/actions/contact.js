import axios from "../../clientConfig"

export const getContacts = (nextPage, setPage, countryId=0, isScroll=false) => {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/getResponse?query=number&page=${nextPage}&countryId=${countryId}`)
            if(setPage){
                setPage(nextPage)
            }
            dispatch({
                type: "CONTACTS",
                payload:{data: res.data.data, isScroll },
            });
        }
        catch (err) {
            console.log(err)
        }
        
    };
}

export const getSearchContacts = ( query ) => {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/getResponse?query=${query}`)
            dispatch({
                type: "SEARCH_CONTACTS",
                payload: res.data.data,
            });
        }
        catch (err) {
            console.log(err)
        }
        
    };
}

