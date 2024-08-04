import { defineStore } from 'pinia'
import axios from "axios";
export const useProductStore = defineStore("productStore", () => {
    const cartProducts = ref([])
    const recommendationProducts = ref([])
    const favoriteProduct = ref([])

    const searchValue = ref('')

    const totalPriceCart = computed(() => {
        return cartProducts.value.reduce((sum, item) => sum + item.totalPrice, 0)
    })
    const searchValueOptions = computed(() => {
        return searchValue.value ? `title=*${searchValue.value}` : ''
    })

    const setSearchValue = (value) => {
        value = value.replace('*', '')
        searchValue.value = value
    }

    const clearSearchValue = () => {
        searchValue.value = ''
    }

    const fetchCartProduct = async () => {
        try {
            if(!cartProducts.value.length) {
                const {data} = await axios.get('https://43582820cabae20b.mokky.dev/cart');
                cartProducts.value = data.map(item => {
                    return {
                        ...item,
                        totalPrice: item.price * item.quantity
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFavoriteProduct = async () => {
        try {
            const {data} = await axios.get('https://43582820cabae20b.mokky.dev/favorite');
            favoriteProduct.value = data
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRecommendationProducts = async () => {
        try {
            const {data} = await axios.get('https://43582820cabae20b.mokky.dev/recommendations');
            recommendationProducts.value = data
        } catch (error) {
            console.log(error);
        }
    }

    const addedProductToCart =  (product) => {
        cartProducts.value.push({
            ...product,
            totalPrice: product.price * product.quantity
        })
    }

    const clearCart =  () => {
        cartProducts.value = []
    }

    return {
        cartProducts,
        recommendationProducts,
        favoriteProduct,
        searchValue,
        totalPriceCart,
        searchValueOptions,
        setSearchValue,
        clearSearchValue,
        fetchRecommendationProducts,
        fetchCartProduct,
        fetchFavoriteProduct,
        addedProductToCart,
        clearCart
    };
})
