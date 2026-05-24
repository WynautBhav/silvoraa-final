export enum StoneType {
  AMETHYST = 'Amethyst',
  GARNET = 'Garnet',
  CITRINE = 'Citrine',
  IOLITE = 'Iolite',
  LAPIS = 'Lapis Lazuli',
  EMERALD = 'Emerald',
  CZ = 'Cubic Zirconia',
  TOURMALINE = 'Tourmaline',
  TOPAZ = 'Topaz',
  ROSE_QUARTZ = 'Rose Quartz',
  LABRADORITE = 'Labradorite',
  BLUE_TOPAZ = 'Blue Topaz',
  LEMON_TOPAZ = 'Lemon Topaz',
  SKY_BLUE_TOPAZ = 'Sky Blue Topaz',
  PERIDOT = 'Peridot',
  BLUE_SAPPHIRE = 'Blue Sapphire',
  ROSE_AMETHYST = 'Rose Amethyst', // Keep comma
  MOONSTONE = 'Moonstone',
  RUBY = 'Ruby',
  SAPPHIRE = 'Sapphire',
  TANZANITE = 'Tanzanite',
  AQUAMARINE = 'Aquamarine',
  TURQUOISE = 'Turquoise',
  PEARL = 'Pearl',
  ONYX = 'Onyx',
  MALACHITE = 'Malachite',
  OPAL = 'Opal',
  OTHER = 'Other'
}

export enum ProductType {
  RING = 'Ring',
  NECKLACE = 'Necklace',
  EARRINGS = 'Earrings',
  BRACELET = 'Bracelet',
  PENDANT = 'Pendant',
  NOSE_RING = 'Nose Ring'
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inventory: number;
  sku: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  description: string; // Legacy HTML
  description_text?: string; // New plain text description
  specifications?: Record<string, string>; // Key-value pairs
  care_guide?: string;
  stone_benefits?: string;
  style_note?: string;
  image: string;
  images: string[];
  type: ProductType;
  stone: StoneType;
  variants: ProductVariant[];
  tags: string[];
  benefits: string[];
  seoTitle?: string;
  seoDescription?: string;
  inventory?: number;
  related_product_ids?: string[];
  stylist_note?: string;
}

export interface StoneBenefit {
  id: string;
  benefit: string;
  stone: StoneType;
  description: string;
  imageOverlayDescription: string;
  imageUrl: string;
  filterParam: string;
  relatedStones?: StoneType[];
}

export interface CartItem {
  product: Product;
  variantId?: string;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- CONFIGURATION TYPES ---

export interface GlobalConfig {
  companyName: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
  };
  whatsapp: {
    number: string;
    defaultMessage: string;
    buttonPosition: 'bottom-right' | 'bottom-left';
    visibleOn: 'all' | 'product-pages-only';
  };
}

export interface HeroSlide {
  id: string;
  type: 'video' | 'image';
  src: string;
  mobileSrc?: string;
  bgColor?: string;
  fallbackImage?: string;
  overlay: {
    enabled: boolean;
    heading: string;
    subheading: string;
    ctaText?: string;
    ctaKicker?: string;
    link?: string;
    align?: 'left' | 'center' | 'right';
    layout?: 'default' | 'title-first' | 'subheading-bottom';
    headingColor?: string;
    headingFont?: string;
    subheadingFont?: string;
    pos?: {
      top: string;
      left: string;
      mTop: string;
      mLeft: string;
      translateX?: string;
      translateY?: string;
      mTranslateX?: string;
      mTranslateY?: string;
    };
    ctaPos?: {
      top: string;
      left: string;
      mTop: string;
      mLeft: string;
      translateX?: string;
      translateY?: string;
      mTranslateX?: string;
      mTranslateY?: string;
    };
  };
}

export interface HeroConfig {
  mode: 'video-carousel' | 'static' | 'split-screen';
  scrollSpeedDuration: number; // in seconds for full loop
  hoverBehavior: 'pause' | 'slow' | 'none';
  fullscreenOnFirstLoad: boolean; // New: 100vh on first session visit
  defaultHeight: string; // e.g. '70vh'
  timeline: {
    show: boolean;
    style: 'progress' | 'text';
    position: 'bottom-right' | 'bottom-center';
  };
  slides: HeroSlide[];
}

export interface NavItem {
  label: string;
  link: string;
  dropdown?: boolean;
}

export interface NavConfig {
  logo: {
    text: string;
  };
  scrollThreshold: number;
  pill: {
    maxWidth: string;
    backgroundOpacity: number;
    blur: number;
    saturate: number;
    borderRadius: number;
    shadowEnabled: boolean;
    shadow: string; // Added explicit shadow string control
  };
  padding: {
    top: { x: number; y: number };
    scrolled: { x: number; y: number };
  };
  mobile: {
    width: string;
    padding: { x: number; y: number };
    borderRadius: number;
  };
  animation: {
    duration: number;
    easing: string;
  };
  menuItems: NavItem[];
}

export interface MotionConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    premium: string;
    standard: string;
  };
}

// --- ORDER TYPES ---

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: string;
}

export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shipping_address: Address;
  tracking_number?: string;
  user?: {
    full_name: string;
    email: string;
  };
}

// --- MARKETING TYPES ---

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  value: number;
  min_order_amount: number;
  max_uses?: number;
  used_count: number;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
}