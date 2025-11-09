/**
 * @page AdminDashboard
 * @description Admin dashboard for managing products
 */
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, Settings, Plus } from 'lucide-react';
import Header from '@/components/ui/Header';
import { useProducts } from '@/hooks/useProducts';
import CallbackRequestsView from '@/components/admin/CallbackRequestsView';

export default function AdminDashboard() {
  const { data: products } = useProducts();

  const stats = [
    {
      title: 'Total Products',
      value: products?.length || 0,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: 0,
      icon: ShoppingCart,
      color: 'bg-green-500',
      link: '/admin/orders',
    },
    {
      title: 'Total Users',
      value: 0,
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/users',
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your jewelry store</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              to="/admin/products/new"
              className="bg-brand-gold text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-4"
            >
              <Plus className="w-8 h-8" />
              <div>
                <h3 className="font-semibold text-lg">Add Product</h3>
                <p className="text-sm opacity-90">Create new product</p>
              </div>
            </Link>

            <Link
              to="/admin/products"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-4 border-2 border-gray-200"
            >
              <Package className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Manage Products</h3>
                <p className="text-sm text-gray-600">Edit, delete products</p>
              </div>
            </Link>

            <Link
              to="/admin/categories"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-4 border-2 border-gray-200"
            >
              <Settings className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Categories</h3>
                <p className="text-sm text-gray-600">Manage categories</p>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Link
                key={stat.title}
                to={stat.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Products</h2>
              <Link
                to="/admin/products"
                className="text-brand-gold hover:underline text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Stock</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Featured</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.slice(0, 5).map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">${product.price}</td>
                      <td className="py-3 px-4">{product.stock_quantity}</td>
                      <td className="py-3 px-4">
                        {product.is_featured ? (
                          <span className="bg-brand-gold text-white text-xs px-2 py-1 rounded-full">
                            Yes
                          </span>
                        ) : (
                          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Callback Requests Section */}
          <div className="mt-8">
            <CallbackRequestsView />
          </div>
        </div>
      </div>
    </>
  );
}
