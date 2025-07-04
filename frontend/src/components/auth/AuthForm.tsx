/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import google from '@/assets/google.png'
import type { z } from "zod";
import { useForm, type ControllerRenderProps, type DefaultValues, type Path, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN, LOGIN_SUBTITLE, LOGIN_TITLE, REGISTER, REGISTER_SUBTITLE, REGISTER_TITLE } from "@/lib/constants";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";

interface AuthFormProps<T extends z.ZodType<any, any, any>> {
    formType: "LOGIN" | "REGISTER",
    schema: T,
    defaultValues: z.infer<T>,
    onSubmit: (data: z.infer<T>) => Promise<{ success: boolean }>
}

export default function AuthForm<T extends z.ZodType<any, any, any>>({
    formType,
    schema,
    defaultValues,
    onSubmit,
    ...props
}: AuthFormProps<T>) {
    type FormData = z.infer<T>
    const naviate = useNavigate()
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

    const form = useForm({
        defaultValues: defaultValues as DefaultValues<FormData>,
        resolver: zodResolver(schema)
    })

    const handleSubmit: SubmitHandler<FormData> = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        naviate('/')
    }

    const buttonText = formType === 'LOGIN' ? LOGIN : REGISTER

    return (
        <div className="flex flex-col gap-6" {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">{formType === 'LOGIN' ? LOGIN_TITLE : REGISTER_TITLE}</CardTitle>
                    <CardDescription>
                        {formType === 'LOGIN' ? LOGIN_SUBTITLE : REGISTER_SUBTITLE}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="flex flex-col gap-6">
                                {
                                    Object.keys(defaultValues).map(field => (
                                        <FormField
                                            key={field}
                                            control={form.control}
                                            name={field as Path<FormData>}
                                            render={({ field }: { field: ControllerRenderProps<FormData, Path<FormData>> }) => (
                                                <FormItem className="grid gap-3">
                                                    <FormLabel className="flex items-center gap-1 justify-between">
                                                        <div>
                                                            {field.name === 'phone' ? 'Phone Number' :
                                                                field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                                            <span className="text-red-600"> *</span>
                                                        </div>
                                                        {formType === 'LOGIN' && field.name === 'password' && <Link
                                                            to="#"
                                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                                        >
                                                            Forgot your password?
                                                        </Link>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                disabled={form.formState.isSubmitting}
                                                                placeholder={field.name === 'phone' ? '09924****' : '******'}
                                                                type={(field.name === 'password' || field.name === 'confirmPassword') && showPassword[field.name] ? 'text' : (field.name === 'password' || field.name === 'confirmPassword') ? 'password' : 'text'}
                                                                {...field}
                                                            />
                                                            {(field.name === 'password' || field.name === 'confirmPassword') && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setShowPassword(prev => ({
                                                                            ...prev,
                                                                            [field.name]: !prev[field.name]
                                                                        }))
                                                                    }
                                                                    className="absolute right-3 top-2.5 text-muted-foreground"
                                                                >
                                                                    {showPassword[field.name] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))
                                }
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        className="w-ful flex items-center gap-2 justify-center"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ?
                                            <>
                                                <Loader className="animate-spin w-4 h-4" />
                                                {buttonText === 'Login' ? 'Logging In...' : 'Creating...'}
                                            </>
                                            :
                                            buttonText
                                        }
                                    </Button>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link to='/' className="flex items-center gap-4">
                                            <img src={google} alt="Google" className="w-4 h-4" />
                                            {buttonText} with Google
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            {
                                formType === 'LOGIN' ?
                                    <div className="mt-4 text-center text-sm">
                                        Don&apos;t have an account?{" "}
                                        <Link to='/register' className="underline-offset-4 hover:underline font-bold">
                                            Register
                                        </Link>
                                    </div> :
                                    <div className="mt-4 text-center text-sm">
                                        Alreay have an account?{" "}
                                        <Link to="/login" className="underline-offset-4 hover:underline font-bold">
                                            Login
                                        </Link>
                                    </div>
                            }
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
