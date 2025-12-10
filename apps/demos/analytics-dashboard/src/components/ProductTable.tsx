'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Package,
} from 'lucide-react';
import { productData, type ProductData } from '@/lib/data';

type SortField = 'name' | 'sales' | 'revenue' | 'growth';
type SortDirection = 'asc' | 'desc';

export function ProductTable() {
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedProducts = [...productData].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    }
    return multiplier * (a[sortField] - b[sortField]);
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Product Performance</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Top selling products</p>
        </div>
        <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Package className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th
                className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-white"
                onClick={() => handleSort('name')}
              >
                <span className="flex items-center gap-1">
                  Product <SortIcon field="name" />
                </span>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-white"
                onClick={() => handleSort('sales')}
              >
                <span className="flex items-center justify-end gap-1">
                  Sales <SortIcon field="sales" />
                </span>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-white"
                onClick={() => handleSort('revenue')}
              >
                <span className="flex items-center justify-end gap-1">
                  Revenue <SortIcon field="revenue" />
                </span>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-white"
                onClick={() => handleSort('growth')}
              >
                <span className="flex items-center justify-end gap-1">
                  Growth <SortIcon field="growth" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedProducts.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-spinoza-yellow/10 flex items-center justify-center text-spinoza-yellow text-xs font-bold">
                      {product.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm text-neutral-300">
                    {product.sales.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-medium text-white">
                    ${product.revenue.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.growth >= 0
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {product.growth >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(product.growth)}%
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
