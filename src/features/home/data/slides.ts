import { SliderImage } from "../types";


export const sliderImages: SliderImage[] = [
  {
    id: 1,
    imageSrc: "/home/modern-furniture-4461.jpg", // Replace with your actual image paths
    alt: "Modern living room",
    productHotspot: [
      { id: 1, name: "Nordic Chair", price: "$250", x: 30, y: 40, link: "" },
      { id: 2, name: "Minimal Table", price: "$180", x: 70, y: 40, link: "" },
    ],
  },
  // {
  //   id: 2,
  //   imageSrc: "/home/modern-furniture-4460.jpg",
  //   alt: "Contemporary bedroom",
  //   productHotspot: [
  //     { id: 3, name: "Modern Lamp", price: "$120", x: 25, y: 35, link: "" },
  //     { id: 4, name: "Designer Bed", price: "$850", x: 65, y: 50, link: "" },
  //   ],
  // },
];




// export const slides = [
//   {
//     imageUrl: '/home/modern-furniture-4461.jpg',
//     title: 'Make Your Interior More Minimalistic & Modern',
//     subtitle: 'Turn your room with panto into a lot more minimalist and modern with ease and speed',
//     hotspots: [
//       {
//         left: 10,
//         top: 80,
//         color: 'bg-orange-500',
//         product: {
//           name: 'Flower Vase',
//           description: 'Elegant ceramic vase for modern interiors.',
//           link: '/products/flower-vase',
//         },
//       },
//       {
//         left: 30,
//         top: 90,
//         color: 'bg-cyan-500',
//         product: {
//           name: 'Pillow',
//           description: 'Soft gray pillow for comfort.',
//           link: '/products/pillow',
//         },
//       },
//     ],
//   },
//   {
//     imageUrl: '/home/modern-furniture-4460.jpg',
//     title: 'Another Modern Design',
//     subtitle: 'Explore more modern interior solutions.',
//     hotspots: [
//       {
//         left: 20,
//         top: 70,
//         color: 'bg-green-500',
//         product: {
//           name: 'Sofa',
//           description: 'Stylish orange sofa.',
//           link: '/products/sofa',
//         },
//       },
//     ],
//   },
// ];