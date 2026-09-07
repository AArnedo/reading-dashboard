import { IoMdClose } from "react-icons/io";

export const ModalLibrary = ({ onCloseModal, children }) => {
  return (
    <div className='fixed w-full h-full inset-0 bg-black/70 flex justify-center items-center' onClick={onCloseModal}>
        <div 
          onClick={(e) => e.stopPropagation()}
          className='relative p-6 bg-sage-light rounded-xl min-w-150 '>
            <IoMdClose size={25} onClick={onCloseModal} className='absolute right-10 cursor-pointer'></IoMdClose>
            {children}
        </div>
    </div>
  )
}
