'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Upload,
  Card,
  App,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  ReloadOutlined,
  FileTextOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  listDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  DocumentDto,
} from '@/app/lib/document-client';
import { getImageUrl, getFileUrl } from '@/app/lib/image-utils';

type DocumentRow = DocumentDto & { key: string };

const brochuresPage = () => {
  const { message } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<DocumentDto | null>(null);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await listDocuments();
      setDocuments((data ?? []).map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      const err = error as Error;
      message.error(err.message || 'Gagal memuat dokumen');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredDocuments = useMemo(() => {
    if (!searchText) return documents;
    return documents.filter((d) => d.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [documents, searchText]);

  const columns: ColumnsType<DocumentRow> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-medium text-gray-900">{text}</span>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src?: string | null) =>
        src ? (
          <img src={getImageUrl(src)} alt="document" className="w-16 h-16 object-cover rounded" />
        ) : (
          <span className="text-gray-400">-</span>
        ),
      width: 120,
    },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: (src?: string | null) =>
        src ? (
          <a href={getFileUrl(src)} target="_blank" rel="noreferrer" className="text-green-700">
            <FileTextOutlined className="mr-1" />
            Download
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        ),
      width: 150,
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
    setImageList([]);
    setDocumentList([]);
    setEditingDocument(null);
  };

  const handleEdit = (document: DocumentDto) => {
    setEditingDocument(document);
    form.setFieldsValue({
      title: document.title,
    });
    
    // Load existing image
    if (document.image) {
      setImageList([{
        uid: '-1',
        name: document.image.split('/').pop() || 'image',
        status: 'done',
        url: getImageUrl(document.image),
      }]);
    }
    
    // Load existing file
    if (document.file) {
      setDocumentList([{
        uid: '-2',
        name: document.file.split('/').pop() || 'document.pdf',
        status: 'done',
        url: getFileUrl(document.file),
      }]);
    }
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await deleteDocument(id);
      message.success('Dokumen berhasil dihapus');
      await loadDocuments();
    } catch (error) {
      const err = error as Error;
      message.error(err.message || 'Gagal menghapus dokumen');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      // Only send new files (has originFileObj)
      const newImage = imageList.find((file) => file.originFileObj);
      const image = newImage?.originFileObj as File | undefined;
      
      const newDocument = documentList.find((file) => file.originFileObj);
      const document = newDocument?.originFileObj as File | undefined;

      if (!editingDocument && (!image || !document)) {
        message.error('Image dan dokumen wajib diisi untuk dokumen baru');
        setSaving(false);
        return;
      }

      if (editingDocument) {
        await updateDocument(editingDocument.id, values, {
          image: image ?? null,
          document: document ?? null,
        });
        message.success('Dokumen berhasil diperbarui');
      } else {
        await createDocument(values, {
          image: image ?? null,
          document: document ?? null,
        });
        message.success('Dokumen berhasil dibuat');
      }

      setIsModalOpen(false);
      resetModal();
      await loadDocuments();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'Gagal menyimpan dokumen');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">brochures Management</h1>
          <p className="text-gray-600">Kelola dokumen brosur dan katalog produk</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadDocuments} loading={loading}>
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
            Add New Catalog
          </Button>
        </Space>
      </div>

      <Card bordered={false} className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search brochures by title..."
            prefix={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredDocuments}
          loading={loading}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} brochures`,
          }}
        />
      </Card>

      <Modal
        title={editingDocument ? 'Edit Catalog' : 'Add New Catalog'}
        open={isModalOpen}
        onOk={handleSubmit}
        confirmLoading={saving}
        onCancel={() => {
          setIsModalOpen(false);
          resetModal();
        }}
        width={700}
        okText={editingDocument ? 'Update' : 'Create'}
        okButtonProps={{ className: 'bg-green-600' }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter catalog title' }]}
          >
            <Input placeholder="e.g., Product Catalog 2025" size="large" />
          </Form.Item>

          <Form.Item
            label="Cover Image"
            tooltip="Upload gambar cover untuk katalog"
            rules={editingDocument ? [] : [{ required: true, message: 'Image is required' }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={imageList}
              onChange={({ fileList }) => setImageList(fileList)}
              beforeUpload={() => false}
            >
              <div>
                <FileImageOutlined />
                <div className="mt-2">Upload Image</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Document File (PDF)"
            tooltip="Upload file PDF katalog"
            rules={editingDocument ? [] : [{ required: true, message: 'Document is required' }]}
          >
            <Upload
              maxCount={1}
              fileList={documentList}
              onChange={({ fileList }) => setDocumentList(fileList)}
              beforeUpload={() => false}
              accept=".pdf"
            >
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default brochuresPage;
