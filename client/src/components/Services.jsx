import React from 'react';

const services = [
  {
    id: 1,
    name: 'Transport',
    description: 'Reliable transport services for goods and personnel.',
    price: 'Kshs 5000.00',
    availability: 'Available'
  },
  {
    id: 2,
    name: 'Construction',
    description: 'Expert construction services for all types of projects.',
    price: 'Kshs 20000.00',
    availability: 'Available'
  },
  {
    id: 3,
    name: 'Consultation',
    description: 'Professional consultation services for your projects.',
    price: 'Kshs 3000.00 per hour',
    availability: 'Available'
  },
  {
    id: 4,
    name: 'Maintenance',
    description: 'Routine and emergency maintenance services.',
    price: 'Kshs 1000.00 per visit',
    availability: 'Subject to scheduling'
  },
];

const ServiceRequestForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic
    alert("Request submitted. We have received your service request.");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
        <input type="text" id="service" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div className="mb-4">
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Additional Details</label>
        <textarea id="details" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Request
      </button>
    </form>
  );
};

const Services = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <p className="text-lg">We offer a range of services to meet your needs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="mt-2">{service.description}</p>
            <p className="mt-2 font-bold">{service.price}</p>
            <span className={`mt-2 inline-block px-2 py-1 rounded text-white ${service.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
              {service.availability}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ServiceRequestForm />
      </div>
    </div>
  );
};

export default Services;
