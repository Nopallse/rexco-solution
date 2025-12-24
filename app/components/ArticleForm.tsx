'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, DatePicker, Upload, Button, App } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import RichTextEditor, { type RichTextEditorRef } from '@/app/components/RichTextEditor';
import ImageGalleryModal from '@/app/components/ImageGalleryModal';
import { type Article, uploadImageArticle } from '@/app/lib/article-api';
import { getImageUrl } from '@/app/lib/image-utils';

const { TextArea } = Input;

interface ArticleFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  article?: Article | null;
  loading: boolean;
  token: string;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ open, onClose, onSubmit, article, loading, token }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const editorRef = useRef<RichTextEditorRef>(null);

  const [contentHtml, setContentHtml] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showImageGallery, setShowImageGallery] = useState(false);

  const isEdit = !!article;

  // Normalize image src URLs in HTML using shared helper
  const addBaseUrlToImages = (html: string): string => {
    return html.replace(/src="([^"]+)"/g, (_m, url) => {
      const normalized = getImageUrl(url);
      return `src="${normalized}"`;
    });
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open && article) {
      // Edit mode - populate form
      form.setFieldsValue({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        author: article.author,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        seoKeywords: article.seoKeywords,
        publishedAt: article.publishedAt ? dayjs(article.publishedAt) : undefined,
      });
      // Add API_BASE to relative image URLs in content
      const contentWithBaseUrl = addBaseUrlToImages(article.contentHtml || '');
      setContentHtml(contentWithBaseUrl);

      if (article.primaryImage) {
        setFileList([
          {
            uid: '-1',
            name: 'image.jpg',
            status: 'done',
            url: getImageUrl(article.primaryImage),
          },
        ]);
      }
    } else if (open) {
      // Create mode - reset form
      form.resetFields();
      setContentHtml('');
      setFileList([]);
    }
  }, [open, article, form]);

  const handleClose = () => {
    form.resetFields();
    setContentHtml('');
    setFileList([]);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!contentHtml || contentHtml.trim() === '') {
        message.error('Content is required');
        return;
      }

      const formData = new FormData();
      formData.append('title', values.title);
      if (values.slug) formData.append('slug', values.slug);
      if (values.excerpt) formData.append('excerpt', values.excerpt);
      formData.append('contentHtml', values.contentHtml || contentHtml);
      if (values.author) formData.append('author', values.author);
      if (values.seoTitle) formData.append('seoTitle', values.seoTitle);
      if (values.seoDescription) formData.append('seoDescription', values.seoDescription);
      if (values.seoKeywords) formData.append('seoKeywords', values.seoKeywords);
      if (values.publishedAt) {
        formData.append('publishedAt', values.publishedAt.toISOString());
      }

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          formData.append('file', file.originFileObj);
        }
      }

      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList.slice(-1));
  };

  // Handle image upload for content
  const handleContentImageUpload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadImageArticle(formData, token);
      const imageUrl = getImageUrl(result.url);
      message.success('Image uploaded successfully');
      return imageUrl;
    } catch (error) {
      message.error('Failed to upload image');
      throw error;
    }
  };

  // Handle image selection from gallery
  const handleImageSelect = (imageUrl: string) => {
    editorRef.current?.insertImage(imageUrl);
  };

  const handleOpenPreview = () => {
    const previewData = {
      title: form.getFieldValue('title') || 'Article Title',
      contentHtml: contentHtml,
      primaryImage: fileList[0]?.url || '',
      publishedAt: form.getFieldValue('publishedAt') ? form.getFieldValue('publishedAt').toISOString() : dayjs().toISOString(),
    };
    
    // Store preview data in sessionStorage
    sessionStorage.setItem('articlePreview', JSON.stringify(previewData));
    
    // Open new window/tab
    window.open('/preview', 'ArticlePreview', 'width=1400,height=900');
  };

  return (
    <>
      <Modal
        title={isEdit ? 'Edit Article' : 'Add New Article'}
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit}
        confirmLoading={loading}
        width={1000}
        okButtonProps={{ className: 'bg-green-600' }}
        okText={isEdit ? 'Update' : 'Create'}
        cancelText="Cancel"
        destroyOnHidden
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className="flex justify-between">
            <Button onClick={handleOpenPreview} type="primary" size="large">
              Preview
            </Button>
            <div className="space-x-2">
              <CancelBtn />
              <OkBtn />
            </div>
          </div>
        )}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="Article Title"
            rules={[{ required: true, message: 'Please enter article title' }]}
          >
            <Input placeholder="Enter article title" size="large" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="slug" label="Slug (optional)">
              <Input placeholder="article-slug (auto-generated if empty)" size="large" />
            </Form.Item>

            <Form.Item name="author" label="Author">
              <Input placeholder="Author name" size="large" />
            </Form.Item>
          </div>

          <Form.Item name="publishedAt" label="Published Date">
            <DatePicker size="large" className="w-full" showTime />
          </Form.Item>

          <Form.Item name="excerpt" label="Excerpt">
            <TextArea rows={2} placeholder="Short description..." />
          </Form.Item>

          <Form.Item label={<span>Content <span className="text-red-500">*</span></span>}>
            <div className="mb-2">
              <Button 
                type="primary" 
                size="large"
                onClick={() => setShowImageGallery(true)}
              >
                Insert Image
              </Button>
            </div>
            <RichTextEditor
              ref={editorRef}
              value={contentHtml}
              onChange={setContentHtml}
              placeholder="Write your article content here..."
              onImageUpload={handleContentImageUpload}
              onImageButtonClick={() => setShowImageGallery(true)}
            />
          </Form.Item>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
            
            <Form.Item name="seoTitle" label="SEO Title">
              <Input placeholder="SEO title for search engines" />
            </Form.Item>

            <Form.Item name="seoDescription" label="SEO Description">
              <TextArea rows={2} placeholder="SEO description for search engines" />
            </Form.Item>

            <Form.Item name="seoKeywords" label="SEO Keywords">
              <Input placeholder="Keywords separated by comma" />
            </Form.Item>
          </div>

          <Form.Item label="Featured Image">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length === 0 && (
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <ImageGalleryModal
        open={showImageGallery}
        onClose={() => setShowImageGallery(false)}
        onImageSelect={handleImageSelect}
        token={token}
      />
    </>
  );
};

export default ArticleForm;
