import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.parasclotheemporium.app',
  appName: 'Paras Clothe Emporium',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
