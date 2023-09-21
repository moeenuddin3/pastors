import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getSearchContacts } from '../redux/actions/contact'
import { Scrollbars } from 'react-custom-scrollbars';

const Modal = (props) => {
    const { modalTitle, btnColor, closeModal, countryId, setCountryId , handleBtn } = props;
    
    const dispatch = useDispatch();
    const { filterContacts:contacts, searchContacts, isChecked } =useSelector((state)=>state?.contacts)

    const modalRef = useRef(null);
    const [detail, setDetail] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollbarsRef = useRef(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const modalElement = modalRef.current;

        window.$(modalElement).on('hidden.bs.modal', function () {
            closeModal()
        });

        return () => {
            window.$(modalElement).off('hidden.bs.modal');
        };
    }, []);

    const handleGetContact = (countryId) => {
        dispatch(getContacts(1,null, countryId, false))
        setCountryId(countryId);
    }

    const handleCheckboxChange = (event) => {
        dispatch(
            {
                type: "ISCHECKED",
                payload: event.target.checked
            }
        )
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const newTypingTimeout = setTimeout(() => {
            if (value.trim() !== '') {
                dispatch(getSearchContacts(value))
            }
        }, 600);

        setTypingTimeout(newTypingTimeout);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (searchTerm.trim() !== '') {
                dispatch(getSearchContacts(searchTerm))
            }
        }
    };

    const isScrollbarAtBottom = () => {
        const scrollbar = scrollbarsRef.current;
        if (!scrollbar) return false;
    
        const scrollTop = scrollbar.getScrollTop();
        const scrollHeight = scrollbar.getScrollHeight();
        const clientHeight = scrollbar.getClientHeight();
    
        const threshold = 10;
    
        return scrollHeight - scrollTop <= clientHeight + threshold;
    };
    
    const handleScroll = () => {
        const isBottom = isScrollbarAtBottom();
        if (isBottom) {
          const nextPage = page + 1;
          dispatch(getContacts(nextPage, setPage, countryId, true))
        }
        setScrollPosition(scrollbarsRef.current.getScrollTop());
    };

    return (
        <div >
            <div ref={modalRef} className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal {modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            className='mx-4 my-2'
                        />
                        <div className="modal-body">
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <button onClick={()=>handleBtn(0, "A", "#46139f")} style={modalTitle == "A" ? { backgroundColor: btnColor } : {}} type="button" className="btn btn-primary">All Contacts</button>
                                <button onClick={
                                    // () => handleGetContact(226)
                                   () => handleBtn(226, "B", "#ff7f50")
                                
                                } 
                                    
                                    style={modalTitle == "B" ? { backgroundColor: btnColor } : {}} type="button" className="btn btn-primary">US Contacts</button>
                                <button style={{ backgroundColor: "white", border: "2px solid #46139f" }} type="button" className="btn" data-dismiss="modal">Close</button>
                            </div>
                            <div>
                                <Scrollbars
                                    autoHeight
                                    autoHeightMax={300}
                                    ref={scrollbarsRef}
                                    style={{ width: '100%', height: '300px' }}
                                    onScroll={handleScroll} // Use onScroll prop
                                >
                                    {searchContacts?.length > 0 ?
                                        Object.keys(searchContacts)?.map((contact,index)=>
                                            <div
                                            onClick={() => setDetail(contacts[contact].country?.id)}
                                            className="card mb-2"
                                            key={index}
                                            data-toggle="modal"
                                            data-target="#exampleModalLong"
                                            >
                                            <div className="card-body">
                                                <p className="card-text">User ID: {contacts[contact].id}</p>
                                                <p className="card-text">Country: {contacts[contact].country?.id}</p>
                                            </div>
                                            </div>
                                            )
                                        :
                                        Object.keys(contacts)?.map((contact,index)=>
                                            <div
                                            onClick={() => setDetail(contacts[contact].country?.id)}
                                            className="card mb-2"
                                            key={index}
                                            data-toggle="modal"
                                            data-target="#exampleModalLong"
                                            >
                                            <div className="card-body">
                                                <p className="card-text">User ID: {contacts[contact].id}</p>
                                                <p className="card-text">Country: {contacts[contact].country?.id}</p>
                                            </div>
                                            </div>
                                        )
                                    }
                                </Scrollbars>
                            </div>
                        </div>
                        <div className="align-self-start ml-4">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                /> Only even
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal C</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Country Id: {detail}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;