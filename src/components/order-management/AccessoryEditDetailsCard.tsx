import React, { useState } from 'react';
import { FaEdit, FaBan } from 'react-icons/fa';
import EditAccessoryModal from './EditAccessoryModal';
import { showSweetAlert } from '../Includes/SweetAlert2';
import { confirmSuspend } from '../Includes/SweetAlert2'; // if you add the helper above

type Accessory = {
  accessoryId: string;
  name: string;
  description: string;
  stockCount: number;
  price: number;
  status: 'Active' | 'Suspended' | 'Inactive';
  dateCreated: string; // display-ready string
  images: string[];
};

type Props = {
  accessory: Accessory;
  onSave: (id: string, data: { name: string; description: string; price: number | string; stock: number | string; image: File | null }) => Promise<void> | void;
  onSuspend?: (id: string) => Promise<void> | void;
  currencySymbol?: string; // default ₦
};

export const AccessoryEditDetailsCard: React.FC<Props> = ({ accessory, onSave, onSuspend, currencySymbol = '₦' }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditSave = async (data: { name: string; description: string; price: number | string; stock: number | string; image: File | null }) => {
    await onSave(accessory.id, data);
  };

  const handleSuspend = async () => {
    if (onSuspend) {
      // Preferred: use your confirm helper
      if (typeof confirmSuspend === 'function') {
        await confirmSuspend(async () => {
          await onSuspend(accessory.id);
        });
      } else {
        // Fallback: at least show a toast (will suspend immediately)
        await onSuspend(accessory.id);
        showSweetAlert('Accessory suspended', 'warning');
      }
    } else {
      showSweetAlert('No suspend handler provided', 'info');
    }
  };

  const formattedPrice = `${currencySymbol}${Number(accessory.price).toLocaleString()}`;

  return (
    <>
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <p><span className="font-semibold text-gray-600">Accessory ID:</span> <span className="text-gray-800">{accessory.accessoryId}</span></p>
          </div>

          <div>
            <p><span className="font-semibold text-gray-600">Name:</span> <span className="text-gray-800">{accessory.name}</span></p>
          </div>

          <div>
            <p className="font-semibold text-gray-600">Description:</p>
            <p className="text-gray-700 mt-1 text-sm">{accessory.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div>
              <p><span className="font-semibold text-gray-600">Stock count:</span> <span className="text-gray-800">{accessory.stockCount}</span></p>
            </div>
            <div>
              <p><span className="font-semibold text-gray-600">Price:</span> <span className="text-gray-800">{formattedPrice}</span></p>
            </div>
            <div>
              <p><span className="font-semibold text-gray-600">Status:</span> <span className={accessory.status === 'Active' ? 'text-green-600 font-medium' : accessory.status === 'Suspended' ? 'text-orange-600 font-medium' : 'text-gray-600 font-medium'}>{accessory.status}</span></p>
            </div>
            <div>
              <p><span className="font-semibold text-gray-600">Date created:</span> <span className="text-gray-800">{accessory.dateCreated}</span></p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-600 mb-2">Image</p>
            <div className="flex flex-wrap gap-4">
              {accessory.images.map((src, i) => (
                <img key={i} src={src} alt={`Accessory Image ${i + 1}`} className="rounded-md border w-42 h-24 object-cover" />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => setIsEditOpen(true)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md flex items-center justify-center space-x-2"
            >
              <FaEdit />
              <span>Edit</span>
            </button>

            <button
              onClick={handleSuspend}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md flex items-center justify-center space-x-2"
            >
              <FaBan />
              <span>Suspend</span>
            </button>
          </div>
        </div>
      </div>

      <EditAccessoryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialValues={{
          name: accessory.name,
          description: accessory.description,
          price: accessory.price,
          stock:
  typeof accessory.stockCount === "string" && accessory.stockCount.includes(" ")
    ? parseInt(accessory.stockCount.split(" ")[0], 10)
    : 0,

        }}
        onSave={handleEditSave}
      />
    </>
  );
};

