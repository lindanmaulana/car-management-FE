import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBrandGetOne } from "@/lib/query/brand/useBrandGetOne";
import { ServiceBrand } from "@/lib/services/brands";
import { UtilsErrorService } from "@/lib/utils/errors";
import { BrandSchema, type typeBrandUpdateSchema } from "@/schemas/brands";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";
import Swal from "sweetalert2";

interface BrandUpdateProps {
  id: string;
  token: string;
}
export const BrandUpdate = ({ id, token }: BrandUpdateProps) => {
  const query = useBrandGetOne(id);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<typeBrandUpdateSchema>({
    resolver: zodResolver(BrandSchema.UPDATE),
  });

  const mutation = useMutation({
    mutationKey: ["brandUpdate"],
    mutationFn: (data: typeBrandUpdateSchema) =>
      ServiceBrand.update(token, id, data),
  });

  const handleForm = form.handleSubmit((values: typeBrandUpdateSchema) => {
    setOpen(false);

    mutation.mutate(values, {
      onSuccess: (data) => {
        Swal.fire({
          title: data.message,
          icon: "success",
        });

        form.reset();
        queryClient.invalidateQueries({ queryKey: ["brandGetAll"] });
      },

      onError: (err) => {
        Swal.fire({
          title: UtilsErrorService(err),
          icon: "error",
        });

        form.reset();
      },
    });
  });

  if (query.isLoading || query.isError) return <p>Loading...</p>;

  const handleOpenDialog = () => {
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger className="text-xl text-green-500">
        <GoPencil />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Update Brand</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        defaultValue={""}
                        type="text"
                        placeholder="Example..."
                        className="border border-gray-400 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        defaultValue={""}
                        type="text"
                        placeholder="Example..."
                        className="border border-gray-400 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="reset"
                variant={"ghost"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
