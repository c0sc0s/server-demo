import { z } from "zod";

export const getUserParams = z.object({
  id: z.string().regex(/^[0-9]+$/),
});

export const getUserDraftsParams = z.object({
  id: z.string().regex(/^[0-9]+$/),
});

export const signupBody = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

// 导出推导的类型
export type GetUserParams = z.infer<typeof getUserParams>;
export type GetUserDraftsParams = z.infer<typeof getUserDraftsParams>;
export type SignupBody = z.infer<typeof signupBody>;
