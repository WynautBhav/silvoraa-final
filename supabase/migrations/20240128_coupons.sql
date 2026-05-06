-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

-- RLS Policies
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow read access to all (for validating codes at checkout)
CREATE POLICY "Allow public read access" ON coupons FOR SELECT USING (true);

-- Allow full access to authenticated admins (implied by service role or specific admin logic, 
-- but for simplicity in this project we often allow auth users or specific emails. 
-- For now, letting auth users manage, or we can restrict to specific emails if security rules are tight)
CREATE POLICY "Allow admin full access" ON coupons FOR ALL USING (auth.role() = 'authenticated');
