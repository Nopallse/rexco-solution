'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Button,
  Space,
  Input,
  Tag,
  Card,
  App,
  Image,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  listProducts,
  deleteProduct,
  ProductDto,
} from '@/app/lib/product-client';
import { getProductImageUrl } from '@/app/lib/image-utils';

type ProductRow = ProductDto & { key: string };

const ProductsPage = () => {
  const router = useRouter();
  const { message, modal } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await listProducts();
      setProducts((data ?? []).map((item) => ({ ...item, key: item.id })) as ProductRow[]);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || 'Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<ProductRow> = [
    {
      title: 'Image',
      dataIndex: 'primaryImage',
      key: 'primaryImage',
      width: 80,
      render: (img?: string | null, record?: ProductRow) => {
        const imageUrl = getProductImageUrl(record?.primaryImage, record?.productImage);
        return (
          <Image
            src={imageUrl}
            alt="product"
            width={60}
            height={60}
            className="object-cover rounded"
            preview={false}
            fallback="/placeholder.png"
          />
        );
      },
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ProductRow) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <Tag className="mt-1" color="blue">{record.slug}</Tag>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_: unknown, record: ProductRow) => (
        <Space size="small">
          <Button
            type="default"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => router.push(`/admin/products/${record.id}`)}
          >
            Detail
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => router.push(`/admin/products/${record.id}/edit`)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => showDeleteConfirm(record.id)}
          />
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (id: string) => {
    modal.confirm({
      title: 'Hapus Produk',
      icon: <ExclamationCircleOutlined />,
      content: 'Apakah Anda yakin ingin menghapus produk ini?',
      okText: 'Hapus',
      okType: 'danger',
      cancelText: 'Batal',
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('Produk berhasil dihapus');
      await loadProducts();
    } catch (error) {
      const err = error as Error;
      message.error(err.message || 'Gagal menghapus produk');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Products Management</h1>
          <p className="text-gray-600">Kelola produk dengan data dari backend</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadProducts} loading={loading}>
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => router.push('/admin/products/create')}
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Product
          </Button>
        </Space>
      </div>

      <Card bordered={false} className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search products by name..."
            prefix={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} products`,
          }}
        />
      </Card>
    </div>
  );
};

export default ProductsPage;
