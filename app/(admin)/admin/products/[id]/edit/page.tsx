'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Spin,
} from 'antd';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  HolderOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { getProduct, updateProduct, ProductDto, ProductForm } from '@/app/lib/product-client';
import { getImageUrl, getFileUrl } from '@/app/lib/image-utils';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { message } = App.useApp();
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [primaryImageList, setPrimaryImageList] = useState<UploadFile[]>([]);
  const [imagesList, setImagesList] = useState<UploadFile[]>([]);
  const [documentFiles, setDocumentFiles] = useState<Record<number, UploadFile[]>>({});
  const [featureIcons, setFeatureIcons] = useState<Record<number, UploadFile[]>>({});
  const [form] = Form.useForm();
  const [originalValues, setOriginalValues] = useState<any>(null);

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
        
        const initialValues = {
          name: data.name,
          description: data.description ?? '',
          urlYoutube: data.urlYoutube ?? '',
          color: data.color ?? '',
          productFeature: data.productFeature?.map((f) => ({
            text: f.text,
            order: f.order,
          })),
          productStore: data.productStore?.map((ps) => ({
            name: ps.name,
            stores: ps.productStore?.map((s) => ({ name: s.name, urlStore: s.urlStore })) ?? [],
          })) ?? [],
          productDocument: data.productDocument?.map((d) => ({ type: d.type })),
        };
        
        form.setFieldsValue(initialValues);
        setOriginalValues(initialValues);

        // Load existing primary image
        if (data.primaryImage) {
          setPrimaryImageList([
            {
              uid: '-1',
              name: data.primaryImage.split('/').pop() || 'primary-image',
              status: 'done',
              url: getImageUrl(data.primaryImage),
            },
          ]);
        }

        // Load existing images
        if (data.productImage && data.productImage.length > 0) {
          setImagesList(
            data.productImage.map((img, idx) => ({
              uid: `-${idx + 2}`,
              name: img.url.split('/').pop() || `image-${idx}`,
              status: 'done',
              url: getImageUrl(img.url),
            }))
          );
        }

        // Load existing documents
        if (data.productDocument && data.productDocument.length > 0) {
          const docs: Record<number, UploadFile[]> = {};
          data.productDocument.forEach((doc, idx) => {
            if (doc.file) {
              docs[idx] = [
                {
                  uid: `-doc-${idx}`,
                  name: doc.file.split('/').pop() || `${doc.type}-${idx}.pdf`,
                  status: 'done',
                  url: getFileUrl(doc.file),
                },
              ];
            }
          });
          setDocumentFiles(docs);
        }

        // Load existing feature icons
        if (data.productFeature && data.productFeature.length > 0) {
          const icons: Record<number, UploadFile[]> = {};
          data.productFeature.forEach((feature, idx) => {
            if (feature.icon) {
              icons[idx] = [
                {
                  uid: `-icon-${idx}`,
                  name: feature.icon.split('/').pop() || `icon-${idx}`,
                  status: 'done',
                  url: getImageUrl(feature.icon),
                },
              ];
            }
          });
          setFeatureIcons(icons);
        }
      } catch (error) {
        const err = error as Error;
        message.error(err.message || 'Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, form, message]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      // Only include new primary image (has originFileObj)
      const newPrimaryImage = primaryImageList.find((file) => file.originFileObj);
      const primaryImage = newPrimaryImage?.originFileObj as File | undefined;

      // Only include new images (have originFileObj)
      const images = imagesList
        .filter((file) => file.originFileObj)
        .map((file) => file.originFileObj)
        .filter(Boolean) as File[];

      // Only include new documents (have originFileObj)
      const documents = Object.values(documentFiles)
        .flat()
        .filter((file) => file.originFileObj)
        .map((file) => file.originFileObj)
        .filter(Boolean) as File[];

      // Build payload with only changed fields
      const payload: Partial<ProductForm> = {};
      
      if (values.name !== originalValues.name) {
        payload.name = values.name;
      }
      
      if (values.description !== originalValues.description) {
        payload.description = values.description || undefined;
      }
      
      if (values.urlYoutube !== originalValues.urlYoutube) {
        payload.urlYoutube = values.urlYoutube || undefined;
      }
      
      if (values.color !== originalValues.color) {
        payload.color = values.color || undefined;
      }

      // Check if productFeature changed (text or order)
      const featuresChanged = JSON.stringify(values.productFeature) !== JSON.stringify(originalValues.productFeature);
      
      // Check if any feature icons changed (new uploads)
      const iconFilesChanged = values.productFeature?.some((_: unknown, idx: number) => {
        const iconFile = featureIcons[idx]?.[0];
        return iconFile?.originFileObj;
      });

      if (featuresChanged || iconFilesChanged) {
        payload.productFeature = values.productFeature?.map((f: any) => ({
          text: f.text,
          order: Number(f.order),
        }));
      }

      // Check if productStore changed
      const storesChanged = JSON.stringify(values.productStore) !== JSON.stringify(originalValues.productStore);
      if (storesChanged) {
        payload.productStore = values.productStore?.map((ps: any) => ({
          name: ps.name,
          stores: ps.stores?.map((s: any) => ({ name: s.name, urlStore: s.urlStore })) ?? [],
        }));
      }

      // Check if productDocument changed
      const documentsChanged = JSON.stringify(values.productDocument) !== JSON.stringify(originalValues.productDocument);
      if (documentsChanged) {
        payload.productDocument = values.productDocument?.map((d: any) => ({ type: d.type }));
        
        // Validate that each document has a file
        if (payload.productDocument && payload.productDocument.length > 0) {
          const missingDocs = payload.productDocument.some((_: any, idx: number) => {
            const docFile = documentFiles[idx]?.[0];
            return !docFile || (!docFile.originFileObj && !docFile.url);
          });
          
          if (missingDocs) {
            message.error('Setiap tipe dokumen harus memiliki file');
            setSaving(false);
            return;
          }
        }
      }

      // Collect icon files only if features changed
      let iconFiles: File[] | undefined = undefined;
      if (payload.productFeature) {
        const allFeatureHasIcon = payload.productFeature.every((_: unknown, idx: number) => {
          const iconFile = featureIcons[idx]?.[0];
          return iconFile && (iconFile.originFileObj || iconFile.url);
        });

        if (allFeatureHasIcon) {
          try {
            // Convert all icons to File objects (download existing ones if needed)
            iconFiles = await Promise.all(
              payload.productFeature.map(async (_: unknown, idx: number) => {
                const iconFile = featureIcons[idx]?.[0];
                if (!iconFile) return null;

                // If it's a new upload, use the file directly
                if (iconFile.originFileObj) {
                  return iconFile.originFileObj as File;
                }

                // If it's an existing file, fetch it and convert to File
                if (iconFile.url) {
                  try {
                    const response = await fetch(iconFile.url);
                    if (!response.ok) {
                      throw new Error(`Failed to fetch icon: ${response.statusText}`);
                    }
                    const blob = await response.blob();
                    const fileName = iconFile.name || `icon-${idx}.png`;
                    return new File([blob], fileName, { type: blob.type || 'image/png' });
                  } catch (error) {
                    console.error(`Failed to fetch icon at index ${idx}:`, error);
                    throw new Error(`Gagal memuat icon untuk feature ${idx + 1}`);
                  }
                }

                return null;
              })
            ).then(files => files.filter(Boolean) as File[]);
          } catch (error) {
            const err = error as Error;
            message.error(err.message || 'Gagal memproses icon');
            setSaving(false);
            return;
          }
        }
      }

      // Only send if there are changes
      if (Object.keys(payload).length === 0 && !primaryImage && images.length === 0 && documents.length === 0) {
        message.info('Tidak ada perubahan untuk disimpan');
        setSaving(false);
        return;
      }

      await updateProduct(productId, payload, {
        primaryImage: primaryImage ?? null,
        images,
        documents,
        icons: iconFiles,
      });

      message.success('Produk berhasil diperbarui');
      router.push('/admin/products');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'Gagal menyimpan produk');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Product not found</p>
        <Button type="primary" onClick={() => router.push('/admin/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

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
            {(fields, { add, remove, move }) => {
              const updateOrder = () => {
                const features = form.getFieldValue('productFeature') || [];
                features.forEach((feature: any, idx: number) => {
                  feature.order = idx + 1;
                });
                form.setFieldsValue({ productFeature: features });
              };

              return (
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <HolderOutlined
                        className="cursor-move text-gray-400 hover:text-gray-600 flex-shrink-0"
                        style={{ fontSize: '20px' }}
                      />
                      
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-shrink-0">
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
                            className="feature-icon-upload"
                          >
                            {!featureIcons[field.name]?.length && (
                              <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 4, fontSize: '12px' }}>Icon</div>
                              </div>
                            )}
                          </Upload>
                        </div>

                        <Form.Item
                          {...field}
                          name={[field.name, 'text']}
                          rules={[{ required: true, message: 'Isi text feature' }]}
                          className="mb-0 flex-1"
                        >
                          <Input 
                            placeholder={`Feature ${index + 1} text...`}
                            size="large"
                          />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, 'order']}
                          hidden
                          initialValue={index + 1}
                        >
                          <InputNumber />
                        </Form.Item>
                      </div>

                      <Space className="flex-shrink-0">
                        {index > 0 && (
                          <Button
                            type="text"
                            icon={<span style={{ fontSize: '16px' }}>↑</span>}
                            onClick={() => {
                              move(index, index - 1);
                              setTimeout(updateOrder, 0);
                            }}
                            title="Pindah ke atas"
                          />
                        )}
                        {index < fields.length - 1 && (
                          <Button
                            type="text"
                            icon={<span style={{ fontSize: '16px' }}>↓</span>}
                            onClick={() => {
                              move(index, index + 1);
                              setTimeout(updateOrder, 0);
                            }}
                            title="Pindah ke bawah"
                          />
                        )}
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => {
                            remove(field.name);
                            setTimeout(updateOrder, 0);
                          }}
                          title="Hapus feature"
                        />
                      </Space>
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                      add({ text: '', order: fields.length + 1 });
                    }}
                    block
                    size="large"
                  >
                    Tambah Feature
                  </Button>
                </div>
              );
            }}
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
                  <Card key={field.key} size="small">
                    <div className="grid grid-cols-2 gap-4">
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
                      <Form.Item label="File">
                        <Upload
                          maxCount={1}
                          fileList={documentFiles[field.name] || []}
                          onChange={({ fileList }) =>
                            setDocumentFiles((prev) => ({
                              ...prev,
                              [field.name]: fileList,
                            }))
                          }
                          beforeUpload={() => false}
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </div>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        remove(field.name);
                        setDocumentFiles((prev) => {
                          const newDocs = { ...prev };
                          delete newDocs[field.name];
                          return newDocs;
                        });
                      }}
                      block
                    >
                      Hapus Dokumen
                    </Button>
                  </Card>
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
                listType="picture"
                maxCount={1}
                fileList={primaryImageList}
                onChange={({ fileList }) => setPrimaryImageList(fileList)}
                beforeUpload={() => false}
              >
                <Button icon={primaryImageList.length ? <EditOutlined /> : <PlusOutlined />} />
              </Upload>
            </Form.Item>

            <Form.Item label="Additional Images">
              <Upload
                listType="picture"
                multiple
                fileList={imagesList}
                onChange={({ fileList }) => setImagesList(fileList)}
                beforeUpload={() => false}
              >
                <Button icon={<PlusOutlined />} />
              </Upload>
            </Form.Item>
          </div>



          <Divider />
          <Space>
            <Button onClick={() => router.push('/admin/products')}>Cancel</Button>
            <Button
              type="primary"
              loading={saving}
              onClick={handleSubmit}
              className="bg-green-600"
            >
              Update Product
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
}
