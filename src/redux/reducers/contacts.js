
const initialState = {
  contacts:[],
  searchContacts:[],
  filterContacts:[],
  contacts_ids:[],
  isChecked:false
  
}

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACTS":
      let filteredContacts = action?.payload?.data?.contacts;
      let scroll= action?.payload?.isScroll;

      if (state.isChecked) {
        filteredContacts = Object.keys(filteredContacts)
          .filter((contactId) => filteredContacts[contactId].id % 2 === 0)
          .reduce((result, contactId) => {
            result[contactId] = filteredContacts[contactId];
            return result;
          }, {});
      }
      console.log("filteredContacts",filteredContacts)
      return {
        ...state,
        contacts: scroll ? { ...state.contacts , ...(action?.payload?.data?.contacts) || {} }: action?.payload?.data?.contacts,
        filterContacts: scroll ? { ...state.filterContacts , ...filteredContacts }: filteredContacts,
        contacts_ids: action?.payload?.contacts_ids
      };
    case "ISCHECKED":
      let checkedcontacts={ ...state.contacts };
      console.log("action.payload",action.payload)
      if (action.payload) {
        checkedcontacts = Object.keys(checkedcontacts)
          .filter((contactId) => checkedcontacts[contactId].id % 2 === 0)
          .reduce((result, contactId) => {
            result[contactId] = checkedcontacts[contactId];
            return result;
          }, {});
      }
      console.log("checkedcontacts----------",checkedcontacts)
      return {
        ...state,
        isChecked:action.payload,
        filterContacts:checkedcontacts
      };

      case "SEARCH_CONTACTS":
        let filteredSearchContacts = action?.payload?.contacts;

        if (state.isChecked) {
          filteredSearchContacts = Object.keys(filteredSearchContacts)
            .filter((contactId) => filteredSearchContacts[contactId].id % 2 === 0)
            .reduce((result, contactId) => {
              result[contactId] = filteredSearchContacts[contactId];
              return result;
            }, {});
        }
        
        return {
          ...state,
          searchContacts:filteredSearchContacts,
        };
    default: return state;
  }
}

export default contactsReducer;