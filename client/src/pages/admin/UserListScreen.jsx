import { Link } from 'react-router-dom';
import { Trash2, Edit, Check, X } from 'lucide-react';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User deleted');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <h1 className="text-3xl font-accent text-primary mb-6">Users</h1>
            {loadingDelete && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error?.data?.message || error.error}</Message>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NAME</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">EMAIL</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ADMIN</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user._id}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a href={`mailto:${user.email}`} className="text-primary hover:underline">{user.email}</a>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {user.role === 'admin' ? (
                                            <Check className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <X className="w-5 h-5 text-red-600" />
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right space-x-2">
                                        <Link to={`/admin/user/${user._id}/edit`} className="text-blue-600 hover:text-blue-900">
                                            <Edit className="w-5 h-5 inline" />
                                        </Link>
                                        <button onClick={() => deleteHandler(user._id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="w-5 h-5 inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default UserListScreen;
