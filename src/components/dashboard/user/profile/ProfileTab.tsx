import { Edit, Save, User, X, } from "lucide-react";
import { useEffect, useState } from "react";
import Form from "form-data";
import { BASE_URL_LOCAL } from "../../../../constants/constants";
import { useAuth } from "../../../../context/AuthContext";
import { getUserProfileAPI } from "../../api/admin/profile/getUserProfileAPI";
import { updateUserProfileAPI } from "../../api/admin/profile/updateUserProfile";

const ProfileTab = () => {

    const { user } = useAuth() as any;
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<any>(user?.profile || {});
    const [status, setStatus] = useState('');
    const [image, setImage] = useState({
        fileName: "" as string,
        file: {} as any,
        document: {} as any,
        documentName: "" as string
    });

    const handleSaveProfile = async () => {
        setStatus('Sending...')
        const formData = new Form();
        if (image.file && image.file.name) {
            formData.append("image", image.file, image.file.name);
        }
        if (image.document && image.document.name) {
            formData.append("document", image.document, image.document.name);
        }
        formData.append('name', profile.name);
        // formData.append('email', profile.email);
        formData.append('phone', profile.phone);
        formData.append('address', profile.address);
        formData.append('state', profile.state);
        formData.append('country', profile.country);
        formData.append('localGovt', profile.localGovt);
        formData.append('dateOfBirth', profile.dateOfBirth);
        // formData.append("_csrf", _csrf);
        let update = await updateUserProfileAPI(user?.userId, formData);
        if (update !== null || undefined) {
            setStatus("Updated");
            setIsEditing(false);
        }

    };

    useEffect(() => {
        (async () => {
            const data = await getUserProfileAPI(user?.userId);
            setProfile(data);
        })();
    }, [user?.userId])

    return (<div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSaveProfile}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setProfile(profile || {});
                            }}
                            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </button>
                        {status ? <div className='text-green-500'>{status}</div> : <div className='text-red-500'>{status}</div>}
                    </div>
                )}
            </div>

            <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mr-6">

                    {profile?.image ? (<img
                        crossOrigin=""
                        src={BASE_URL_LOCAL + "/uploads/" + profile?.image}
                        alt={profile?.name}
                        width={10}
                        height={10}
                        style={{ margin: 2, height: "auto", width: "auto", display: "inline-block" }}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />) : <User className="h-20 w-20 text-white" />}
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
                            {user.role === 'user' ? <span>Upload a photo</span> : <span>Upload a logo</span>}
                        </label>

                        {isEditing ? (

                            <input
                                type="file"
                                onChange={(e: any) => setImage(prev => ({ ...prev, fileName: e.target.files[0].name, file: e.target.files[0] }))}
                                formEncType='multipart/form-data'
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.image || 'Not provided'}</p>
                        )}
                    </div>

                    {user.role === 'provider' && (<div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <span>Upload a C.A.C. Document</span>
                        </label>

                        {isEditing ? (

                            <input
                                type="file"
                                onChange={(e: any) => setImage(prev => ({ ...prev, documentName: e.target.files[0].name, document: e.target.files[0] }))}
                                formEncType='multipart/form-data'
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.document || 'Not provided'}</p>
                        )}
                    </div>)}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={profile?.name || ''}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.name || 'Not provided'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        {isEditing ? (
                            <input
                                disabled
                                type="text"
                                defaultValue={user.email || ''}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.User?.username || 'Not provided'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                defaultValue={profile?.phone || ''}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.phone || 'Not provided'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <p className="py-2 text-gray-900 capitalize">{user?.role?.replace('-', ' ')}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={profile?.address || ''}
                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.address || 'Not provided'}</p>
                        )}
                    </div>

                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local Govt
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={profile?.localGovt || ''}
                                onChange={(e) => setProfile({ ...profile, localGovt: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.localGovt || 'Not provided'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={profile?.state || ''}
                                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.state || 'Not provided'}</p>
                        )}
                    </div>

                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={profile?.country || ''}
                                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{profile?.country || 'Not provided'}</p>
                        )}
                    </div>

                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Of Birth
                        </label>
                        {isEditing ? (
                            <input
                                type="date"
                                defaultValue={new Date(profile?.dateOfBirth || '').toLocaleDateString().split('/').reverse().join('-')}
                                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="py-2 text-gray-900">{new Date(profile?.dateOfBirth || 'Not provided').toLocaleDateString()}</p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
}

export default ProfileTab