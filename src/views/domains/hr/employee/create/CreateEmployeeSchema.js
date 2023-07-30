import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(5),
  email: z.string().email(),
  avatar: z.any(),
  nik: z
    .string()
    .min(16)
    .max(16)
    .regex(
      RegExp(
        /(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/i
      )
    ),
  npwp: z
    .string()
    .regex(
      RegExp(/[\d]{2}[.]([\d]{3})[.]([\d]{3})[.][\d][-]([\d]{3})[.]([\d]{3})/i)
    ),
  gender: z.string().length(1),
  religion: z.string().min(1),
  phoneNumber: z.string().regex(RegExp(/^\d{3}-\d{4}-\d{4,5}$/i)),
  address: z.string().min(20).max(1000),
  birthDate: z
    .object({ startDate: z.string(), endDate: z.string() })
    .required({ startTime: true }),
  maritalStatus: z.string().min(1),
});

export const workInformationSchema = z.object({
  contractType: z.string().min(1),
  jobId: z.string().uuid(),
  roleId: z.string().uuid(),
});

export const emergencyInformation = z.object({
  emergencyFullName: z.string().min(5).max(100),
  emergencyPhoneNumber: z.string().regex(RegExp(/^\d{3}-\d{4}-\d{4,5}$/i)),
  emergencyRelation: z.string().min(1),
});
