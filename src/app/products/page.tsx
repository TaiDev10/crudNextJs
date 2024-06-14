"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export function formatCurrency(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function Page() {
  // const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3000/api/products");
      const products = await res.json();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Card className="m-3 p-3">
      <CardHeader>
        <h2 className="text-4xl text-center font-semibold">Danh sách sản phẩm</h2>
        <div className="text-end">
          <Link href="/products/new">
            <Button className="w-[140px] bg-blue-500">Thêm sản phẩm</Button>
          </Link>
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 &&
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}đ</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="space-x-1">
                <Link href={`products/${product._id}`}>
                  <Button 
                    
                    className="bg-blue-500"
                  >
                    
                    <MdEdit size={20}/>
                  </Button>
                </Link>
                  <Button 
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-400"
                  >
                    <MdDelete size={20}/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
