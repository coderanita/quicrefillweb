
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';

import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showSweetAlert } from '../Includes/SweetAlert2';
import { FaMapMarkerAlt, FaCheck, FaTimes,} from 'react-icons/fa'; 
import { GEOGRAPHY_DATA,MOCK_LOCATIONS,initialFormData } from '../../MockData/OperatingLocationsData';





export const AddOperatingLocation = ({ userId, sidebarCollapsed, toggleSidebar }) => {

 const navigate = useNavigate();
  const { id } = useParams(); 
  const isEdit = !!id; 

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  

  // 1. Fetch data for Edit mode (runs once on load)
  useEffect(() => {
    if (isEdit) {
      // Simulate fetching data by finding the mock location by ID
      const locationToEdit = MOCK_LOCATIONS.find(loc => loc.id === id);
      
      if (locationToEdit) {
        setFormData(locationToEdit);
      } else {
        showSweetAlert(`Error: Location ID "${id}" not found. Displaying Add form.`,'success');
        // If ID is not found, revert to Add mode state
        setFormData(initialFormData);
      }
    }
  }, [isEdit, id]);

  // 2. Cascading Dropdown Logic (Memoized options)
  const availableStates = useMemo(() => {
    const selectedCountry = GEOGRAPHY_DATA.find(c => c.country === formData.country);
    return selectedCountry ? selectedCountry.states : [];
  }, [formData.country]);

  const availableLGAs = useMemo(() => {
    const selectedState = availableStates.find(s => s.state === formData.state);
    return selectedState ? selectedState.lgas : [];
  }, [formData.state, availableStates]);

  // 3. Handlers
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => {
      // Handle standard text/select/radio inputs
      if (type !== 'checkbox') {
        return { ...prev, [name]: value };
      }

      // Handle restrictions checkbox array
      if (type === 'checkbox' && name === 'restrictions') {
        const restrictionValue = value;
        if (checked) {
          // Add restriction
          return { ...prev, restrictions: [...prev.restrictions, restrictionValue] };
        } else {
          // Remove restriction
          return { ...prev, restrictions: prev.restrictions.filter(r => r !== restrictionValue) };
        }
      }
      return prev;
    });
    // Clear validation error when input changes
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  // Handler for Country/State/LGA to reset dependent fields
  const handleGeoChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      let newState = { ...prev, [name]: value };

      // Cascading Reset Logic: If country changes, reset state and lga. If state changes, reset lga.
      if (name === 'country') {
        newState = { ...newState, state: '', lga: '' };
      }
      if (name === 'state') {
        newState = { ...newState, lga: '' };
      }
      return newState;
    });
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);


  const validate = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.lga) newErrors.lga = 'LGA is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (validate()) {
      // --- SUBMISSION LOGIC HERE ---
      const action = isEdit ? 'updated' : 'created';
      console.log(`Submitting form (${action}):`, formData);
      showSweetAlert(`Success! Location ID ${id || 'New'} has been ${action}.`,'success');
      navigate('/operating-locations');
      // Reset form if adding new
      if (!isEdit) {
        setFormData(initialFormData);
      }
    } else {
      showSweetAlert('Please correct the validation errors before submitting.','error');
      
    }
  };

  const handleCancel = () => {
    
    showSweetAlert('Operation cancelled.','info');
    navigate('/operating-locations');
  };

  // --- UI Variables ---
  const headerText = isEdit ? 'Edit Location Details' : 'Add New Location';
  
  const submitButtonText = isEdit ? 'Save Changes' : 'Create Location';
  const submitButtonClasses = isEdit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-yellow-500 hover:bg-yellow-600';




  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        userId={userId}
      />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-hidden">
          <div className="">

            <PageHeaderWithFilters
              title={id?"Edit Location" :"Add new location"}
              breadcrumbs={[]}
              showExportButton={false}
              filterCategories={[]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}

              showDateSelector={false}
              showBackButton={true}
              onBackClick={()=>{navigate('/operating-locations')}}

            />


          </div>
         <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl p-6 border border-gray-200">
        
        {/* Back Button and Header */}
        <div className="flex items-center space-x-3 mb-6 border-b pb-4">
     
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaMapMarkerAlt className="w-6 h-6 mr-2 text-yellow-500" />
            {headerText}
          </h2>
        </div>

     
        
      

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Location Details */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-700 border-b border-gray-100 pb-2 mb-4">Geographical Details</h4>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country<span className="text-red-500">*</span></label>
              <select
                name="country"
                value={formData.country}
                onChange={handleGeoChange}
                className={`w-full border rounded-lg px-3 py-2.5 transition duration-150 shadow-sm ${errors.country ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400'}`}
              >
                <option value="" disabled>Select country</option>
                {GEOGRAPHY_DATA.map(geo => (
                  <option key={geo.country} value={geo.country}>{geo.country}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1 flex items-center"><FaTimes className="w-3 h-3 mr-1" />{errors.country}</p>}
            </div>

            {/* State (Cascading) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State<span className="text-red-500">*</span></label>
              <select
                name="state"
                value={formData.state}
                onChange={handleGeoChange}
                disabled={!formData.country}
                className={`w-full border rounded-lg px-3 py-2.5 transition duration-150 shadow-sm ${errors.state ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700'}`}
              >
                <option value="" disabled>{formData.country ? 'Select state' : 'Select country first'}</option>
                {availableStates.map(stateData => (
                  <option key={stateData.state} value={stateData.state}>{stateData.state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1 flex items-center"><FaTimes className="w-3 h-3 mr-1" />{errors.state}</p>}
            </div>

            {/* LGA (Cascading) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LGA<span className="text-red-500">*</span></label>
              <select
                name="lga"
                value={formData.lga}
                onChange={handleGeoChange}
                disabled={!formData.state}
                className={`w-full border rounded-lg px-3 py-2.5 transition duration-150 shadow-sm ${errors.lga ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700'}`}
              >
                <option value="" disabled>{formData.state ? 'Select LGA' : 'Select state first'}</option>
                {availableLGAs.map(lga => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
              {errors.lga && <p className="text-red-500 text-xs mt-1 flex items-center"><FaTimes className="w-3 h-3 mr-1" />{errors.lga}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City (Optional)</label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150"
              />
            </div>
          </div>

          {/* Service Status */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Service Status</h4>
            <div className="space-y-3">
              {['Enabled', 'Disabled', 'Restricted'].map(statusOption => (
                <label key={statusOption} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-yellow-50 transition duration-150">
                  <input
                    type="radio"
                    name="status"
                    value={statusOption}
                    checked={formData.status === statusOption}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{statusOption}</span>
                  {/* Visual Indicator */}
                  {formData.status === statusOption && <FaCheck className="w-4 h-4 text-yellow-500" />}
                </label>
              ))}
            </div>
          </div>

          {/* Restriction Options (Conditional based on status) */}
          {formData.status === 'Restricted' && (
            <div className="pt-4 border-t border-gray-200 transition-all duration-300 ease-in-out">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Restriction Options</h4>
              <div className="space-y-3">
                {[
                  { value: 'Limit service to specific days or hours', label: 'Limit service to specific days or hours' },
                  { value: 'Limit service to verified users', label: 'Limit service to verified users' },
                  { value: 'Limit number of transaction per user', label: 'Limit number of transaction per user' }
                ].map(restriction => (
                  <label key={restriction.value} className="flex items-center space-x-3 cursor-pointer p-1 rounded-md hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="restrictions"
                      value={restriction.value}
                      checked={formData.restrictions.includes(restriction.value)}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="text-sm font-medium text-gray-700">{restriction.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-start space-x-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className={`${submitButtonClasses} text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center`}
            >
              {isEdit ? <FaCheck className="w-5 h-5 mr-2" /> : <FaMapMarkerAlt className="w-5 h-5 mr-2" />}
              {submitButtonText}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center"
            >
              <FaTimes className="w-5 h-5 mr-2" />
              Cancel
            </button>
          </div>
        </form>
        
      
      </div>     
            
        </main>
      </div>
    </div>
  );
};

