<template>
  <section class="banner">
    <div class="container">
      <h1 class="banner__title">All products</h1>
    </div>
  </section>
  <section class="catalog">
    <div class="container">
      <the-loader v-if="isLoader"/>
      <div v-else class="catalog__container">
        <button @click="handlerFilterActive" class="catalog__filter-btn btn">Filters</button>
        <div :class="{active: isFilterActive}" class="catalog__filter">
          <button @click="handlerFilterActive" class="catalog__filter-close"></button>
          <div class="catalog__filter-block">
            <div class="catalog__filter-block__top">
              <p class="catalog__filter-title">Product type</p>
            </div>
            <div class="catalog__filter-container">
              <div
                  v-for="item in filterData.type"
                  :key="item.id"
                  class="catalog__filter-item">
                <input
                    v-model="filter.type"
                    @change="fetchFiltersProducts"
                    type="checkbox"
                    :value="`${item.name}`"
                    name="type"
                    class="catalog__filter-item__input"
                    :id="`type-${item.id}`"
                >
                <label
                    class="catalog__filter-item__label"
                    :class="{inactive: !item.active || isLoaderFilters}"
                    :for="`type-${item.id}`">{{item.name}}
                </label>
              </div>
            </div>
          </div>
          <div class="catalog__filter-block">
            <div class="catalog__filter-block__top">
              <p class="catalog__filter-title">Price</p>
            </div>
            <div class="catalog__filter-container">
              <div
                  v-for="item in filterData.price"
                  :key="item.id"
                  class="catalog__filter-item">
                <input
                    v-model="filter.price"
                    @change="fetchFiltersProducts"
                    type="radio"
                    :id="`price-${item.id}`"
                    :value="`${item.value}`"
                    name="price"
                    class="catalog__filter-item__input">
                <label
                    class="catalog__filter-item__label"
                    :class="{inactive: !item.active || isLoaderFilters}"
                    :for="`price-${item.id}`">{{item.name}}</label>
              </div>
            </div>
          </div>
          <div class="catalog__filter-block">
            <div class="catalog__filter-block__top">
              <p class="catalog__filter-title">Designer</p>
            </div>

            <div class="catalog__filter-container">
              <div
                  v-for="item in filterData.designer"
                  :key="item.id"
                  class="catalog__filter-item">
                <input
                    v-model="filter.designer"
                    @change="fetchFiltersProducts"
                    type="checkbox"
                    :value="`${item.name}`"
                    name="des"
                    class="catalog__filter-item__input"
                    :id="`des-${item.id}`">
                <label
                    class="catalog__filter-item__label"
                    :class="{inactive: !item.active || isLoaderFilters}"
                    :for="`des-${item.id}`">
                  {{item.name}}
                </label>
              </div>
            </div>
          </div>
          <div class="catalog__filter-block">
            <div class="catalog__filter-block__top">
              <button @click="clearFilters" class="btn btn--dark">Clear filters</button>
            </div>
          </div>
        </div>
        <div class="catalog__right">
          <h2 v-if="!pagination.totalPages" class="catalog__right-empty">Products not found by request: {{searchValue}}</h2>
          <template v-else>
            <p v-if="searchValue" class="catalog__right-search">Search results by: {{searchValue}}</p>
            <ul class="catalog__list">
              <product-card class="catalog__list-item" v-for="p in products" :key="p.id" :item-info="p"/>
            </ul>
            <button v-if="pagination.currentPage < pagination.totalPages" @click="loadMore" type="button" class="btn btn--light">Load more</button>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {useProductStore} from '@/stores/products.js'

const {$api} = useNuxtApp()
const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const products = ref([])
const filter = ref({
  type: [],
  price: '',
  designer: [],
})
const filterData = ref([])
const pagination = ref({
  totalPages: 1,
  currentPage: 1,
  perPage: 9,
})
const isFilterActive = ref(false)
const isLoaderFilters = ref(false)
const isLoader = ref(true)
const searchValue = ref('')

