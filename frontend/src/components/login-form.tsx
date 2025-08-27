"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/queries/authQueries";
import type { LoginRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  
  const form = useForm<LoginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {isPending, mutate:login, error, isError} = useLogin();

  return (
      <div className="w-full min-w-sm max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => login(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input id="username" autoFocus {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" {...field} />
                </FormItem>
              )}
            />
            {form.formState.errors.username && (
              <div className="text-destructive text-sm">
                {form.formState.errors.username.message}
              </div>
            )}
            {form.formState.errors.password && (
              <div className="text-destructive text-sm">
                {form.formState.errors.password.message}
              </div>
            )}
            
            {isError && (
              <div className="text-destructive text-sm">{error.message}</div>
            )}
            
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
  );
}
