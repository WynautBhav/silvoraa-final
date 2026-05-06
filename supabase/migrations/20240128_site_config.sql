-- Create a table for site configuration
create table public.site_config (
  key text primary key,
  value text,
  section text, -- e.g., 'hero', 'footer', 'announcement'
  label text, -- human readable label
  type text default 'text', -- 'text', 'image', 'link', 'boolean'
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_by uuid references auth.users(id)
);

-- Turn on RLS
alter table public.site_config enable row level security;

-- Policies
create policy "Public can view config"
  on public.site_config for select
  using (true);

create policy "Admins can insert/update config"
  on public.site_config for all
  using (
    auth.jwt() ->> 'email' in (
      'vaibhav.silvoraa@gmail.com', 
      'sid.silvoraa@gmail.com'
    )
  );

-- Insert default values (Idempotent upsert)
insert into public.site_config (key, value, section, label, type) values
  ('hero_title', 'Ethical. Authentic. Timeless.', 'hero', 'Hero Title', 'text'),
  ('hero_subtitle', 'Handcrafted 925 Sterling Silver Jewelry with Certified Gemstones.', 'hero', 'Hero Subtitle', 'text'),
  ('hero_video_url', 'https://cdn.shopify.com/videos/c/o/v/fbb140b4904c4ad7a3523589b2db02cb.mp4', 'hero', 'Hero Video URL', 'text'),
  ('announcement_bar', 'Free Shipping on Orders Over ₹2000 | Lifetime Warranty', 'header', 'Announcement Text', 'text'),
  ('contact_email', 'support@silvoraa.com', 'footer', 'Contact Email', 'text'),
  ('contact_phone', '+91 98765 43210', 'footer', 'Contact Phone', 'text')
on conflict (key) do nothing;
