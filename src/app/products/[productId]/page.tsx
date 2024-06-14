"use client";
import { Card } from "@/components/ui/card";
import type { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  price: z.string().min(2, {
    message: "vui lòng nhập giá sản phẩm",
  }),
  name: z.string().min(2, {
    message: "vui lòng nhập tên sản phẩm",
  }),
  description: z.string().min(2, {
    message: "vui lòng nhập mô tả sản phẩm",
  }),
});

const Page: NextPage = () => {
  const router = useRouter();
  const { productId } = useParams();

  const [product, setProduct] = useState<any | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/products/${productId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await res.json();
          setProduct(data);
          form.reset(data); // Cập nhật giá trị mặc định của form với dữ liệu sản phẩm
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [productId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      const response = await fetch(
        productId != 'new' ? `http://localhost:3000/api/products/${productId}` : 'http://localhost:3000/api/products',
        {
          method: productId != 'new' ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      router.push('/products');
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="m-4 p-3 w-[600px]">
        <h1 className="text-4xl font-semibold text-center">Sản phẩm</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập giá sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end space-x-2 m-3">
              <Button onClick={() => router.push('/products')} className="bg-red-500">Hủy</Button>
              <Button type="submit" className="bg-orange-400">
                {productId != 'new' ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
