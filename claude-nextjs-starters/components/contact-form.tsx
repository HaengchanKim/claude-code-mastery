"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// 검증 규칙은 zod 스키마 한 곳에 두고, 폼 값 타입도 스키마에서 추론합니다.
const formSchema = z.object({
  name: z.string().trim().min(2, "이름은 2자 이상 입력하세요."),
  email: z.email("올바른 이메일 주소를 입력하세요."),
  message: z
    .string()
    .trim()
    .min(10, "메시지는 10자 이상 입력하세요.")
    .max(500, "메시지는 500자 이하로 입력하세요."),
})

type FormValues = z.infer<typeof formSchema>

// react-hook-form + zod + shadcn Field 조합 예제 (shadcn 공식 문서 패턴)
export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  // 예제라 서버 전송 없이 토스트만 띄웁니다. 실제로는 Server Action이나 Route Handler 호출로 바꾸세요.
  function onSubmit(values: FormValues) {
    toast.success(`${values.name}님, 메시지가 접수되었습니다.`)
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>이름</FieldLabel>
              <Input
                {...field}
                id={field.name}
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>이메일</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>메시지</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                rows={4}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          보내기
        </Button>
      </FieldGroup>
    </form>
  )
}
