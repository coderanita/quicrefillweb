import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * Displays a SweetAlert2 toast notification with dynamic styling.
 * @param {string} icon - The icon type ('success', 'error', 'warning', 'info').
 * @param {string} message - The message to display in the toast.
 */
export const showSweetAlert = (message,icon ) => {
    let bgGradient = '';
    let swalTextColor = '#fff'; // For SweetAlert's 'color' property
    let swalBorderColor = '';   // For the custom border style

    // Dynamic background and text color based on icon type
    switch (icon) {
        case 'success':
            bgGradient = 'linear-gradient(to right, #38b000, #70e000)';
            swalBorderColor = '#38b000';
            swalTextColor = '#fff';
            break;
        case 'error':
            bgGradient = 'linear-gradient(to right, #d00000, #ff4d4d)';
            swalBorderColor = '#d00000';
            swalTextColor = '#fff';
            break;
        case 'warning':
            bgGradient = 'linear-gradient(to right, #ffb600, #ffe066)';
            swalBorderColor = '#ffb600';
            swalTextColor = '#000'; // Black text for warning
            break;
        case 'info':
            bgGradient = 'linear-gradient(to right, #0077b6, #90e0ef)';
            swalBorderColor = '#0077b6';
            swalTextColor = '#fff';
            break;
        default:
            bgGradient = 'linear-gradient(to right, #333, #555)';
            swalBorderColor = '#333';
            swalTextColor = '#fff';
            break;
    }


    MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: bgGradient,   // This sets the gradient background
        color: swalTextColor,     // This sets the text color of the title
        customClass: {
            // Keep only static Tailwind classes here.
            // Text color is handled by 'color' property, border by 'didOpen'.
            popup: `rounded-xl shadow-lg px-4 py-2`,
            title: `font-medium`, // 'font-medium' is a Tailwind class for font weight
        },
        didOpen: (toast) => {
            // Directly apply the border style to the toast element
            toast.style.border = `1px solid ${swalBorderColor}`;

            // Optional: If you want to ensure progress bar color matches
            const progressBar = toast.querySelector('.swal2-timer-progress-bar');
            if (progressBar) {
                progressBar.style.backgroundColor = swalBorderColor; // or a lighter shade
            }
        }
    });
};
export const confirmDelete = (
  setData: Function,
  idKey: string,
  idValue: any,
  entityName: string = "item"
) => {
  // Custom SweetAlert confirm mimicking your toast style
  MySwal.fire({
      title: `Are you sure you want to delete this ${entityName}?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",   // default red
    cancelButtonColor: "#3085d6", // default blue
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result: any) => {
    if (result.isConfirmed) {
      setData((prev: any[]) => prev.filter((entity) => entity[idKey] !== idValue));
      showSweetAlert(`${entityName.charAt(0).toUpperCase() + entityName.slice(1)} deleted successfully!`, "success");
    }
  });
};

export const confirmSuspend = async (onConfirm: () => void | Promise<void>,title='Accessory') => {
  const res = await Swal.fire({
    title: `Suspend ${title}?`,
    text: `This will mark the ${title} as suspended.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d97706', // orange-600
    cancelButtonColor: '#6b7280',  // gray-500
    confirmButtonText: 'Yes, suspend',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });
  if (res.isConfirmed) {
    await onConfirm();
    showSweetAlert(title+' suspended', 'warning');
  }
};


