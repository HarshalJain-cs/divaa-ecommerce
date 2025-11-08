/**
 * @page CheckoutPage
 * @description Checkout page with address collection, payment, and invoice
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CreditCard, CheckCircle2, MapPin, Phone, Mail, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/ui/Header';
import { toast } from 'sonner';

interface AddressForm {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

type CheckoutStep = 'address' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [addressForm, setAddressForm] = useState<AddressForm>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });

  // Calculate totals
  const subtotal = cartTotal;
  const gst = subtotal * 0.03; // 3% GST
  const shipping = subtotal > 5000 ? 0 : 100; // Free shipping above ₹5000
  const total = subtotal + gst + shipping;

  // Generate order ID
  const orderId = `DIVA${Date.now()}`;

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };

  // Validate address form
  const validateAddressForm = (): boolean => {
    const required = ['fullName', 'email', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!addressForm[field as keyof AddressForm]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressForm.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate phone
    if (!/^\d{10}$/.test(addressForm.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(addressForm.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }

    return true;
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (validateAddressForm()) {
      setCurrentStep('payment');
    }
  };

  // Handle payment completion (simulated)
  const handlePaymentComplete = () => {
    toast.success('Order placed successfully!');
    setCurrentStep('confirmation');
    // In real implementation, clear cart after successful payment
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  // Redirect if cart is empty
  if (items.length === 0 && currentStep !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  // Step indicator
  const StepIndicator = () => {
    const steps = [
      { id: 'address', label: 'Address', icon: MapPin },
      { id: 'payment', label: 'Payment', icon: CreditCard },
      { id: 'confirmation', label: 'Confirmation', icon: CheckCircle2 },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center ${index > 0 ? 'ml-8' : ''}`}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === step.id
                    ? 'bg-rose-gold-dark text-white'
                    : steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <step.icon className="w-6 h-6" />
              </div>
              <span className="text-xs mt-2 font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-4 ${
                  steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Order Summary Component
  const OrderSummary = () => (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

      {/* Products */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <img
              src={item.product.image_url || '/placeholder-product.jpg'}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {item.product.name}
              </h4>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
              <p className="text-sm font-bold text-rose-gold-dark">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>GST (3%)</span>
          <span className="font-medium">{formatPrice(gst)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span className="text-rose-gold-dark">{formatPrice(total)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-700 font-medium">
            🎉 You've qualified for FREE shipping!
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">Complete your purchase</p>

          <StepIndicator />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Address Step */}
              {currentStep === 'address' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-rose-gold-dark" />
                    <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
                  </div>

                  <form className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={addressForm.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={addressForm.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={addressForm.addressLine1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                        placeholder="Flat no., Building name"
                        required
                      />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={addressForm.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                        placeholder="Street, Area"
                      />
                    </div>

                    {/* City, State, Pincode */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                          placeholder="State"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={addressForm.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                          placeholder="6-digit pincode"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>

                    {/* Landmark */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={addressForm.landmark}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold-dark focus:border-transparent"
                        placeholder="Nearby landmark for easy delivery"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="w-full bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white py-4 rounded-lg hover:shadow-lg transition-all font-medium text-lg"
                    >
                      Proceed to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  {/* Delivery Address Review */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Delivery Address</h3>
                      <button
                        onClick={() => setCurrentStep('address')}
                        className="text-rose-gold-dark hover:text-blush text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">{addressForm.fullName}</p>
                      <p className="text-gray-600 text-sm mt-2">
                        {addressForm.addressLine1}
                        {addressForm.addressLine2 && `, ${addressForm.addressLine2}`}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {addressForm.city}, {addressForm.state} - {addressForm.pincode}
                      </p>
                      {addressForm.landmark && (
                        <p className="text-gray-600 text-sm">Near: {addressForm.landmark}</p>
                      )}
                      <p className="text-gray-600 text-sm mt-2">
                        📧 {addressForm.email} | 📞 {addressForm.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Payment</h3>
                    <div className="text-center py-8">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-xl inline-block mb-6">
                        <div className="bg-white p-6 rounded-lg">
                          {/* Placeholder QR Code */}
                          <div className="w-64 h-64 mx-auto bg-gray-800 flex items-center justify-center text-white rounded-lg">
                            <div className="text-center">
                              <Package className="w-16 h-16 mx-auto mb-4" />
                              <p className="text-sm font-medium">QR Code Payment</p>
                              <p className="text-xs mt-2 opacity-75">Razorpay Integration</p>
                              <p className="text-xs opacity-75">Coming Soon</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Scan QR Code to Pay
                      </h4>
                      <p className="text-gray-600 mb-2">
                        Amount to pay: <span className="text-2xl font-bold text-rose-gold-dark">{formatPrice(total)}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-6">
                        Order ID: {orderId}
                      </p>

                      {/* Simulated Payment Button */}
                      <button
                        onClick={handlePaymentComplete}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                      >
                        Simulate Payment Complete
                      </button>
                      <p className="text-xs text-gray-400 mt-2">
                        (For demonstration purposes only)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been confirmed.
                  </p>

                  {/* Order Details */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-semibold text-gray-800">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-semibold text-gray-800">
                          {new Date().toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-semibold text-rose-gold-dark text-lg">
                          {formatPrice(total)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className="font-semibold text-green-600">Paid</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/products')}
                      className="w-full bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="w-full border-2 border-rose-gold-dark text-rose-gold-dark py-3 rounded-lg hover:bg-rose-gold-dark hover:text-white transition-all font-medium"
                    >
                      Go to Home
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
