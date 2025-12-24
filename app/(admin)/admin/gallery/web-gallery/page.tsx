'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Upload,
  App,
  Image,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  listGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  GalleryDto,
} from '@/app/lib/gallery-client';
import { getImageUrl } from '@/app/lib/image-utils';

type GalleryRow = GalleryDto & { key: string };

const GalleryPage = () => {
  const { message } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryDto | null>(null);
  const [galleries, setGalleries] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const loadGalleries = async () => {
    setLoading(true);
    try {
      const data = await listGallery();
      setGalleries((data ?? []).map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      const err = error as Error;
      message.error(err.message || 'Gagal memuat galeri');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredGalleries = useMemo(() => {
    if (!searchText) return galleries;
    return galleries.filter((g) => 
      g.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [galleries, searchText]);

  const resetModal = () => {
    form.resetFields();
    setImageList([]);
    setEditingGallery(null);
  };

  const handleEdit = (gallery: GalleryDto) => {
    setEditingGallery(gallery);
    form.setFieldsValue({
      title: gallery.title ?? '',
    });
    
    // Load existing image
    if (gallery.image) {
      setImageList([{
        uid: '-1',
        name: gallery.image.split('/').pop() || 'image',
        status: 'done',
        url: getImageUrl(gallery.image),
      }]);
    }
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Delete Gallery',
      content: 'Are you sure you want to delete this image?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        setSaving(true);
        try {
          await deleteGallery(id);
          message.success('Galeri berhasil dihapus');
          await loadGalleries();
        } catch (error) {
          const err = error as Error;
          message.error(err.message || 'Gagal menghapus galeri');
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

      // Only send new image (has originFileObj)
      const newImage = imageList.find((file) => file.originFileObj);
      const image = newImage?.originFileObj as File | undefined;

      if (!editingGallery && !image) {
        message.error('Image wajib diisi untuk galeri baru');
        setSaving(false);
        return;
      }

      if (editingGallery) {
        await updateGallery(editingGallery.id, values, {
          image: image ?? null,
        });
        message.success('Galeri berhasil diperbarui');
      } else {
        await createGallery(values, {
          image: image ?? null,
        });
        message.success('Galeri berhasil dibuat');
      }

      setIsModalOpen(false);
      resetModal();
      await loadGalleries();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'Gagal menyimpan galeri');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gallery Management</h1>
          <p className="text-gray-600">Kelola foto galeri website</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadGalleries} loading={loading}>
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
            Add New Image
          </Button>
        </Space>
      </div>

      <Card bordered={false} className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search gallery by title..."
            prefix={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGalleries.map((gallery) => (
              <Card
                key={gallery.id}
                hoverable
                cover={
                  <div className="aspect-square overflow-hidden">
                    <img
                      alt={gallery.title || 'Gallery image'}
                      src={getImageUrl(gallery.image)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                }
                actions={[
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(gallery)}
                  >
                    Edit
                  </Button>,
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(gallery.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={gallery.title || 'Untitled'}
                  description={
                    <span className="text-xs text-gray-400">
                      ID: {gallery.id.substring(0, 8)}...
                    </span>
                  }
                />
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredGalleries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No gallery images found
          </div>
        )}
      </Card>

      <Modal
        title={editingGallery ? 'Edit Gallery' : 'Add New Image'}
        open={isModalOpen}
        onOk={handleSubmit}
        confirmLoading={saving}
        onCancel={() => {
          setIsModalOpen(false);
          resetModal();
        }}
        width={600}
        okText={editingGallery ? 'Update' : 'Create'}
        okButtonProps={{ className: 'bg-green-600' }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="Title (Optional)"
          >
            <Input placeholder="e.g., Workshop Event 2025" size="large" />
          </Form.Item>

          <Form.Item
            label="Image"
            tooltip="Upload gambar untuk galeri"
            rules={editingGallery ? [] : [{ required: true, message: 'Image is required' }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={imageList}
              onChange={({ fileList }) => setImageList(fileList)}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div className="mt-2">Upload Image</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryPage;
