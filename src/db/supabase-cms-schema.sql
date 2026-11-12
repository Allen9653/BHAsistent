-- =============================================================================
-- B&H ASSISTANT d.o.o. Zenica (www.bh-assistant.ba)
-- Production Supabase CMS Database Schema & Security Rules (RLS)
-- Target Admin Owner: alenjusufovic@yahoo.com
-- =============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. CMS TEXT BLOCKS (For in-place WYSIWYG & Inline page text editing)
-- -----------------------------------------------------------------------------
create table if not exists public.cms_text_blocks (
    key text primary key,
    value text not null,
    locale text not null default 'bs',
    category text default 'general',
    updated_at timestamptz not null default now(),
    updated_by text default 'alenjusufovic@yahoo.com'
);

comment on table public.cms_text_blocks is 'Key-value store for live in-place editable text blocks across www.bh-assistant.ba';

-- Trigger for auto-updating updated_at
create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp_cms_text_blocks on public.cms_text_blocks;
create trigger set_timestamp_cms_text_blocks
before update on public.cms_text_blocks
for each row
execute function public.trigger_set_timestamp();

-- -----------------------------------------------------------------------------
-- 2. CMS ARTICLES & NEWS ITEMS
-- -----------------------------------------------------------------------------
create table if not exists public.cms_articles (
    id text primary key,
    title text not null,
    slug text not null unique,
    category text not null default 'Softver & IT',
    author text not null default 'Alen Jusufović, Direktor & Softverski Inženjer',
    date text not null,
    excerpt text,
    content text not null,
    image_url text,
    video_url text,
    external_url text,
    cta_text text,
    tags text[] default array['B&H Assistant', 'IT'],
    published boolean not null default true,
    views integer default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table public.cms_articles is 'CMS articles, publications, press releases and news for B&H Assistant';

drop trigger if exists set_timestamp_cms_articles on public.cms_articles;
create trigger set_timestamp_cms_articles
before update on public.cms_articles
for each row
execute function public.trigger_set_timestamp();

-- -----------------------------------------------------------------------------
-- 3. CMS MEDIA & IMAGE REGISTRY
-- -----------------------------------------------------------------------------
create table if not exists public.cms_media (
    id uuid primary key default gen_random_uuid(),
    item_key text not null,
    item_type text not null default 'usluga', -- 'usluga' | 'proizvod' | 'clanak' | 'banner'
    file_name text not null,
    file_url text not null,
    mime_type text,
    file_size_bytes integer,
    width integer,
    height integer,
    created_at timestamptz not null default now()
);

create index if not exists idx_cms_media_item_key on public.cms_media(item_key);

-- -----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
alter table public.cms_text_blocks enable row level security;
alter table public.cms_articles enable row level security;
alter table public.cms_media enable row level security;

-- PUBLIC READ: Everyone can read published content and media
create policy "Public users can view text blocks"
    on public.cms_text_blocks for select
    using (true);

create policy "Public users can view published articles"
    on public.cms_articles for select
    using (published = true or auth.jwt()->>'email' = 'alenjusufovic@yahoo.com');

create policy "Public users can view media assets"
    on public.cms_media for select
    using (true);

-- ADMIN FULL ACCESS: Only authenticated administrator can insert/update/delete
create policy "Admin full access to text blocks"
    on public.cms_text_blocks for all
    using (
        auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com')
        or auth.jwt()->>'role' = 'service_role'
    )
    with check (
        auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com')
        or auth.jwt()->>'role' = 'service_role'
    );

create policy "Admin full access to articles"
    on public.cms_articles for all
    using (
        auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com')
        or auth.jwt()->>'role' = 'service_role'
    )
    with check (
        auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com')
        or auth.jwt()->>'role' = 'service_role'
    );

create policy "Admin full access to media"
    on public.cms_media for all
    using (
        auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com')
        or auth.jwt()->>'role' = 'service_role'
    )
    with check (
        auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com')
        or auth.jwt()->>'role' = 'service_role'
    );

-- -----------------------------------------------------------------------------
-- 5. SUPABASE STORAGE BUCKET CONFIGURATION (cms-media)
-- -----------------------------------------------------------------------------
-- In Supabase dashboard: Storage -> New Bucket: 'cms-media' (Public: true)
-- Storage policy SQL:
insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

create policy "Public read access to cms-media bucket"
on storage.objects for select
using (bucket_id = 'cms-media');

create policy "Admin upload access to cms-media bucket"
on storage.objects for insert
with check (
    bucket_id = 'cms-media'
    and (auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com') or auth.jwt()->>'role' = 'service_role')
);

create policy "Admin delete access to cms-media bucket"
on storage.objects for delete
using (
    bucket_id = 'cms-media'
    and (auth.jwt()->>'email' in ('alenjusufovic@yahoo.com', 'alen.jusufovic@skilledbridge.ba', 'alenj9653@gmail.com') or auth.jwt()->>'role' = 'service_role')
);
