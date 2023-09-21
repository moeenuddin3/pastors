import React, { useState } from 'react'
import Modal from './modal'
import { useDispatch } from 'react-redux';
import { getContacts } from '../redux/actions/contact'
import { useNavigate } from "react-router-dom";

const Main = () => {
  const dispatch=useDispatch();
  const [countryId, setCountryId]=useState(0);

  const [modalTitle, setModalTitle] = useState("");
  const [btnColor,setBtnColor]=useState();
  const navigate = useNavigate();

  const handleBtn=(countryId, modalName, btnColor )=>{
    dispatch(getContacts(1, null, countryId, null))
    handleModal(modalName, btnColor)
    setCountryId(countryId)
  }

  const handleModal = (title, color) => {
    setModalTitle(title);
    setBtnColor(color)
    navigate(`/modal/${title.toLowerCase()}`);
  };

  const closeModal = () => {
      setModalTitle("");
      navigate("/"); 
  };

  return (
    <>
        <div style={{height:"500px"}} type="button"  className='d-flex justify-content-around align-items-center'>
            <button style={{backgroundColor:"#46139f"}} data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>handleBtn(0, "A", "#46139f")} className='btn btn-primary'> A Button</button>
            <button style={{backgroundColor:"#ff7f50"}} data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>handleBtn(226, "B", "#ff7f50")} className='btn'> B Button</button>
        </div>
        <Modal handleBtn={handleBtn} modalTitle={ modalTitle } btnColor={btnColor} closeModal={closeModal} countryId={ countryId } setCountryId={ setCountryId }/>
    </> 
  )
}

export default Main;