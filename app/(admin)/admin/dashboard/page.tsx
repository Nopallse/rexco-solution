'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Button } from 'antd';
import {
  AppstoreOutlined,
  FileTextOutlined,
  BookOutlined,
  ShopOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  EditOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { listProducts } from '@/app/lib/product-client';
import { getPublicArticles } from '@/app/lib/article-api';
import { listDocuments } from '@/app/lib/document-client';
import { listGallery } from '@/app/lib/gallery-client';

interface RecentActivity {
  key: string;
  type: string;
  title: string;
  status: string;
  date: string;
  id: string;
  slug?: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    articles: 0,
    documents: 0,
    galleries: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [products, articles, documents, galleries] = await Promise.all([
          listProducts(),
          getPublicArticles(),
          listDocuments(),
          listGallery(),
        ]);

        // Update stats
        setStats({
          products: products.length,
          articles: articles.length,
          documents: documents.length,
          galleries: galleries.length,
        });

        // Create recent activities from all sources
        const activities: RecentActivity[] = [];

        // Add recent products (last 3)
        products.slice(0, 3).forEach((product) => {
          activities.push({
            key: `product-${product.id}`,
            type: 'Product',
            title: product.name,
            status: 'published',
            date: new Date().toISOString().split('T')[0],
            id: product.id,
            slug: product.slug,
          });
        });

        // Add recent articles (last 3)
        articles.slice(0, 3).forEach((article) => {
          activities.push({
            key: `article-${article.id}`,
            type: 'Article',
            title: article.title,
            status: article.publishedAt ? 'published' : 'draft',
            date: article.publishedAt 
              ? new Date(article.publishedAt).toISOString().split('T')[0]
              : new Date(article.createdAt || '').toISOString().split('T')[0],
            id: article.id,
            slug: article.slug,
          });
        });

        // Add recent documents (last 2)
        documents.slice(0, 2).forEach((doc) => {
          activities.push({
            key: `document-${doc.id}`,
            type: 'Document',
            title: doc.title,
            status: 'published',
            date: new Date().toISOString().split('T')[0],
            id: doc.id,
          });
        });

        // Sort by date and take top 5
        activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentActivities(activities.slice(0, 5));

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const columns: ColumnsType<RecentActivity> = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={
          type === 'Product' ? 'blue' : 
          type === 'Article' ? 'green' : 
          type === 'Document' ? 'orange' : 'purple'
        }>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'success' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          />
        </Space>
      ),
    },
  ];

  const handleView = (record: RecentActivity) => {
    if (record.type === 'Product' && record.slug) {
      router.push(`/product/${record.slug}`);
    } else if (record.type === 'Article' && record.slug) {
      router.push(`/blog/${record.slug}`);
    }
  };

  const handleEdit = (record: RecentActivity) => {
    if (record.type === 'Product') {
      router.push(`/admin/products/edit/${record.id}`);
    } else if (record.type === 'Article') {
      router.push(`/admin/articles/edit/${record.id}`);
    } else if (record.type === 'Document') {
      router.push(`/admin/documents`);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-gray-600 font-medium">Total Products</span>}
              value={stats.products}
              prefix={<AppstoreOutlined className="text-blue-600" />}
              valueStyle={{ color: '#1890ff', fontSize: '28px', fontWeight: 600 }}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-gray-600 font-medium">Articles</span>}
              value={stats.articles}
              prefix={<BookOutlined className="text-green-600" />}
              valueStyle={{ color: '#52c41a', fontSize: '28px', fontWeight: 600 }}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-gray-600 font-medium">Documents</span>}
              value={stats.documents}
              prefix={<FileTextOutlined className="text-orange-600" />}
              valueStyle={{ color: '#fa8c16', fontSize: '28px', fontWeight: 600 }}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-gray-600 font-medium">Gallery Images</span>}
              value={stats.galleries}
              prefix={<PictureOutlined className="text-purple-600" />}
              valueStyle={{ color: '#722ed1', fontSize: '28px', fontWeight: 600 }}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col>
          <Card
            title={<span className="font-semibold text-gray-900">Recent Activities</span>}
            bordered={false}
            className="shadow-sm"
          >
            <Table
              columns={columns}
              dataSource={recentActivities}
              pagination={false}
              size="small"
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;