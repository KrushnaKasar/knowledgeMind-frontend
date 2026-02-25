// Signup Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (username, email, password) => {
        setLoading(true);
        setError('');
        try {
            const response = await signup(username, email, password);
            if (response.success) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return <SignupForm onSubmit={handleSignup} loading={loading} error={error} />;
};

export default SignupPage;
