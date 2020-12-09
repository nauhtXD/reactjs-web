/**
 *
 * MyStorage
 *
 */

const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'http://localhost:9000',
  port: 9000,
  useSSL: false,
  accessKey: 'thuanvt',
  secretKey: '09081999',
});

export default minioClient;
