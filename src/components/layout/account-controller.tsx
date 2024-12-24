import { useState } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import CButton from '../custom/c-button'
import LogoutDialog from './dialogs/logout-dialog'
import { logout } from '@/services/apis/auth'
import { useNavigate } from 'react-router'
import { useLinkRoutes } from '@/lib/route'

const AdminController = ({ user }: any) => {
    const [logoutModal, setLogoutModal] = useState(false)
    const navigate = useNavigate()
    const routes = useLinkRoutes()

    const handleLogout = async () => {
        const res = await logout()
        if (res === 'success') navigate(routes.unauthorized())
    }

    return (
        <div className="flex justify-between items-center gap-4">
            <IoPersonCircle className="w-[50px] h-[50px] text-c-primary" />
            <div className='flex flex-col'>
                <span >{user.email}</span>
                <span className='text-c-contrast capitalize'>{user.username}</span>
            </div>
            <CButton onClick={() => setLogoutModal(true)} className="bg-c-secondary !min-w-[100px]">Logout</CButton>
            <LogoutDialog isLogoutModalOpen={logoutModal} setIsLogoutModalOpen={setLogoutModal} handleLogout={handleLogout} />
        </div>
    )
}

export default AdminController