const filterParameters = computed(() => {
  const params = [];

  const appendArrayParam = (key, values) => {
    if (Array.isArray(values)) {
      values.forEach(value => {
        params.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(value)}`);
      });
    } else if (values) {
      params.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(values)}`);
    }
  };

  const appendPriceParam = (price) => {
    const [from, to] = price.split(',');
    if (from) {
      params.push(`price[from]=${encodeURIComponent(from)}`);
    }
    if (to) {
      params.push(`price[to]=${encodeURIComponent(to)}`);
    } else if (from) {
      params.push(`price[to]=1000000000`);
    }
  };

  appendArrayParam('type', filter.value.type);
  appendPriceParam(filter.value.price);
  appendArrayParam('designer', filter.value.designer);

  return params.join('&');
})

function setFiltersFromRouteParams() {
  const params = useRoute().query;

  if (params['type[]']) {
    filter.value.type = Array.isArray(params['type[]']) ? params['type[]'] : [params['type[]']];
  }
  if (params['price[from]'] || params['price[to]']) {
    const from = params['price[from]'] || '';
    const to = params['price[to]'] || '';
    filter.value.price = `${from},${to}`;
  }
  if (params['designer[]']) {
    filter.value.designer = Array.isArray(params['designer[]']) ? params['designer[]'] : [params['designer[]']];
  }
  if(params['title']) {
    productStore.setSearchValue(params['title'])
  }
}

const uri = computed(() => {
  return `/products?page=${pagination.value.currentPage}&limit=${pagination.value.perPage}&${productStore.searchValueOptions}&${filterParameters.value}`
})

const urlOptions = computed(() => {
  return filterParameters.value ? `?${productStore.searchValueOptions}&${filterParameters.value}` : `?${productStore.searchValueOptions}`
})

async function fetchProducts() {
  try {
    const { data } = await $api.get(uri.value);
    if (pagination.value.currentPage === 1) {
      products.value = data.items;
    } else {
      products.value = [...products.value, ...data.items];
    }
    pagination.value.totalPages = data.meta.total_pages;
    pagination.value.currentPage = data.meta.current_page;
    router.push(`/products/${urlOptions.value}`)
  } catch (error) {
    console.log(error);
  } finally {
    isLoaderFilters.value = false
  }
}

async function fetchFilters() {
  try {
    const {data} = await $api.get('/filter');
    filterData.value = data[0]
  } catch(error) {
    console.log(error)
  }
}

async function fetchFiltersProducts() {
  try {
    isLoaderFilters.value = true
    if(pagination.value.currentPage !== 1) {
      pagination.value.currentPage = 1
    }
    const { data } = await $api.get(uri.value);
    products.value = data.items;
    pagination.value.totalPages = data.meta.total_pages;
    router.push(`/products/${urlOptions.value}`)
  } catch (error) {
    console.log(error);
  } finally {
    isLoaderFilters.value = false
  }
}

async function clearFilters() {
  try {
    Object.keys(filter.value).forEach(key => {
      if (Array.isArray(filter.value[key])) {
        filter.value[key] = []
      } else {
        filter.value[key] = ''
      }
    })
    productStore.clearSearchValue()
    fetchProducts()
  } catch (error) {
    console.log(error)
  }
}

function loadMore() {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage++
    fetchProducts();
    if(filterParameters.value.length) {
      window.history.pushState(null, '', urlOptions.value);
    }
  }
}

function handlerFilterActive() {
  isFilterActive.value = !isFilterActive.value
  document.body.classList.toggle('no-scroll');
}

watch(() => route.query.title, () => {
  fetchFiltersProducts()
  searchValue.value = productStore.searchValue
})

onMounted( async () => {
  try {
    setFiltersFromRouteParams();
    fetchFilters();
    fetchProducts();
    console.log(filterParameters.value.length)
  } catch (error) {
    console.log(error)
  } finally {
    isLoader.value = false
  }
})
</script>

<style lang="scss" scoped>

</style>