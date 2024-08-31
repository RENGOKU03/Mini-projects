import React, { useState } from 'react'
import Modal from './Modal'

const ModalToggle = () => {
  const [showModal, setshowModal] = useState(false)
  function handelToggleModal(){
    setshowModal(!showModal)
  }
  function onClose(){
    setshowModal(false)
  }
  console.log(showModal)
  return (
    <div className='h-screen bg-blue-400 snap-start flex flex-col gap-40 items-center'> 
    <h1 className='text-5xl font-semibold text-center p-10'>Modal Screen</h1>
      <button onClick={handelToggleModal} className='bg-purple-600 p-4 text-3xl w-96 font-semibold rounded-3xl'>Open Modal</button>
      {showModal && <Modal onClose={onClose}/>}
    </div>
  )
}

export default ModalToggle