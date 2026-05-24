import { databases, APPWRITE_CONFIG, Query } from '../lib/appwrite';

export interface OrderItem {
    product_id: string;
    product_title: string;
    product_image: string;
    product_price: number;
    quantity: number;
    variant_id?: string;
}

export interface ShippingAddress {
    full_name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Order {
    $id: string;
    user_id: string;
    items: OrderItem[];
    shipping_address: ShippingAddress;
    payment_method: string;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at?: string;
}

export const createOrder = async (
    userId: string,
    items: OrderItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    subtotal: number,
    tax: number,
    shipping: number = 0
): Promise<Order> => {
    const total = subtotal + tax + shipping;

    try {
        const response = await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.ordersCollectionId,
            'unique()',
            {
                user_id: userId,
                items: JSON.stringify(items),
                shipping_address: JSON.stringify(shippingAddress),
                payment_method: paymentMethod,
                subtotal,
                tax,
                shipping,
                total,
                status: 'pending',
                created_at: new Date().toISOString()
            }
        );
        return response as unknown as Order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

const parseOrder = (doc: any): Order => ({
    ...doc,
    items: typeof doc.items === 'string' ? JSON.parse(doc.items) : doc.items,
    shipping_address: typeof doc.shipping_address === 'string' ? JSON.parse(doc.shipping_address) : doc.shipping_address,
});

export const getUserOrders = async (userId: string) => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.ordersCollectionId,
            [Query.equal("user_id", userId)]
        );
        return response.documents.map(parseOrder) as unknown as Order[];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (orderId: string) => {
    try {
        const response = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.ordersCollectionId,
            orderId
        );
        return parseOrder(response) as unknown as Order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const updateOrderStatus = async (
    orderId: string,
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
    paymentDetails?: {
        razorpay_order_id?: string;
        razorpay_payment_id?: string;
        payment_id?: string;
    }
) => {
    try {
        const updates: any = {
            status,
            updated_at: new Date().toISOString()
        };

        if (paymentDetails) {
            if (paymentDetails.razorpay_order_id) updates.razorpay_order_id = paymentDetails.razorpay_order_id;
            if (paymentDetails.razorpay_payment_id) updates.razorpay_payment_id = paymentDetails.razorpay_payment_id;
            if (paymentDetails.payment_id) updates.payment_id = paymentDetails.payment_id;
        }

        const response = await databases.updateDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.ordersCollectionId,
            orderId,
            updates
        );
        return response;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

export const cancelOrder = async (orderId: string, userId: string) => {
    try {
        const order = await getOrderById(orderId);
        
        if (order.user_id !== userId) {
            throw new Error('Order not found or cannot be cancelled');
        }

        if (order.status !== 'pending') {
            throw new Error('Order cannot be cancelled');
        }

        const response = await databases.updateDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.ordersCollectionId,
            orderId,
            {
                status: 'cancelled',
                updated_at: new Date().toISOString()
            }
        );
        return response;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw error;
    }
};

export const getOrderStats = async () => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.ordersCollectionId,
            [Query.limit(5000)]
        );
        const orders = response.documents.map(parseOrder) as unknown as Order[];
        
        const stats = {
            total: orders.length,
            pending: orders.filter(o => o.status === 'pending').length,
            confirmed: orders.filter(o => o.status === 'confirmed').length,
            shipped: orders.filter(o => o.status === 'shipped').length,
            delivered: orders.filter(o => o.status === 'delivered').length,
            cancelled: orders.filter(o => o.status === 'cancelled').length,
            totalRevenue: orders
                .filter(o => o.status !== 'cancelled')
                .reduce((sum, o) => sum + (o.total || 0), 0)
        };

        return stats;
    } catch (error) {
        console.error('Error fetching order stats:', error);
        throw error;
    }
};