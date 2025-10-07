import React, { useState } from 'react';
import { FaPlus, FaPen, FaTrash, FaClock, FaTimes } from 'react-icons/fa';
import { showSweetAlert,confirmDelete } from '../Includes/SweetAlert2';

interface Zone {
  id: number;
  name: string;
  estimate: string;
  startHour: string;
  startPeriod: string;
  endHour: string;
  endPeriod: string;
  status: boolean;
}

const DeliveryZoneConfig: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([
    {
      id: 1,
      name: 'Downtown region',
      estimate: '2–4 days',
      startHour: '05',
      startPeriod: 'PM',
      endHour: '05',
      endPeriod: 'PM',
      status: true,
    },
      {
      id: 2,
      name: 'Up region',
      estimate: '2–4 days',
      startHour: '05',
      startPeriod: 'PM',
      endHour: '05',
      endPeriod: 'PM',
      status: true,
    },
  ]);
  const [expandedZone, setExpandedZone] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);

  // Form states
  const [zoneName, setZoneName] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  const [startHour, setStartHour] = useState('06');
  const [startPeriod, setStartPeriod] = useState('AM');
  const [endHour, setEndHour] = useState('06');
  const [endPeriod, setEndPeriod] = useState('PM');
  const [status, setStatus] = useState(true);

  const resetForm = () => {
    setZoneName('');
    setDeliveryEstimate('');
    setStartHour('06');
    setStartPeriod('AM');
    setEndHour('06');
    setEndPeriod('PM');
    setStatus(true);
    setEditingZone(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (zone: Zone) => {
    setZoneName(zone.name);
    setDeliveryEstimate(zone.estimate);
    setStartHour(zone.startHour);
    setStartPeriod(zone.startPeriod);
    setEndHour(zone.endHour);
    setEndPeriod(zone.endPeriod);
    setStatus(zone.status);
    setEditingZone(zone);
    setIsModalOpen(true);
  };

  const handleAddOrEditZone = () => {
    if (!zoneName.trim() || !deliveryEstimate.trim()) {
      showSweetAlert('Zone name and estimate cannot be empty!', 'error');
      return;
    }

    if (editingZone) {
      // Editing existing zone
      setZones((prev) =>
        prev.map((z) =>
          z.id === editingZone.id
            ? {
                ...z,
                name: zoneName,
                estimate: deliveryEstimate,
                startHour,
                startPeriod,
                endHour,
                endPeriod,
                status,
              }
            : z
        )
      );
      showSweetAlert('Zone updated successfully!', 'success');
    } else {
      // Adding new zone
      const newZone: Zone = {
        id: zones.length + 1,
        name: zoneName,
        estimate: deliveryEstimate,
        startHour,
        startPeriod,
        endHour,
        endPeriod,
        status,
      };
      setZones([...zones, newZone]);
      showSweetAlert('Zone added successfully!', 'success');
    }

    setIsModalOpen(false);
    resetForm();
  };
const handleDeleteZone = (id: number) => {
  confirmDelete(setZones, "id", id, "zone");
};

  return (
    <div className="col-span-2 bg-white rounded-xl shadow p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Delivery Zone Configuration</h2>
          <button
            onClick={openAddModal}
            className="px-4 bg-gradient-to-b from-[#FFC533] to-[#FFB600] text-black rounded-md border border-gray-300 shadow flex items-center justify-center py-2"
          >
            <FaPlus className="mr-2" /> Add zone
          </button>
        </div>
      </div>

      {/* Zones list */}
      <div className="space-y-3 mt-1">
        {zones.map((zone) => {
          const isExpanded = expandedZone === zone.id;
          return (
            <div
              key={zone.id}
              className={`border border-gray-300 rounded-md bg-${
                isExpanded ? 'gray-50' : 'white'
              } cursor-pointer`}
              onClick={() => setExpandedZone(zone.id === expandedZone ? 0 : zone.id)}
            >
              <div className="flex justify-between items-start p-4">
                <p className="font-medium">
                  Zone name: <span className="font-semibold">{zone.name}</span>
                </p>
                <div className="space-x-3 flex-shrink-0">
                  <button
                    className="text-gray-500 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(zone);
                    }}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteZone(zone.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              {isExpanded && (
                <div className="px-4 pb-4 text-sm">
                  <p>
                    Delivery time estimate:{' '}
                    <span className="font-semibold">{zone.estimate}</span> (
                    Min days: {zone.startHour} – Max days: {zone.endHour})
                  </p>
                  <p>
                    Order cutoff time:{' '}
                    <span className="font-semibold">
                      {zone.startHour}:{zone.startPeriod} – {zone.endHour}:{zone.endPeriod}
                    </span>
                  </p>
                  <p>
                    Status:{' '}
                    <span className={`font-semibold ${zone.status ? 'text-green-600' : 'text-red-600'}`}>
                      {zone.status ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-20 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl sm:max-w-md sm:w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingZone ? 'Edit Delivery Zone' : 'Add Delivery Zone'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <FaTimes className="text-gray-500 hover:text-red-500" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Zone name</label>
                <input
                  type="text"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  placeholder="Enter zone name"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Delivery time estimate</label>
                <input
                  type="text"
                  value={deliveryEstimate}
                  onChange={(e) => setDeliveryEstimate(e.target.value)}
                  placeholder="e.g., 2-5 days"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Time picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Delivery time</label>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Start</label>
                    <div className="flex gap-2">
                      <select
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        {[...Array(12)].map((_, i) => {
                          const val = String(i + 1).padStart(2, '0');
                          return (
                            <option key={i} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        value={startPeriod}
                        onChange={(e) => setStartPeriod(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">End</label>
                    <div className="flex gap-2">
                      <select
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        {[...Array(12)].map((_, i) => {
                          const val = String(i + 1).padStart(2, '0');
                          return (
                            <option key={i} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        value={endPeriod}
                        onChange={(e) => setEndPeriod(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status toggle */}
              <div className="mb-4 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={status}
                    onChange={() => setStatus(!status)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleAddOrEditZone}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  {editingZone ? 'Update zone' : 'Add zone'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryZoneConfig;
