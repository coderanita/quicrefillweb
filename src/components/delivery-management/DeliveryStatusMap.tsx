import React from 'react';

const DeliveryStatusMap = ({ markers }) => {
  return (
    <div className="bg-white rounded-none shadow p-4 w-full mb-6">
      <h2 className="text-lg font-semibold mb-4">Real-time delivery status</h2>

      <div className="relative w-full h-[500px]">
        {/* Google Maps Embed */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.772262690828!2d7.470960275105768!3d9.070285488104895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a573893c25f%3A0x708d31d778cf9b25!2sWuse%20II%2C%20Abuja!5e0!3m2!1sen!2sng!4v1683121459637!5m2!1sen!2sng"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Status Markers */}
        {markers.map((marker, index) => (
          <div
            key={index}
            className={`absolute ${marker.position} ${marker.color} text-white text-xs px-2 py-1 rounded-full`}
          >
            {marker.icon} {marker.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryStatusMap;
