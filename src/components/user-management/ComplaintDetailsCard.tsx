import { showSweetAlert } from "../Includes/SweetAlert2";
import { useParams,useNavigate } from 'react-router-dom';
const ComplaintDetailsCard = ({ order }) => {
    const navigate = useNavigate();
  if (!order) {
    return null;
  }

  return (
    <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Complaint details</h2>

      <div className="space-y-2">
        <div>
          <p>
            <span className="font-semibold text-gray-600">Order ID:</span>
            <span className="text-gray-800"> #{order.orderId}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Name:</span>
            <span className="text-gray-800"> {order.customerName}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Phone number:</span>
            <span className="text-gray-800"> {order.phoneNumber}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Issue:</span>
            <span className="text-gray-800"> {order.issueType}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Description:</span>
            <span className="text-gray-800"> "{order.description}"</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Internal note:</span>
            <span className="text-gray-800"> {order.internalNote}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Company name:</span>
            <span className="text-gray-800"> {order.companyName}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-gray-600 mb-2">Attached images:</p>
        <div className="flex gap-2">
          {order.attachedImages && order.attachedImages.length > 0 ? (
            order.attachedImages.map((image, index) => (
              <div key={index} className="w-36 h-16 rounded-md overflow-hidden border">
                <img
                  src={image}
                  alt={`Attached Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No images attached.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex">
        <button onClick={()=>{showSweetAlert("Assigned to a team","info"); navigate('/user-management-complaint'); }} className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2">
          Assign to team
        </button>
        <button onClick={()=>{showSweetAlert("Marked As Resolved","success"); navigate('/user-management-complaint');}} className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ml-2">
          Mark as resolved
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetailsCard;