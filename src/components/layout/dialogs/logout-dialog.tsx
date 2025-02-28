import { BaseDialog } from './base-dialog'
import { IoIosLogOut } from "react-icons/io";
import CButton from '@/components/custom/c-button'

const LogoutDialog = ({ isLogoutModalOpen, setIsLogoutModalOpen, handleLogout }: any) => {
    return (
        <div>
            <BaseDialog title={`Logout`} description="Do you want to log out from Dashboard?" isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
                <div className="h-[311px]">
                    <div className="text-center flex flex-col space-y-[15px] items-center h-full justify-center">
                        <div className="w-[90px] h-[90px] bg-c-secondary bg-opacity-20 rounded-full shrink-0 flex items-center justify-center">
                            <IoIosLogOut className="text-c-secondary w-[40px] h-[40px]" />
                        </div>
                        <div className="space-y-[10px]">
                            <h1 className="text-lg text-c-secondary font-semibold capitalize">Logout</h1>
                            <p className="max-w-[309px] text-base text-c-contrast">Do you want to log out from Dashboard?</p>
                        </div>
                        <div className="flex gap-4">
                            <CButton styleType='cancel' type="button" onClick={() => setIsLogoutModalOpen(false)}>Cancel</CButton>
                            <CButton styleType='delete' type="button" onClick={() => handleLogout()}>Logout</CButton>
                        </div>
                    </div>
                </div>
            </BaseDialog>
        </div>
    )
}

export default LogoutDialog