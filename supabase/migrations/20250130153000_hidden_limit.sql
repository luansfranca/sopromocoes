/*
  # Initial Schema Setup for LuanStore

  1. New Tables
    - `products`
      - Basic product information (title, description, prices, etc.)
      - View/like/share counters
      - Featured status flag
      - Marketplace information
    - `categories`
      - Product categories with icons
    - `user_reviews`
      - Store user reviews and ratings
    
  2. Security
    - Enable RLS on all tables
    - Public read access
    - Admin write access
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  original_price decimal(10,2) NOT NULL,
  sale_price decimal(10,2) NOT NULL,
  discount_percentage integer GENERATED ALWAYS AS (
    ROUND((1 - sale_price / original_price) * 100)
  ) STORED,
  image_url text NOT NULL,
  marketplace_name text NOT NULL,
  marketplace_icon text NOT NULL,
  product_url text NOT NULL,
  views_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  category_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

-- Create user reviews table
CREATE TABLE user_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on products"
  ON products FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on user_reviews"
  ON user_reviews FOR SELECT TO public USING (true);

-- Insert default categories
INSERT INTO categories (name, icon, slug) VALUES
  ('Smartphone', 'smartphone', 'smartphone'),
  ('Eletrônicos', 'cpu', 'eletronicos'),
  ('Games', 'gamepad-2', 'games'),
  ('Roupas', 'shirt', 'roupas'),
  ('Acessórios', 'watch', 'acessorios'),
  ('Notebooks', 'laptop', 'notebooks'),
  ('Câmeras', 'camera', 'cameras'),
  ('Livros', 'book-open', 'livros'),
  ('Saúde e Beleza', 'heart', 'saude-beleza');