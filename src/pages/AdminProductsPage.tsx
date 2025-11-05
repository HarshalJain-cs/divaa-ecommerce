/**
 * @page AdminProductsPage
 * @description Admin page to manage all products
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import Header from '@/components/ui/Header';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct.mutateAsync(id);
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Products</h1>
              <p className="text-gray-600">
                {filteredProducts?.length || 0} products found
              </p>
            </div>
            <Link
              to="/admin/products/new"
              className="bg-brand-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </Link>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                        Image
                      </th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                        Name
                      </th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                        Price
                      </th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                        Stock
                      </th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                        Metal
                      </th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                        Featured
                      </th>
                      <th className="text-right py-4 px-4 text-gray-600 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-t hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <img
                            src={
                              product.image_url ||
                              'https://placehold.co/100x100/D4AF37/FFFFFF?text=No+Image'
                            }
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id.slice(0, 8)}...</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-gray-800">
                            {formatPrice(product.price)}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.stock_quantity === 0
                                ? 'bg-red-100 text-red-600'
                                : product.stock_quantity < 5
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {product.stock_quantity} units
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-600 capitalize">
                            {product.metal_type || 'N/A'}
                          </p>
                        </td>
                        <td className="py-4 px-4">
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
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-600 mb-4">No products found</p>
                <Link
                  to="/admin/products/new"
                  className="inline-block bg-brand-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Add Your First Product
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
