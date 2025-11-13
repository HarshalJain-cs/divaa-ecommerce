/**
 * @component CartPage
 * @description Shopping cart page with items list and checkout
 */
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Header from '@/components/ui/Header';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  // Empty cart state
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
                <br />
                Start shopping to find your perfect jewelry!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-rose-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6"
                >
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product.image_url || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-rose-gold-dark transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        {item.product.metal_type && (
                          <p>Metal: {item.product.metal_type}</p>
                        )}
                        {item.product.stone_type && (
                          <p>Stone: {item.product.stone_type}</p>
                        )}
                        <p className="text-lg font-bold text-charcoal mt-2">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.product.stock_quantity}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>

                    {/* Stock Warning */}
                    {item.product.stock_quantity < 5 && (
                      <p className="text-xs text-orange-600 mt-2">
                        Only {item.product.stock_quantity} left in stock
                      </p>
                    )}
                  </div>

                  {/* Subtotal */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                    <p className="text-xl font-bold text-gray-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
              >
                Clear entire cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-rose-gold-dark">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium mb-4"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-rose-gold-dark hover:text-blush transition-colors font-medium"
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-600 text-center mb-3">
                    We accept:
                  </p>
                  <div className="flex justify-center space-x-3 text-gray-400">
                    <span className="text-xs">💳 Visa</span>
                    <span className="text-xs">💳 Mastercard</span>
                    <span className="text-xs">💳 AmEx</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
