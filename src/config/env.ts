import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    ENABLE_API_MOCKING: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional(),
    APP_URL: z
      .string()
      .optional()
      .default(import.meta.env.VITE_APP_API_URL || 'http://192.168.50.219:9000'),
    APP_MOCK_API_PORT: z.string().optional().default('8080'),
    PUBLIC_MAIN_LOGIN: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith('VITE_APP_') || key === 'VITE_APP_API_URL') {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.\nThe following variables are missing or invalid:\n${Object.entries(parsedEnv.error.flatten().fieldErrors)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
