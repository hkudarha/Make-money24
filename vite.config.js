
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:6050,
    allowedHosts:['adm.smartchainstudio.in','https://adm.smartchainstudio.in','www.adm.smartchainstudio.in','https://www.adm.smartchainstudio.in','admfashion.com','https://admfashion.com','www.admfashion.com','https://www.admfashion.com']
  },
  preview:{
    port:6050,
    allowedHosts:['adm.smartchainstudio.in','https://adm.smartchainstudio.in','www.adm.smartchainstudio.in','https://www.adm.smartchainstudio.in','admfashion.com','https://admfashion.com','www.admfashion.com','https://www.admfashion.com']
  }
})