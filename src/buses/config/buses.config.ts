import { registerAs } from '@nestjs/config';

export default registerAs('buses', () => ({
  // 👈
  foo: 'bar', // 👈
}));
