/** @type {import('next').NextConfig} */

const nextConfig = {
    // in here we specify images that are allowed to use in the application
    // refer to more 3:17 => https://www.youtube.com/watch?v=IU_qq_c_lKA&t=329s 
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.srilankabusiness.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;


// docs : https://nextjs.org/docs/messages/next-image-unconfigured-host
// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'www.srilankabusiness.com',
//           port: '',
//           pathname: '/**',
//         },
//       ],
//     },
//   }