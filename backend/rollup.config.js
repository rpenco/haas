export default {
  input: './src/application.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  external: ['express', 'body-parser', 'crypto-js', 'crypto-js/md5', 'crypto-js/sha1', 'crypto-js/sha256', 'redis']
}