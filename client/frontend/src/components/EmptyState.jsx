import { IoBookOutline } from 'react-icons/io5'

export const EmptyState = ({ title, message, actionLabel, onAction }) => {
  return (
    <div className='col-span-full w-full flex flex-col items-center justify-center text-center py-24 px-4 bg-surface rounded-2xl'>
      <IoBookOutline size={32} className='text-secundario mb-3' />
      <p className='text-principal font-medium mb-1'>{title}</p>
      {message && (
        <p className='text-sm text-secundario max-w-xs mb-5'>{message}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className='bg-accent text-on-accent px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-accent-hover transition-colors'
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
