'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Card,
  App,
  Tag,
  Upload,
  type UploadFile,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  InstagramOutlined,
  LinkOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  listInstagram,
  createInstagram,
  updateInstagram,
  deleteInstagram,
  InstagramDto,
} from '@/app/lib/instagram-client';
import {
  getInstagramPostId,
  getInstagramEmbedUrl,
  getInstagramMediaUrl,
} from '@/app/lib/instagram-utils';
import { getImageUrl } from '@/app/lib/image-utils';

type InstagramRow = InstagramDto & { key: string };

const InstagramPage = () => {
  const { message } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstagram, setEditingInstagram] = useState<InstagramDto | null>(null);
  const [instagrams, setInstagrams] = useState<InstagramRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const [instagramMedia, setInstagramMedia] = useState<Record<string, string>>({});
  const [previewLink, setPreviewLink] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const loadInstagrams = async () => {
    setLoading(true);
    try {
      const data = await listInstagram();
      setInstagrams((data ?? []).map((item) => ({ ...item, key: item.id })));
      
      // Fetch Instagram media URLs
      const mediaUrls: Record<string, string> = {};
      for (const item of data ?? []) {
        if (item.link) {
          try {
            const mediaUrl = getInstagramMediaUrl(item.link);
            if (mediaUrl) {
              mediaUrls[item.id] = mediaUrl;
            }
          } catch {
            // Silently fail for individual media URLs
          }
        }
      }
      setInstagramMedia(mediaUrls);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || 'Gagal memuat instagram');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstagrams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredInstagrams = useMemo(() => {
    if (!searchText) return instagrams;
    return instagrams.filter((ig) =>
      ig.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      ig.link?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [instagrams, searchText]);

  const columns: ColumnsType<InstagramRow> = [
    {
      title: 'Preview',
      dataIndex: 'link',
      key: 'preview',
      width: 120,
      render: (link?: string | null, record?: InstagramRow) => {
        // Prioritas: uploaded image > Instagram embed
        if (record?.image) {
          return (
            <div className="w-20 h-20 overflow-hidden rounded border border-gray-200">
              <img
                src={getImageUrl(record.image)}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
          );
        }
        
        if (!link) return <span className="text-gray-400">-</span>;
        
        const mediaUrl = record?.id ? instagramMedia[record.id] : null;
        if (mediaUrl) {
          return (
            <div className="w-20 h-20 overflow-hidden rounded border border-gray-200">
              <img
                src={mediaUrl}
                alt="Instagram media"
                className="w-full h-full object-cover"
              />
            </div>
          );
        }
        
        const embedUrl = getInstagramEmbedUrl(link);
        if (!embedUrl) return <span className="text-gray-400">Invalid</span>;
        
        return (
          <div className="w-20 h-20 overflow-hidden rounded border border-gray-200">
            <iframe
              src={embedUrl}
              width="80"
              height="80"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              className="pointer-events-none scale-[2] origin-top-left"
              style={{ transform: 'scale(0.5)', transformOrigin: '0 0', width: '160px', height: '160px' }}
            />
          </div>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string | null) => (
        <span className="font-medium text-gray-900">{text || '-'}</span>
      ),
    },
    {
      title: 'Instagram Link',
      dataIndex: 'link',
      key: 'link',
      render: (link?: string | null) =>
        link ? (
          <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1">
            <LinkOutlined />
            View Post
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        ),
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const resetModal = () => {
    form.resetFields();
    setEditingInstagram(null);
    setPreviewLink('');
    setFileList([]);
  };

  const handleEdit = (instagram: InstagramDto) => {
    setEditingInstagram(instagram);
    form.setFieldsValue({
      title: instagram.title ?? '',
      link: instagram.link ?? '',
    });
    
    // Set existing image ke fileList
    if (instagram.image) {
      setFileList([{
        uid: '-1',
        name: instagram.image.split('/').pop() || 'image.jpg',
        status: 'done',
        url: getImageUrl(instagram.image),
      }]);
    } else {
      setFileList([]);
    }
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Delete Instagram Post',
      content: 'Are you sure you want to delete this post?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        setSaving(true);
        try {
          await deleteInstagram(id);
          message.success('Instagram post berhasil dihapus');
          await loadInstagrams();
        } catch (error) {
          const err = error as Error;
          message.error(err.message || 'Gagal menghapus instagram post');
        } finally {
          setSaving(false);
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      // Tambahkan file jika ada
      const payload: any = { ...values };
      if (fileList.length > 0 && fileList[0].originFileObj) {
        payload.file = fileList[0].originFileObj;
      }

      if (editingInstagram) {
        await updateInstagram(editingInstagram.id, payload);
        message.success('Instagram post berhasil diperbarui');
      } else {
        await createInstagram(payload);
        message.success('Instagram post berhasil dibuat');
      }

      setIsModalOpen(false);
      resetModal();
      await loadInstagrams();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'Gagal menyimpan instagram post');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            <InstagramOutlined className="mr-2" />
            Instagram Posts
          </h1>
          <p className="text-gray-600">Kelola link postingan Instagram</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadInstagrams} loading={loading}>
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              resetModal();
              setIsModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Post
          </Button>
        </Space>
      </div>

      <Card bordered={false} className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search by title or link..."
            prefix={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredInstagrams}
          loading={loading}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} posts`,
          }}
        />
      </Card>

      <Modal
        title={editingInstagram ? 'Edit Instagram Post' : 'Add New Instagram Post'}
        open={isModalOpen}
        onOk={handleSubmit}
        confirmLoading={saving}
        onCancel={() => {
          setIsModalOpen(false);
          resetModal();
        }}
        width={600}
        okText={editingInstagram ? 'Update' : 'Create'}
        okButtonProps={{ className: 'bg-green-600' }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="Title (Optional)"
          >
            <Input placeholder="e.g., Product Launch Event" size="large" />
          </Form.Item>

          <Form.Item
            name="link"
            label="Instagram Post Link"
            rules={[
              { required: true, message: 'Please enter Instagram link' },
              { type: 'url', message: 'Please enter a valid URL' },
            ]}
          >
            <Input 
              placeholder="https://www.instagram.com/p/..." 
              size="large"
              prefix={<InstagramOutlined />}
              onChange={(e) => {
                const link = e.target.value;
                setPreviewLink(link);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Upload Image (Optional)"
            tooltip="Upload gambar untuk menggantikan preview Instagram"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={(file) => {
                // Validasi file type
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('Hanya bisa upload file gambar!');
                  return Upload.LIST_IGNORE;
                }
                // Validasi file size (max 5MB)
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                  message.error('Ukuran gambar maksimal 5MB!');
                  return Upload.LIST_IGNORE;
                }
                return false; // Prevent auto upload
              }}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList.slice(-1)); // Keep only one file
              }}
              onRemove={() => {
                setFileList([]);
              }}
              maxCount={1}
            >
              {fileList.length === 0 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {previewLink && getInstagramPostId(previewLink) && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Preview:</div>
              <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '500px', maxHeight: '600px' }}>
                <img
                  src={`https://instagram.com/p/${getInstagramPostId(previewLink)}/media/?size=m`}
                  alt="Instagram preview"
                  style={{ width: '100%', height: 'auto' }}
                  onError={(e) => {
                    // Fallback to embed if image fails
                    const embedUrl = getInstagramEmbedUrl(previewLink);
                    if (embedUrl) {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
            <strong>Tip:</strong> Copy the link from Instagram post (Share → Copy Link)
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InstagramPage;
