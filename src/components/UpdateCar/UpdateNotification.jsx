import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function UpdateNotification({ message, description, type, onClose }) {
  const typeStyles = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
  };

  const typeIcons = {
    success: <CheckCircleIcon className={`h-6 w-6 ${typeStyles.success}`} />,
    error: <XCircleIcon className={`h-6 w-6 ${typeStyles.error}`} />,
    info: <InformationCircleIcon className={`h-6 w-6 ${typeStyles.info}`} />,
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md flex items-start space-x-3 border border-gray-200">
      {typeIcons[type] || (
        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{message}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default UpdateNotification;
