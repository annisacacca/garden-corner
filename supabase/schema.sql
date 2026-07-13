-- Community Scrapbook: Supabase schema
-- Run this in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.scrapbook_posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text not null check (char_length(caption) <= 200),
  category text not null check (
    category in ('sky', 'nature', 'frog', 'pets', 'music', 'photography', 'meme', 'quote', 'memory')
  ),
  mood text check (
    mood in ('happy', 'peaceful', 'inspired', 'sad', 'excited', 'calm')
  ),
  location text,
  anonymous_name text default 'Anonymous Visitor',
  created_at timestamptz not null default now()
);

create index if not exists scrapbook_posts_created_at_idx
  on public.scrapbook_posts (created_at desc);

alter table public.scrapbook_posts enable row level security;

-- Anyone can read posts (public scrapbook wall)
create policy "Public can view posts"
  on public.scrapbook_posts for select
  using (true);

-- Anyone can add a post (anonymous submissions), but not edit/delete others' posts
create policy "Public can insert posts"
  on public.scrapbook_posts for insert
  with check (
    char_length(caption) <= 200
  );

-- Storage bucket for images
insert into storage.buckets (id, name, public)
values ('scrapbook-images', 'scrapbook-images', true)
on conflict (id) do nothing;

create policy "Public can view scrapbook images"
  on storage.objects for select
  using (bucket_id = 'scrapbook-images');

create policy "Public can upload scrapbook images"
  on storage.objects for insert
  with check (
    bucket_id = 'scrapbook-images'
    and (metadata->>'size')::int < 8388608 -- 8MB limit
  );
