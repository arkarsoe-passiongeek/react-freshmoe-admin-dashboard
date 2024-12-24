import CButton from "@/components/custom/c-button"

const UnauthorizedPage = () => {
    return (
        <div><div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-[200px] font-bold uppercase'>401</h1>
                <p className='text-4xl text-c-contrast !mt-0'>Oops! Not Authorized.</p>
                <CButton onClick={() => window.location.href = `${import.meta.env.VITE_PUBLIC_MAIN_LOGIN}`} className='bg-c-primary'>Back to Login</CButton>
            </div>
        </div></div>
    )
}

export default UnauthorizedPage