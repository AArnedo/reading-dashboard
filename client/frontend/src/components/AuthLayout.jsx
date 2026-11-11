import { IoBookOutline } from "react-icons/io5";
import { RiBookShelfLine, RiBookmarkLine } from "react-icons/ri";

export const AuthLayout = ({ children, tagline }) => {
  return (
    <div className='relative min-h-dvh flex justify-center items-center bg-background px-4 py-10 font-secundaria'>
        <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl rounded-2xl bg-surface overflow-hidden shadow-sm'>
            <div className='hidden relative md:flex flex-col justify-between p-10 bg-accent text-on-accent'>
                <div className='absolute right-10 top-10 rotate-12 opacity-10'>
                    <IoBookOutline size={65}/>
                </div>
                <span className='text-2xl font-semibold tracking-tight'>BookTracker</span>
                <p className='text-lg font-light leading-snug max-w-xs opacity-90'>{tagline}</p>
                <div className='absolute bottom-12 right-6 opacity-10'>
                    <RiBookShelfLine size={45}/>
                </div>
                <div className='absolute rotate-45 opacity-10 bottom-24 right-24'>
                    <RiBookmarkLine size={40}/>
                </div>
            </div>
            <div className='p-6 sm:p-10'>
                {children}
            </div>
        </div>
    </div>
  )
}
