import Pagination from "@/components/products/Pagination";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { filterList, products } from "@/data/products";
import useTitle from "@/hooks/useTitle";

export default function Product() {
    useTitle("Products")
    
    return (
        <div className="max-w-7xl mx-auto">
            <section className="flex flex-col lg:flex-row">
                <section className="my-8 w-full lg:w-1/5">
                    <ProductFilter filterList={filterList} />
                </section>
                <section className="w-full lg:w-4/5 my-8 space-y-4">
                    <h1 className="text-2xl font-bold">All Products</h1>
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6">
                        {
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                    <Pagination />
                </section>
            </section>
        </div>
    )
}
