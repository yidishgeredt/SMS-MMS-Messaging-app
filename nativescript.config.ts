import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.app',
  appPath: 'src',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    maxLogcatObjectSize: 2048,
    targetSdkVersion: 33, // This targets Android 13
    compileSdkVersion: 33, // This should match targetSdkVersion
  },
} as NativeScriptConfig;