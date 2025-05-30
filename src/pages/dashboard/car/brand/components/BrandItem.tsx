import { Card, CardContent } from "@/components/ui/card";
import { useBrandGetAll } from "@/lib/query/brand/useBrandGetAll";
import type { Brand } from "@/lib/types/brands";
import { useSearchParams } from "react-router";
import { BrandDelete } from "./BrandDelete";
import { BrandUpdate } from "./BrandUpdate";

interface BrandItemProps {
  token: string;
}
export const BrandItem = ({ token }: BrandItemProps) => {
  const [searchParams] = useSearchParams();

  const query = useBrandGetAll({ params: searchParams.toString() });

  if (query.isLoading || query.isError) return <p>Loading...</p>;

  return (
    <>
      {query.data?.data.map((brand: Brand) => (
        <Card key={brand._id} className="bg-gray-800 p-4">
          <CardContent className="flex flex-row items-center justify-between">
            <h2 className="text-white">{brand.name}</h2>
            <div className="flex items-center gap-2">
              <BrandUpdate key={brand._id} id={brand._id} token={token} />
              <BrandDelete id={brand._id} token={token} />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
