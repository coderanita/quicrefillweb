import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate


const ResetPassword = () => {
    const [email, setEmail] = useState('superadmin@quicrefill.com'); //
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Configure SweetAlert2 Toast for immediate feedback on ResetPassword page (optional, but good UX)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simulate a successful password reset
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    const success = Math.random() > 0.1; // Make success more likely for demo
                    if (success) {
                        resolve({ success: true, message: 'Password reset email sent successfully!' });
                    } else {
                        reject({ message: 'Failed to send password reset email. Please try again.' });
                    }
                }, 1500); // Simulate network delay
            });

            if (response.success) {
                // Show a temporary toast on the current page for immediate feedback
                Toast.fire({
                    icon: 'success',
                    title: "Redirecting to login..."
                });

                // Pass state to the login page
                setTimeout(() => {
                    navigate('/login', { state: { successMessage: response.message } });
                }, 2000);
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.message || 'Failed to send password reset email.'
                });
            }
        } catch (error) {
            console.error('Password reset error:', error);
            Toast.fire({
                icon: 'error',
                title: error.message || 'An error occurred during password reset. Please try again.'
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen"> {/* */}
            {/* Left Side - Image (50% width on medium screens) */}
            <div
                className="hidden md:block w-full md:w-[50%] h-screen bg-gray-100 bg-contain bg-center bg-no-repeat" /* */
                style={{ backgroundImage: "url('images/loginpage.png')" }} /* */
            ></div>

            <div className="w-full md:w-[40%] flex flex-col"> {/* */}
                {/* Header with Logo */}
                <header className="p-4 flex justify-between items-center"> {/* */}
                    <div className="flex items-center"> {/* */}
                        <img src="images/logo.png" alt="Quicrefill Logo" className="w-[150px] md:w-[150px]" /> {/* */}
                    </div>
                    <div className="flex items-center text-sm"> {/* */}
                        <span className="text-gray-500 mr-2">Don't have an account?</span> {/* */}
                        <a href="#" className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-700"> {/* */}
                            Request access
                        </a>
                    </div>
                </header>

                {/* Reset Password Form */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-8"> {/* */}
                    <div className="w-full"> {/* */}
                        <h1 className="text-2xl font-bold text-yellow-500 text-center mb-6">Reset Password</h1> {/* */}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4"> {/* */}
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1"> {/* */}
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" /* */
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center" /* */
                            >
                                <i className="fas fa-key mr-2 text-sm"></i> {/* */}
                                Reset Password
                            </button>

                            <div className="mt-4 text-center text-sm"> {/* */}
                                <span className="text-gray-600"> remembered the password?</span> {/* */}
                                <Link to="/login" className="text-yellow-500 hover:underline ml-1">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-4 flex justify-between items-center text-gray-500 text-sm mt-auto"> {/* */}
                    <div>© Quicrefill Company 2025</div> {/* */}
                    <a href="mailto:help@quicrefill.com" className="flex items-center hover:text-gray-700"> {/* */}
                        <i className="far fa-envelope mr-2"></i> {/* */}
                        help@quicrefill.com
                    </a>
                </footer>
            </div>

            {/* Right Side - Empty Space (10% width) */}
            <div className="hidden md:block w-full md:w-[10%] bg-white"></div> {/* */}
        </div>
    );
};

export default ResetPassword;