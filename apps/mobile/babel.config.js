module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './',
          '@/components': './components',
          '@/features': './features',
          '@/hooks': './hooks',
          '@/lib': './lib',
          '@/providers': './providers',
          '@/types': './types',
        },
      }],
      'react-native-reanimated/plugin',
    ],
  };
};
