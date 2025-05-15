import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile form
  const profileFormik = useFormik({
    initialValues: {
      name: authUser?.name || '',
      email: authUser?.email || '',
      phone: '1234567890', // Mock data
      address: '123 Main St, Example City', // Mock data
      specialization: 'IT & Software', // Mock data
      experience: '5+ years', // Mock data
      bio: 'Professional resume writer with expertise in IT and software industry. Passionate about helping professionals showcase their skills effectively.', // Mock data
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      specialization: Yup.string().required('Specialization is required'),
      experience: Yup.string().required('Experience is required'),
    }),
    onSubmit: async (values) => {
      setIsSaving(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Profile updated successfully');
        setIsEditingProfile(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      } finally {
        setIsSaving(false);
      }
    },
  });
  
  // Password form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setIsSaving(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Password updated successfully');
        setIsEditingPassword(false);
        passwordFormik.resetForm();
      } catch (error) {
        console.error('Error updating password:',
 error);
        toast.error('Failed to update password');
      } finally {
        setIsSaving(false);
      }
    },
  });
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
          My Profile
        </h2>
        <p className="text-neutral-600">
          Manage your account information and writer profile
        </p>
      </motion.div>
      
      {/* Profile Information */}
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Writer Profile</h3>
          {!isEditingProfile && (
            <button 
              type="button" 
              onClick={() => setIsEditingProfile(true)}
              className="btn btn-outline btn-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
        
        {isEditingProfile ? (
          <form onSubmit={profileFormik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileFormik.values.name}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className={`form-input ${
                    profileFormik.touched.name && profileFormik.errors.name ? 'border-error-300' : ''
                  }`}
                />
                {profileFormik.touched.name && profileFormik.errors.name && (
                  <p className="form-error">{profileFormik.errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileFormik.values.email}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className={`form-input ${
                    profileFormik.touched.email && profileFormik.errors.email ? 'border-error-300' : ''
                  }`}
                />
                {profileFormik.touched.email && profileFormik.errors.email && (
                  <p className="form-error">{profileFormik.errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={profileFormik.values.phone}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className={`form-input ${
                    profileFormik.touched.phone && profileFormik.errors.phone ? 'border-error-300' : ''
                  }`}
                />
                {profileFormik.touched.phone && profileFormik.errors.phone && (
                  <p className="form-error">{profileFormik.errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={profileFormik.values.address}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="specialization" className="form-label">Specialization</label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  value={profileFormik.values.specialization}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className={`form-input ${
                    profileFormik.touched.specialization && profileFormik.errors.specialization ? 'border-error-300' : ''
                  }`}
                />
                {profileFormik.touched.specialization && profileFormik.errors.specialization && (
                  <p className="form-error">{profileFormik.errors.specialization}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="experience" className="form-label">Experience</label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  value={profileFormik.values.experience}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className={`form-input ${
                    profileFormik.touched.experience && profileFormik.errors.experience ? 'border-error-300' : ''
                  }`}
                />
                {profileFormik.touched.experience && profileFormik.errors.experience && (
                  <p className="form-error">{profileFormik.errors.experience}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="bio" className="form-label">Professional Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profileFormik.values.bio}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  className="form-input resize-none"
                  placeholder="Write a brief description about your experience and expertise..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="btn btn-outline"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Name</h4>
              <p className="text-neutral-900">{profileFormik.values.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Email Address</h4>
              <p className="text-neutral-900">{profileFormik.values.email}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Phone Number</h4>
              <p className="text-neutral-900">{profileFormik.values.phone}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Address</h4>
              <p className="text-neutral-900">{profileFormik.values.address}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Specialization</h4>
              <p className="text-neutral-900">{profileFormik.values.specialization}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Experience</h4>
              <p className="text-neutral-900">{profileFormik.values.experience}</p>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-neutral-500 mb-1">Professional Bio</h4>
              <p className="text-neutral-900">{profileFormik.values.bio}</p>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Password Section */}
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Password</h3>
          {!isEditingPassword && (
            <button 
              type="button" 
              onClick={() => setIsEditingPassword(true)}
              className="btn btn-outline btn-sm"
            >
              Change Password
            </button>
          )}
        </div>
        
        {isEditingPassword ? (
          <form onSubmit={passwordFormik.handleSubmit}>
            <div className="space-y-6 mb-6">
              <div>
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordFormik.values.currentPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className={`form-input ${
                    passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? 'border-error-300' : ''
                  }`}
                />
                {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
                  <p className="form-error">{passwordFormik.errors.currentPassword}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordFormik.values.newPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className={`form-input ${
                    passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? 'border-error-300' : ''
                  }`}
                />
                {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                  <p className="form-error">{passwordFormik.errors.newPassword}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordFormik.values.confirmPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className={`form-input ${
                    passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'border-error-300' : ''
                  }`}
                />
                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                  <p className="form-error">{passwordFormik.errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditingPassword(false)}
                className="btn btn-outline"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-neutral-600">
            Your password was last updated 30 days ago. We recommend changing your password regularly for security.
          </p>
        )}
      </motion.div>
      
      {/* Account Settings */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Account Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-neutral-900 font-medium">Email Notifications</h4>
              <p className="text-sm text-neutral-500">Receive updates about new assignments</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-secondary-600">
              <label className="absolute left-0 inline-block w-6 h-6 mt-0 transition duration-200 ease-in-out transform bg-white rounded-full shadow-sm translate-x-6" htmlFor="toggle-1"></label>
              <input type="checkbox" id="toggle-1" className="w-full h-full appearance-none focus:outline-none" defaultChecked />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-neutral-900 font-medium">SMS Notifications</h4>
              <p className="text-sm text-neutral-500">Receive text messages for urgent updates</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-neutral-300">
              <label className="absolute left-0 inline-block w-6 h-6 mt-0 transition duration-200 ease-in-out transform bg-white rounded-full shadow-sm" htmlFor="toggle-2"></label>
              <input type="checkbox" id="toggle-2" className="w-full h-full appearance-none focus:outline-none" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-neutral-900 font-medium">Marketing Communications</h4>
              <p className="text-sm text-neutral-500">Receive tips and promotional messages</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-neutral-300">
              <label className="absolute left-0 inline-block w-6 h-6 mt-0 transition duration-200 ease-in-out transform bg-white rounded-full shadow-sm" htmlFor="toggle-3"></label>
              <input type="checkbox" id="toggle-3" className="w-full h-full appearance-none focus:outline-none" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <button type="button" className="btn btn-danger">
            Delete Account
          </button>
          <p className="mt-2 text-xs text-neutral-500">
            Deleting your account will remove all of your data from our servers. This action cannot be undone.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;