/* eslint-disable react/prop-types */

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Action</h2>
                <p className="text-gray-600 text-sm mb-4">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
