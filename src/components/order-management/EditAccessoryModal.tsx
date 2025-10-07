import React, { useEffect, useState } from 'react';
import { FaTimes, FaUpload, FaPlus } from 'react-icons/fa';
import { showSweetAlert } from '../Includes/SweetAlert2';

type EditAccessoryForm = {
  name: string;
  description: string;
  price: string | number;
  stock: string | number;
  image: File | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialValues: Partial<EditAccessoryForm>;
  onSave: (data: EditAccessoryForm) => void | Promise<void>;
};

const EditAccessoryModal: React.FC<Props> = ({ isOpen, onClose, initialValues, onSave }) => {
  const [form, setForm] = useState<EditAccessoryForm>({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: String(initialValues.name ?? ''),
        description: String(initialValues.description ?? ''),
        price: initialValues.price ?? '',
        stock: initialValues.stock ?? '',
        image: null,
      });
      setErrors({});
    }
  }, [isOpen, initialValues]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!String(form.name).trim()) newErrors.name = 'Name is required';
    if (!String(form.description).trim()) newErrors.description = 'Description is required';
    if (String(form.price).trim() === '') newErrors.price = 'Price is required';
    if (String(form.stock).trim() === '') newErrors.stock = 'Stock count is required';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSave({
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        image: form.image,
      });
      showSweetAlert('Saved successfully!', 'success');
      onClose();
    } catch (e: any) {
      showSweetAlert(e?.message || 'Failed to save. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    onClose();
    showSweetAlert('Edit cancelled.', 'info');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl focus:outline-none"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit Accessory</h2>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {(['name', 'description', 'price', 'stock'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'stock' || field === 'price' ? 'number' : 'text'}
                value={form[field] as string | number}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image/URL</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => setForm({ ...form, image: e.target.files?.[0] ?? null })}
              />
              <div className="z-0">
                <FaUpload className="text-2xl text-gray-400 mb-2 mx-auto" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md flex justify-center items-center space-x-2"
            >
              <FaPlus />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md flex justify-center items-center space-x-2"
            >
              <FaTimes />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccessoryModal;
