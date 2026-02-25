// Profile Page
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircle, IoSave, IoTrash, IoLockClosed, IoMail, IoPerson, IoShield, IoCalendar } from 'react-icons/io5';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');

    // Password change toggle
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authService.getProfile();
            if (response.success) {
                setProfile(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
            }
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!username.trim()) {
            setError('Username is required');
            return;
        }
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        if (newPassword && newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        if (newPassword && newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }

        setSaving(true);
        try {
            const data = { username: username.trim(), email: email.trim() };
            if (newPassword) {
                data.currentPassword = currentPassword;
                data.newPassword = newPassword;
            }

            const response = await authService.updateProfile(data);
            if (response.success) {
                setSuccess('Profile updated successfully!');
                setProfile(response.data);
                // Update localStorage
                const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
                savedUser.username = response.data.username;
                savedUser.email = response.data.email;
                localStorage.setItem('user', JSON.stringify(savedUser));
                // Clear password fields
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPasswordChange(false);
                // Auto-dismiss success
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            setDeleteError('Password is required');
            return;
        }

        setDeleting(true);
        setDeleteError('');
        try {
            const response = await authService.deleteAccount(deletePassword);
            if (response.success) {
                logout();
                navigate('/');
            }
        } catch (err) {
            setDeleteError(err.response?.data?.message || 'Failed to delete account');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="container">
                    <div className="profile-loading">
                        <div className="loader"></div>
                        <p>Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <IoPersonCircle />
                    </div>
                    <div className="profile-header-info">
                        <h1>{profile?.username || 'User'}</h1>
                        <p className="profile-email">
                            <IoMail /> {profile?.email}
                        </p>
                        {profile?.created_at && (
                            <p className="profile-joined">
                                <IoCalendar /> Member since {new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                    </div>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="profile-sections">
                    {/* Edit Profile Section */}
                    <div className="profile-card glass">
                        <div className="profile-card-header">
                            <IoPerson />
                            <h2>Edit Profile</h2>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="profile-form">
                            <Input
                                label="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                icon={<IoPerson />}
                                placeholder="Enter your username"
                            />

                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<IoMail />}
                                placeholder="Enter your email"
                            />

                            {/* Password Change Toggle */}
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPasswordChange(!showPasswordChange)}
                            >
                                <IoLockClosed />
                                {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
                            </button>

                            {showPasswordChange && (
                                <div className="password-section fade-in">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        icon={<IoLockClosed />}
                                        placeholder="Enter current password"
                                    />
                                    <Input
                                        label="New Password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        icon={<IoShield />}
                                        placeholder="Enter new password (min 6 chars)"
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        icon={<IoShield />}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                loading={saving}
                                icon={<IoSave />}
                                className="save-btn"
                            >
                                Save Changes
                            </Button>
                        </form>
                    </div>

                    {/* Danger Zone */}
                    <div className="profile-card danger-card glass">
                        <div className="profile-card-header danger">
                            <IoTrash />
                            <h2>Danger Zone</h2>
                        </div>
                        <p className="danger-text">
                            Once you delete your account, there is no going back. All your articles and data will be permanently removed.
                        </p>
                        <Button
                            variant="danger"
                            onClick={() => setShowDeleteModal(true)}
                            icon={<IoTrash />}
                        >
                            Delete My Account
                        </Button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <Modal
                    title="Delete Account"
                    onClose={() => {
                        setShowDeleteModal(false);
                        setDeletePassword('');
                        setDeleteError('');
                    }}
                >
                    <div className="delete-modal-content">
                        <p className="delete-warning">
                            ⚠️ This action is <strong>permanent and irreversible</strong>. All your articles, data, and account information will be deleted.
                        </p>
                        <p>Enter your password to confirm:</p>
                        {deleteError && <div className="alert alert-error">{deleteError}</div>}
                        <Input
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            icon={<IoLockClosed />}
                            placeholder="Enter your password"
                        />
                        <div className="delete-modal-actions">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeletePassword('');
                                    setDeleteError('');
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDeleteAccount}
                                loading={deleting}
                                icon={<IoTrash />}
                            >
                                Delete Account Forever
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ProfilePage;
