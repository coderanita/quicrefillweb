import React, { useState, useEffect } from 'react';
import { FaPen, FaDollarSign, FaWallet, FaClock, FaTimes } from 'react-icons/fa';

// --- INITIAL DATA & HELPER FUNCTIONS ---

const initialGroupData = {
    customers: { name: 'Customers', dailyLimit: 50000, isDailyLimitEnabled: true, autoLimit: 30000, isAutoLimitEnabled: false },
    vendors: { name: 'Vendors', dailyLimit: 50000, isDailyLimitEnabled: true, autoLimit: 30000, isAutoLimitEnabled: true },
    deliveryReps: { name: 'Delivery reps', dailyLimit: 50000, isDailyLimitEnabled: false, autoLimit: 30000, isAutoLimitEnabled: true },
};

const initialEarningsData = {
    totalEarnings: 50000,
    lastWithdrawal: 5000,
    availableBalance: 20000,
};

const formatNaira = (amount) => `₦${new Intl.NumberFormat('en-US').format(amount)}`;


// --- 1. REUSABLE SUB-COMPONENTS ---

const ToggleSwitch = ({ checked, onChange }) => (
    <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer"/>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
    </label>
);

const GroupDetail = ({ group, borderLeft = true }) => (
    <div className={`px-4 ${borderLeft ? 'md:border-l border-dotted border-gray-300' : ''}`}>
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">{group.name}</h3>
            <span className={`text-sm font-semibold ${group.isDailyLimitEnabled ? 'text-green-500' : 'text-red-500'}`}>
                {group.isDailyLimitEnabled ? 'Active' : 'Disabled'}
            </span>
        </div>
        <p className="text-gray-700 font-medium text-sm mb-1">Daily limit</p>
        <p className="text-gray-400 mb-2">{formatNaira(group.dailyLimit)}</p>
        <div className="flex justify-between items-center mb-1">
            <p className="text-gray-700 font-medium text-sm">Automatic withdrawal limit</p>
            <span className={`text-sm font-semibold ${group.isAutoLimitEnabled ? 'text-green-500' : 'text-red-500'}`}>
                {group.isAutoLimitEnabled ? 'Auto' : 'Manual'}
            </span>
        </div>
        <p className="text-gray-400">{formatNaira(group.autoLimit)}</p>
    </div>
);

const GroupEditSettings = ({ group, onChange, borderLeft = true }) => (
    <div className={`px-4 ${borderLeft ? 'md:border-l border-dotted border-gray-300' : ''}`}>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">{group.name}</h3>
            <ToggleSwitch checked={group.isDailyLimitEnabled} onChange={() => onChange(group.name, 'isDailyLimitEnabled', !group.isDailyLimitEnabled)}/>
        </div>
        
        <label className="text-gray-700 font-medium text-sm mb-1 block">Daily limit</label>
        <div className="relative mb-4">
            <span className="absolute left-2 top-1.5 text-sm text-gray-500">₦</span>
            <input type="number" value={group.dailyLimit} onChange={(e) => onChange(group.name, 'dailyLimit', Number(e.target.value))} className="pl-6 w-full border rounded-md p-1 text-sm focus:ring-yellow-500 focus:border-yellow-500"/>
        </div>
        
        <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700 font-medium text-sm">Automatic withdrawal limit</label>
            <ToggleSwitch checked={group.isAutoLimitEnabled} onChange={() => onChange(group.name, 'isAutoLimitEnabled', !group.isAutoLimitEnabled)}/>
        </div>
        
        <div className="relative">
            <span className="absolute left-2 top-1.5 text-sm text-gray-500">₦</span>
            <input type="number" value={group.autoLimit} onChange={(e) => onChange(group.name, 'autoLimit', Number(e.target.value))} className="pl-6 w-full border rounded-md p-1 text-sm focus:ring-yellow-500 focus:border-yellow-500"/>
        </div>
    </div>
);


// --- 2. MODAL COMPONENTS ---

