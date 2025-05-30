import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserGetOne } from "@/lib/query/user/useUserGetone";
import { ServiceUserUpdate } from "@/lib/services/users";
import { UtilsErrorService } from "@/lib/utils/errors";
import { UserSchema, type typeUserUpdate } from "@/schemas/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaIdCard, FaUserEdit } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useLocalStorage } from "react-use";
import Swal from "sweetalert2";
import { LoadingProfile } from "./Loading";

export const ProfileName = () => {
  const [token] = useLocalStorage("token", "");
  const queryClient = useQueryClient();

  const query = useUserGetOne(token!);

  const form = useForm<typeUserUpdate>({
    resolver: zodResolver(UserSchema.UPDATE),
  });

  const mutation = useMutation({
    mutationKey: ["userUpdateName"],
    mutationFn: (data: typeUserUpdate) => ServiceUserUpdate(token!, data),
  });

  const handleForm = form.handleSubmit((values: typeUserUpdate) => {
    if (!values.name || values.name === query.data.data.name) {
      Swal.fire({
        title: "There is no change in the name.",
        icon: "warning",
      });

      return;
    }
    mutation.mutate(values, {
      onSuccess: (data) => {
        Swal.fire({
          title: data.message,
          icon: "success",
          draggable: true,
        });

        queryClient.invalidateQueries({ queryKey: ["userGetOne"] });
      },

      onError: (err) => {
        Swal.fire({
          title: UtilsErrorService(err),
          icon: "error",
          draggable: true,
        });
      },
    });
  });

  if (query.isLoading || query.isError) return <LoadingProfile />;

  return (
    <Card
      data-aos="fade-down"
      data-aos-duration="800"
      className="p-5 bg-gray-800"
    >
      <h3 className="flex items-center gap-2 text-white">
        <span className="bg-white rounded-full p-2">
          <FaUserEdit className="text-gray-800" />
        </span>{" "}
        Edit Profile
      </h3>

      <Form {...form}>
        <form onSubmit={handleForm} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <div className="relative">
                    <IoPerson className="text-sm absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Example..."
                        defaultValue={query.data.data.name}
                        className="pl-8 border border-white/20 bg-gray-700 text-white"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full flex items-center bg-green-500 text-gray-800 hover:text-white group"
          >
            <FaIdCard className="text-gray-800 group-hover:text-white mt-px" />{" "}
            Update Profile
          </Button>
        </form>
      </Form>
    </Card>
  );
};
