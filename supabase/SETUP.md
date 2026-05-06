# Supabase Setup Guide for Silvoraa

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Enter project details:
   - **Name:** `silvoraa`
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to your users (e.g., Mumbai for India)
4. Wait for the project to be created (~2 minutes)

## Step 2: Get Your API Keys

1. Go to **Settings** → **API** in your project dashboard
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

3. Update your `.env.local` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 3: Run the Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or Ctrl+Enter)

This will create:
- `products` table
- `profiles` table
- `orders` table
- `wishlist` table
- Row Level Security policies
- Auto-triggers for timestamps and profile creation

## Step 4: Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Find "Google" and enable it
3. You'll need to create OAuth credentials in Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or use existing
   - Go to APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

## Step 5: Migrate Products

To migrate your existing products from `constants.ts` to Supabase:

1. Run the migration script (I'll create this next)
2. Or manually add products via Supabase Table Editor

## Step 6: Setup Razorpay (for Payments)

1. Go to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Create an account or login
3. Go to Settings → API Keys
4. Generate Test Keys first (for development)
5. Add to `.env.local`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

## Verification Checklist

- [ ] Supabase project created
- [ ] API keys added to `.env.local`
- [ ] Schema SQL executed successfully
- [ ] Tables visible in Table Editor
- [ ] (Optional) Google OAuth configured
- [ ] (Optional) Razorpay test keys added

## Next Steps

Once setup is complete, the website will:
1. ✅ Auth: Real login/signup via Supabase
2. ✅ Products: Fetched from database (not hardcoded)
3. ✅ Orders: Saved to database
4. ✅ Wishlist: Synced across devices
5. ✅ Payments: Process via Razorpay (when integrated)
