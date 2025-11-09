import { useEffect, useState } from "react";
import { BASE_URL_LOCAL } from "../../../../constants/constants";
import { useAuth } from "../../../../context/AuthContext";
import { getUserProfileAPI } from "../../api/admin/profile/getUserProfileAPI";


const UserDetails = ({ setOpen }: { setOpen: any }) => {

    const { user, admin }: { user: any , admin:any} = useAuth();
    const [profile, setProfile] = useState<any>(admin?.profile || {});


    useEffect(() => {
        (async () => {
            const data = await getUserProfileAPI(admin?.userId );
            setProfile(data);
        })();
    }, [admin?.userId ]);

    if (profile === null || undefined) {
        return <div className="text-center">Error!</div>
    }

    if (Object.keys(profile).length === 0) {
        return <div className="text-center">No user details!</div>
    }

    return (<div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile  </h2>
                <button onClick={()=>setOpen(false)}>X</button>
            </div>

            <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mr-6">
                    <img crossOrigin="" src={BASE_URL_LOCAL + "/uploads/" + profile.image} alt={profile.image} width={10} height={10} style={{ margin: 2, height: "auto", width: "auto", display: "inline-block" }} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{profile?.name}</h3>
                    <p className="text-gray-600 capitalize">{profile?.role?.replace('-', ' ')}</p>
                    <p className="text-sm text-gray-500">User since {new Date(profile?.createdAt || '').toLocaleDateString()}</p>
                </div>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload a photo
                        </label>


                        <p className="py-2 text-gray-900">{profile?.image || 'Not provided'}</p>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>

                        <p className="py-2 text-gray-900">{profile?.name || 'Not provided'}</p>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>

                        <p className="py-2 text-gray-900">{profile?.User?.username || 'Not provided'}</p>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>

                        <p className="py-2 text-gray-900">{profile?.phone || 'Not provided'}</p>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <p className="py-2 text-gray-900 capitalize">{admin?.role?.replace('-', ' ')}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>

                        <p className="py-2 text-gray-900">{profile?.address || 'Not provided'}</p>

                    </div>

                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local Govt
                        </label>

                        <p className="py-2 text-gray-900">{profile?.localGovt || 'Not provided'}</p>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>

                        <p className="py-2 text-gray-900">{profile?.state || 'Not provided'}</p>

                    </div>

                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>

                        <p className="py-2 text-gray-900">{profile?.country || 'Not provided'}</p>

                    </div>

                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Of Birth
                        </label>

                        <p className="py-2 text-gray-900">{new Date(profile?.dateOfBirth || 'Not provided').toLocaleDateString()}</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
}

export default UserDetails