const SettingsModal = ({ isOpen, onClose, onSave, groups }) => {
    const [tempGroups, setTempGroups] = useState(groups);
    useEffect(() => { setTempGroups(groups); }, [groups, isOpen]);
    if (!isOpen) return null;

    const handleInputChange = (groupName, field, value) => {
        const key = Object.keys(tempGroups).find(k => tempGroups[k].name === groupName);
        if (key) { setTempGroups(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } })); }
    };

    const handleSave = () => { onSave(tempGroups); onClose(); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-gray-700 transition"><FaTimes /></button>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">User group management</h2>
                    <p className="text-gray-400 text-sm">Withdrawal Limits and Automation</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-dotted divide-gray-300">
                    <GroupEditSettings group={tempGroups.customers} onChange={handleInputChange} borderLeft={false} />
                    <GroupEditSettings group={tempGroups.vendors} onChange={handleInputChange} />
                    <GroupEditSettings group={tempGroups.deliveryReps} onChange={handleInputChange} />
                </div>
                <div className="mt-6 text-center">
                    <button onClick={handleSave} className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold px-6 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-600 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const WithdrawalModal = ({ isOpen, onClose, maxAmount, onWithdraw }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const availableBalance = maxAmount;

    const handleWithdraw = () => {
        const withdrawalAmount = Number(amount);
        
        if (withdrawalAmount <= 0 || isNaN(withdrawalAmount)) {
            setError('Please enter a valid amount greater than zero.');
            return;
        }
        if (withdrawalAmount > availableBalance) {
            setError(`The withdrawal amount (${formatNaira(withdrawalAmount)}) cannot exceed your available balance of ${formatNaira(availableBalance)}.`);
            return;
        }

        setError('');
        onWithdraw(withdrawalAmount);
        setAmount(''); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white max-w-md w-full rounded-lg shadow-xl p-6 relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-gray-700"><FaTimes /></button>
                
                <h3 className="text-xl font-semibold mb-2">Initiate Withdrawal</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Available Balance: 
                    <span className="font-bold text-lg text-green-600 ml-1">{formatNaira(availableBalance)}</span>
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Withdraw</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value); setError(''); }}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="e.g., 15000"
                            min="1"
                        />
                    </div>
                </div>

                {error && (<p className="text-red-500 text-sm mb-4">{error}</p>)}

                {/* 🔥 CORRECTED LINE */}
                <button 
                    onClick={handleWithdraw} 
                    className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold text-lg hover:bg-yellow-500 transition disabled:opacity-50"
                    disabled={!amount || Number(amount) <= 0 || Number(amount) > availableBalance}
                >
                    Withdraw {formatNaira(Number(amount) || 0)}
                </button>
            </div>
        </div>
    );
};

// --- 3. DISPLAY CARDS ---

const UserGroupManagementCard = ({ groupData, onEditClick }) => (
    <div className="md:col-span-7 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-xl font-semibold">User group management</h2>
                <p className="text-gray-400 text-sm">Withdrawal Limits and Automation</p>
            </div>
            <button onClick={onEditClick} className="text-yellow-500 flex items-center space-x-1 hover:text-yellow-600 transition">
                <FaPen className="w-3 h-3" /><span>Edit</span>
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-dotted divide-gray-300">
            <GroupDetail group={groupData.customers} borderLeft={false} />
            <GroupDetail group={groupData.vendors} />
            <GroupDetail group={groupData.deliveryReps} />
        </div>
    </div>
);

const EarningsOverviewCard = ({ earningsData, onWithdrawClick }) => (
    <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quicrefil Earnings Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
            
            <div className="flex items-start gap-2 col-span-1">
                <div className="bg-yellow-400 w-10 h-10 rounded-lg flex items-center justify-center text-white mt-1"><FaDollarSign /></div>
                <div>
                    <p className="text-lg font-semibold leading-tight">{formatNaira(earningsData.totalEarnings)}</p>
                    <p className="text-gray-400 text-sm">Total earnings</p>
                </div>
            </div>
        
            <div className="flex items-start gap-2 col-span-1">
                <div className="bg-teal-300 w-10 h-10 rounded-lg flex items-center justify-center text-white mt-1"><FaWallet /></div>
                <div>
                    <p className="text-lg font-semibold leading-tight">{formatNaira(earningsData.lastWithdrawal)}</p>
                    <p className="text-gray-400 text-sm">Last withdrawal</p>
                </div>
            </div>
        
            <div className="flex items-start gap-2 col-span-2">
                <div className="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center text-yellow-500 mt-1"><FaClock /></div>
                <div>
                    <p className="text-lg font-semibold leading-tight">{formatNaira(earningsData.availableBalance)}</p>
                    <p className="text-gray-400 text-sm">Available balance</p>
                </div>
            </div>
        </div>
        
        <button onClick={onWithdrawClick} className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold text-lg hover:bg-yellow-500 transition disabled:opacity-50" disabled={earningsData.availableBalance <= 0}>
            Withdraw
        </button>
    </div>
);


// --- 4. MAIN WRAPPER COMPONENT ---

export const UserWithdrawalSettings = () => {
    const [groups, setGroups] = useState(initialGroupData);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [earnings, setEarnings] = useState(initialEarningsData);
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

    const handleSaveSettings = (newGroups) => { setGroups(newGroups); };

    const handleWithdrawalSubmit = (amount) => {
        console.log(`Processing withdrawal request for: ₦${amount}`);
        setEarnings(prev => ({
            ...prev,
            availableBalance: prev.availableBalance - amount,
            lastWithdrawal: amount
        }));
        setIsWithdrawalModalOpen(false);
    };

    return (
        <div className="max-w-full mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
                
                <UserGroupManagementCard groupData={groups} onEditClick={() => setIsSettingsModalOpen(true)} />

                <EarningsOverviewCard earningsData={earnings} onWithdrawClick={() => setIsWithdrawalModalOpen(true)} />
            </div>

            <SettingsModal 
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                onSave={handleSaveSettings}
                groups={groups}
            />

            <WithdrawalModal
                isOpen={isWithdrawalModalOpen}
                onClose={() => setIsWithdrawalModalOpen(false)}
                maxAmount={earnings.availableBalance}
                onWithdraw={handleWithdrawalSubmit}
            />
        </div>
    );
};

export default UserWithdrawalSettings;