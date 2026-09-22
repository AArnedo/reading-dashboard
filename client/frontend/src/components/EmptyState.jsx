import { IoBookOutline } from 'react-icons/io5'

export const EmptyState = ({ title, message, actionLabel, onAction }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center text-center py-24 px-4'>
      <IoBookOutline size={40} className='text-secundario mb-3' />
      <p className='text-principal font-semibold font-principal mb-1'>{title}</p>
      {message && (
        <p className='text-sm text-secundario max-w-xs mb-4'>{message}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className='bg-accent text-sage-light px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-accent-dark'
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}