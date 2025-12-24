'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Form,
  Input,
  Upload,
  Card,
  App,
  Divider,
  InputNumber,
  Select,
  Space,
} from 'antd';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { createProduct, ProductForm } from '@/app/lib/product-client';

export default function CreateProductPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [primaryImageList, setPrimaryImageList] = useState<UploadFile[]>([]);
  const [imagesList, setImagesList] = useState<UploadFile[]>([]);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);
  const [featureIcons, setFeatureIcons] = useState<Record<number, UploadFile[]>>({});
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const primaryImage = primaryImageList[0]?.originFileObj as File | undefined;
      const images = imagesList
        .map((file) => file.originFileObj)
        .filter(Boolean) as File[];

      const documents = documentList
        .map((file) => file.originFileObj)
        .filter(Boolean) as File[];

      const productFeature = values.productFeature?.map((f: any) => ({
        text: f.text,
        order: Number(f.order),
      }));

      const productStore = values.productStore?.map((ps: any) => ({
        name: ps.name,
        stores: ps.stores?.map((s: any) => ({ name: s.name, urlStore: s.urlStore })) ?? [],
      }));

      const productDocument = values.productDocument?.map((d: any) => ({ type: d.type }));

      if (productDocument && productDocument.length !== documents.length && documents.length > 0) {
        message.error('Jumlah dokumen harus sama dengan jumlah tipe dokumen');
        setLoading(false);
        return;
      }

      const allFeatureHasIcon = productFeature?.length
        ? productFeature.every((_: unknown, idx: number) => featureIcons[idx]?.[0]?.originFileObj)
        : false;

      const iconFiles = allFeatureHasIcon
        ? productFeature?.map((_: unknown, idx: number) => featureIcons[idx]?.[0]?.originFileObj as File)
        : undefined;

      const payload: ProductForm = {
        name: values.name,
        description: values.description || undefined,
        urlYoutube: values.urlYoutube || undefined,
        color: values.color || undefined,
        productFeature,
        productStore,
        productDocument,
      };

      await createProduct(payload, {
        primaryImage: primaryImage ?? null,
        images,
        documents,
        icons: iconFiles,
      });
      
      message.success('Produk berhasil dibuat');
      router.push('/admin/products');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'Gagal menyimpan produk');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/admin/products')}
        >
          Back
        </Button>
      </div>

      <Card>
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="e.g., REXCO 82 - Brake Cleaner" size="large" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Product description..." />
          </Form.Item>

          <Form.Item
            name="urlYoutube"
            label="YouTube URL"
            rules={[{ type: 'url', message: 'Invalid URL' }]}
          >
            <Input placeholder="https://youtube.com/..." size="large" />
          </Form.Item>

          <Form.Item name="color" label="Product Color (Hex)">
            <Input placeholder="#FF0000" size="large" />
          </Form.Item>

          <Divider>Features</Divider>
          <Form.List name="productFeature">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field) => (
                  <Card
                    key={field.key}
                    size="small"
                    title={`Feature ${field.name + 1}`}
                    extra={
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    }
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'text']}
                      label="Text"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="Highlight text" />
                    </Form.Item>
                    <div className="grid grid-cols-2 gap-4 items-start">
                      <Form.Item
                        {...field}
                        name={[field.name, 'order']}
                        label="Order"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <InputNumber className="w-full" min={1} />
                      </Form.Item>
                      <Form.Item label="Icon (opsional)">
                        <Upload
                          listType="picture-card"
                          maxCount={1}
                          fileList={featureIcons[field.name] || []}
                          onChange={({ fileList }) =>
                            setFeatureIcons((prev) => ({
                              ...prev,
                              [field.name]: fileList,
                            }))
                          }
                          beforeUpload={() => false}
                        >
                          <div>
                            <UploadOutlined />
                            <div className="mt-2">Upload</div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </div>
                  </Card>
                ))}
                <Button type="dashed" icon={<PlusCircleOutlined />} onClick={() => add()} block>
                  Tambah Feature
                </Button>
              </div>
            )}
          </Form.List>

          <Divider>Store Variants</Divider>
          <Form.List name="productStore">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field) => (
                  <Card
                    key={field.key}
                    size="small"
                    title={`Variant ${field.name + 1}`}
                    extra={
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    }
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'name']}
                      label="Variant Name"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="110 ML" />
                    </Form.Item>

                    <Form.List name={[field.name, 'stores']}>
                      {(storeFields, { add: addStore, remove: removeStore }) => (
                        <div className="space-y-2">
                          {storeFields.map((storeField) => (
                            <div
                              key={storeField.key}
                              className="grid grid-cols-2 gap-3 items-end"
                            >
                              <Form.Item
                                {...storeField}
                                name={[storeField.name, 'name']}
                                label="Store"
                                rules={[{ required: true, message: 'Required' }]}
                              >
                                <Input placeholder="Tokopedia" />
                              </Form.Item>
                              <div className="flex items-center gap-2">
                                <Form.Item
                                  {...storeField}
                                  name={[storeField.name, 'urlStore']}
                                  label="URL"
                                  className="flex-1"
                                  rules={[{ required: true, message: 'Required' }]}
                                >
                                  <Input placeholder="https://tokopedia.com/..." />
                                </Form.Item>
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => removeStore(storeField.name)}
                                />
                              </div>
                            </div>
                          ))}
                          <Button
                            type="dashed"
                            icon={<PlusCircleOutlined />}
                            onClick={() => addStore()}
                          >
                            Tambah Store
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  icon={<PlusCircleOutlined />}
                  onClick={() => add()}
                  block
                >
                  Tambah Variant
                </Button>
              </div>
            )}
          </Form.List>

          <Divider>Documents</Divider>
          <Form.List name="productDocument">
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map((field) => (
                  <div key={field.key} className="grid grid-cols-2 gap-3 items-end">
                    <Form.Item
                      {...field}
                      name={[field.name, 'type']}
                      label="Type"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Select placeholder="Pilih tipe">
                        <Select.Option value="MSDS">MSDS</Select.Option>
                        <Select.Option value="TDS">TDS</Select.Option>
                      </Select>
                    </Form.Item>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  icon={<PlusCircleOutlined />}
                  onClick={() => add()}
                  block
                >
                  Tambah Dokumen
                </Button>
              </div>
            )}
          </Form.List>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Primary Image">
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={primaryImageList}
                onChange={({ fileList }) => setPrimaryImageList(fileList)}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item label="Additional Images">
              <Upload
                listType="picture-card"
                multiple
                fileList={imagesList}
                onChange={({ fileList }) => setImagesList(fileList)}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item label="Documents">
            <Upload
              multiple
              fileList={documentList}
              onChange={({ fileList }) => setDocumentList(fileList)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Documents</Button>
            </Upload>
          </Form.Item>

          <Divider />
          <Space>
            <Button onClick={() => router.push('/admin/products')}>Cancel</Button>
            <Button
              type="primary"
              loading={loading}
              onClick={handleSubmit}
              className="bg-green-600"
            >
              Create Product
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
}
