'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  Descriptions,
  Image,
  Tag,
  Button,
  Space,
  Divider,
  Empty,
  Spin,
  App,
  List,
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  LinkOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { getProduct, ProductDto } from '@/app/lib/product-client';
import { getImageUrl, getFileUrl, getProductImageUrl } from '@/app/lib/image-utils';

const { Title, Text, Paragraph } = Typography;

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { message } = App.useApp();
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (error) {
        const err = error as Error;
        message.error(err.message || 'Gagal memuat detail produk');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, message]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8">
        <Empty description="Product not found" />
        <div className="text-center mt-4">
          <Button type="primary" onClick={() => router.push('/admin/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/admin/products')}
          >
            Back
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/products/${product.id}/edit`)}
            className="bg-green-600"
          >
            Edit Product
          </Button>
        </Space>
      </div>

      {/* Main Info */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Image
              src={getProductImageUrl(product.primaryImage, product.productImage)}
              alt={product.name}
              className="w-full rounded-lg"
              fallback="/placeholder.png"
            />
          </div>
          <div className="lg:col-span-2">
            <Title level={2}>{product.name}</Title>
            <Tag color="blue" className="mb-4">
              {product.slug}
            </Tag>
            {product.color && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-600">Color:</span>
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: product.color }}
                />
                <Text code>{product.color}</Text>
              </div>
            )}
            {product.description && (
              <div>
                <Text strong>Description:</Text>
                <Paragraph className="mt-2 text-gray-700">
                  <span dangerouslySetInnerHTML={{ __html: product.description }} />
                </Paragraph>
              </div>
            )}
            {product.urlYoutube && (
              <div className="mt-4">
                <Button
                  type="link"
                  icon={<LinkOutlined />}
                  href={product.urlYoutube}
                  target="_blank"
                  className="pl-0"
                >
                  Watch on YouTube
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Features */}
        <Card
          title={
            <span>
              <StarOutlined className="mr-2" />
              Product Features
            </span>
          }
        >
          {product.productFeature && product.productFeature.length > 0 ? (
            <List
              dataSource={product.productFeature.sort((a, b) => a.order - b.order)}
              renderItem={(feature) => (
                <List.Item>
                  <div className="flex items-start gap-3 w-full">
                    {feature.icon && (
                      <Image
                        src={getImageUrl(feature.icon)}
                        alt="icon"
                        width={32}
                        height={32}
                        className="mt-1"
                        preview={false}
                      />
                    )}
                    <div className="flex-1">
                      <Text>{feature.text}</Text>
                      <div className="text-xs text-gray-400 mt-1">Order: {feature.order}</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No features" />
          )}
        </Card>

        {/* Product Images */}
        <Card title="Product Images">
          {product.productImage && product.productImage.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {product.productImage.map((img, idx) => (
                <Image
                  key={idx}
                  src={getImageUrl(img.url)}
                  alt={`Product image ${idx + 1}`}
                  className="rounded-lg"
                  fallback="/placeholder.png"
                />
              ))}
            </div>
          ) : (
            <Empty description="No images" />
          )}
        </Card>
      </div>

      {/* Store Variants */}
      <Card
        title={
          <span>
            <ShoppingOutlined className="mr-2" />
            Store Variants & Links
          </span>
        }
        className="mt-6"
      >
        {product.productStore && product.productStore.length > 0 ? (
          <div className="space-y-6">
            {product.productStore.map((variant, idx) => (
              <div key={idx}>
                <Title level={5} className="mb-3">
                  {variant.name}
                </Title>
                {variant.productStore && variant.productStore.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {variant.productStore.map((store, sIdx) => (
                      <Card key={sIdx} size="small" hoverable>
                        <div className="flex justify-between items-center">
                          <Text strong>{store.name}</Text>
                          <Button
                            type="link"
                            size="small"
                            icon={<LinkOutlined />}
                            href={store.urlStore}
                            target="_blank"
                          >
                            Visit
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Text type="secondary">No stores available</Text>
                )}
                {product.productStore && idx < product.productStore.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        ) : (
          <Empty description="No store variants" />
        )}
      </Card>

      {/* Documents */}
      <Card
        title={
          <span>
            <FileTextOutlined className="mr-2" />
            Documents
          </span>
        }
        className="mt-6"
      >
        {product.productDocument && product.productDocument.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.productDocument.map((doc, idx) => (
              <Card key={idx} size="small" hoverable>
                <div className="flex justify-between items-center">
                  <div>
                    <Tag color={doc.type === 'MSDS' ? 'orange' : 'blue'}>{doc.type}</Tag>
                  </div>
                  {doc.file && (
                    <Button
                      type="link"
                      size="small"
                      icon={<LinkOutlined />}
                      href={getFileUrl(doc.file)}
                      target="_blank"
                    >
                      Download
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Empty description="No documents" />
        )}
      </Card>
    </div>
  );
}
