import { describe, expect, it } from 'vitest'
import { addItemToCart, emptyCart, removeItemFromCart, updateCartQuantity } from './CartUtils'

const mockEvent = {
    id: 1,
    title: "mock event"
} as any;

const mockEvent2 = {
    id: 2,
    title: "mock event nr.2"
} as any;

describe('CartUtils.tsx', () => {
    it('should add event to empty cart', () => {
        const result = addItemToCart(
            [],
            mockEvent,
            2
        );

        expect(result).toHaveLength(1)
        expect(result[0].quantity).toBe(2)
        expect(result[0].event.id).toBe(1)
    });

    it('should increase quantity for existing event', () => {
        const cart = [
            {
                event: mockEvent,
                quantity: 2
            }
        ];

        const result = addItemToCart(
            cart,
            mockEvent,
            3
        );

        expect(result).toHaveLength(1)
        expect(result[0].quantity).toBe(5)
    })

    it('should remove item from cart', () => {
        const cart = [
            {
                event: mockEvent,
                quantity: 2
            },
            {
                event: mockEvent2,
                quantity: 3
            }
        ];

        const result = removeItemFromCart(
            cart,
            2
        );

        expect(result).toHaveLength(1)
        expect(result[0].quantity).toBe(2)
        expect(result[0].event.id).toBe(1)
    })

    it('should update quantity', () => {
        const cart = [
            {
                event: mockEvent,
                quantity: 2
            }
        ];

        const result = updateCartQuantity(
            cart,
            1,
            8
        );

        expect(result).toHaveLength(1)
        expect(result[0].quantity).toBe(8)
    })

    it('should remove item when quantity becomes zero', () => {
        const cart = [
            {
                event: mockEvent,
                quantity: 2
            }
        ];

        const result = updateCartQuantity(
            cart,
            1,
            0
        );

        expect(result).toHaveLength(0)
    })

    it('should clear a cart containing items', () => {
        const cart = [
            {
                event: mockEvent,
                quantity: 2
            },
            {
                event: mockEvent2,
                quantity: 3
            }
        ];

        expect(cart).toHaveLength(2)

        const result = emptyCart();

        expect(result).toEqual([])
    })

    it('should not change cart when updating unkown event', () => {
        const cart = [
            {
                event: mockEvent,
                quantity: 2
            }
        ];
        
        const result = updateCartQuantity(
            cart,
            999,
            5
        );

        expect(result).toEqual(cart)
    })
})