<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

onclick="showToast('Saved successfully!', 'success');"
onclick="showToast('Opration Cancelled', 'error');"
function showToast(message = 'Action completed successfully!', icon = 'success') {
    let bgGradient = '';
    let textColor = 'text-white';
    let borderColor = '';

    // Dynamic background based on icon type
    switch (icon) {
    case 'success':
        bgGradient = 'linear-gradient(to right, #38b000, #70e000)';
        borderColor = '#38b000';
        break;
    case 'error':
        bgGradient = 'linear-gradient(to right, #d00000, #ff4d4d)';
        borderColor = '#d00000';
        break;
    case 'warning':
        bgGradient = 'linear-gradient(to right, #ffb600, #ffe066)';
        borderColor = '#ffb600';
        textColor = 'text-black';
        break;
    case 'info':
        bgGradient = 'linear-gradient(to right, #0077b6, #90e0ef)';
        borderColor = '#0077b6';
        break;
    default:
        bgGradient = 'linear-gradient(to right, #333, #555)';
        break;
    }

    Swal.fire({
    toast: true,
    position: 'top-end',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: bgGradient,
    color: textColor === 'text-white' ? '#fff' : '#000',
    customClass: {
        popup: `rounded-xl shadow-lg border ${textColor} px-4 py-2`,
        title: `font-medium ${textColor}`,
    }
    });
}
