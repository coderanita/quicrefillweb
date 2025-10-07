import React, { useState } from "react";
import { showSweetAlert } from "../Includes/SweetAlert2";

const TransferRequestForm = ({ onAddTransaction }) => {
    const [formData, setFormData] = useState({
        availableBalance: "₦3,400,000",
        amountToTransfer: "",
        bankName: "First Bank",
        bankAccountNumber1: "",
        bankAccountNumber2: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validations
        if (!formData.amountToTransfer) {
            showSweetAlert("Please enter an amount to transfer", "error");
            return;
        }
        const amount = parseFloat(formData.amountToTransfer);
        if (isNaN(amount) || amount <= 0) {
            showSweetAlert("Please enter a valid amount", "error");
            return;
        }
        if (!formData.bankAccountNumber1 || !formData.bankAccountNumber2) {
            showSweetAlert("Please fill both account numbers", "error");
            return;
        }
        if (formData.bankAccountNumber1 !== formData.bankAccountNumber2) {
            showSweetAlert("Bank account numbers do not match", "error");
            return;
        }

        // Build transaction object
        const newTransaction = {
            // Use 'en-GB' format (DD/MM/YYYY) for display
            date: new Date().toLocaleDateString("en-GB", {day: '2-digit', month: '2-digit', year: 'numeric'}), 
            amount: amount, // IMPORTANT: Pass amount as a number
            bank: formData.bankName,
            accountNo: formData.bankAccountNumber1,
            status: "Pending", 
            action: "Cancel Request", // Default action for a new pending request
        };

        // Push to parent
        onAddTransaction(newTransaction);

        // Success alert
        showSweetAlert("Transfer request submitted successfully", "success");

        // Reset form
        setFormData({
            ...formData,
            amountToTransfer: "",
            bankAccountNumber1: "",
            bankAccountNumber2: "",
        });
    };

    // ... (rest of the form render, unchanged)
    return (
        <div className="bg-gray-100 flex justify-start p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md max-w-[65%]"
            >
                <p className="text-sm text-gray-700 mb-6">
                    Allow the admin to request a transfer of company profit from the
                    payment company to a designated bank account.
                </p>

                {/* Available Balance */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Available Balance:
                    </label>
                    <input
                        type="text"
                        value={formData.availableBalance}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>

                {/* Amount to Transfer */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Amount to Transfer:
                    </label>
                    <input
                        type="text"
                        id="amountToTransfer"
                        placeholder="Enter transfer amount"
                        value={formData.amountToTransfer}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>

                {/* Bank Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Bank Name
                    </label>
                    <select
                        id="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    >
                        <option>First Bank</option>
                        <option>GTBank</option>
                        <option>Zenith Bank</option>
                        <option>Access Bank</option>
                    </select>
                </div>

                {/* Bank Account Numbers */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Bank Account Number:
                    </label>
                    <input
                        type="text"
                        id="bankAccountNumber1"
                        placeholder="e.g 1234567890"
                        value={formData.bankAccountNumber1}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Bank Account Number:
                    </label>
                    <input
                        type="text"
                        id="bankAccountNumber2"
                        placeholder="e.g 1234567890"
                        value={formData.bankAccountNumber2}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                >
                    Request Transfer
                </button>
            </form>
        </div>
    );
};

export default TransferRequestForm;