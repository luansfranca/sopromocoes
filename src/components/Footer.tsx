import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { supabase } from '../lib/supabase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar_url: string;
}

interface FooterProps {
  darkMode: boolean;
}

export function Footer({ darkMode }: FooterProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('user_reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);
    
    setReviews(data?.map(review => ({
      ...review,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`
    })) || []);
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} pt-12 pb-6`}>
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Avaliações dos Usuários</h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div
                  className={`${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  } p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar_url}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <p>
            Copyright 2025 Todos os direitos reservados para{' '}
            <a
              href="https://braavostec.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              Braavos Tec
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}