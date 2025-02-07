import React from 'react';
import { ThumbsUp, Eye, Instagram, Twitter } from 'lucide-react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  description: string;
  original_price: number;
  sale_price: number;
  discount_percentage: number;
  image_url: string;
  marketplace_name: string;
  marketplace_icon: string;
  product_url: string;
  views_count: number;
  likes_count: number;
}

interface ProductCarouselProps {
  products: Product[];
  darkMode: boolean;
}

export function ProductCarousel({ products, darkMode }: ProductCarouselProps) {
  const shareOnSocial = (platform: string, product: Product) => {
    const shareText = encodeURIComponent(`Confira esta oferta incrível: ${product.title}\n${product.product_url}`);
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${shareText}`,
      twitter: `https://twitter.com/intent/tweet?text=${shareText}`,
      instagram: `https://instagram.com/share?url=${encodeURIComponent(product.product_url)}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    toast.success(`Compartilhado no ${platform}!`);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
      className="product-carousel"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} h-full`}>
            <div className="relative group">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img
                  src={product.marketplace_icon}
                  alt={product.marketplace_name}
                  className="w-6 h-6 rounded-full"
                />
                <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.marketplace_name}
                </span>
              </div>
              
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'} text-lg`}>
                {product.title}
              </h3>
              
              <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {product.description}
              </p>
              
              <div className="mb-4">
                <span className="line-through text-gray-500 font-bold">
                  R$ {product.original_price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  <span className={`text-xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-500'}`}>
                    R$ {product.sale_price.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                    -{product.discount_percentage}%
                  </span>
                </div>
              </div>
              
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ver Oferta
              </a>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <button className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{product.views_count}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{product.likes_count}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => shareOnSocial('instagram', product)}
                    className="text-pink-500 hover:text-pink-600"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => shareOnSocial('whatsapp', product)}
                    className="text-green-500 hover:text-green-600"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => shareOnSocial('twitter', product)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}